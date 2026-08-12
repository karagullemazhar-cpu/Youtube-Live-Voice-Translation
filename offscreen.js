// Offscreen belge: tabCapture stream tüketimi, PCM dönüştürme,
// Gemini/Qwen Live WebSocket bağlantısı ve 24 kHz PCM oynatma.

import {
  GEMINI_MODEL,
  QWEN_MODEL,
  geminiRealtimeEndpoint,
  geminiSetupMessage,
  qwenRealtimeEndpoint,
  qwenSessionAudioConfig,
  qwenSupportsAudio
} from "./shared-config.mjs";

const INPUT_RATE = 16000;
const OUTPUT_RATE = 24000;
const MAX_AUDIO_CHUNK_BASE64_LENGTH = 6_000_000;

let websocket = null;
let mediaStream = null;
let audioContext = null;
let mediaSource = null;
let captureProcessor = null;
let captureSink = null;
let originalGain = null;
let translatedGain = null;
let activeProvider = "gemini";
let running = false;
let stopping = false;
let setupTimer = null;
let qwenSessionFinishResolver = null;
let playbackCursor = 0;
const playbackSources = new Set();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.target !== "offscreen") return false;

  if (message.type === "startTranslation") {
    startTranslation(message)
      .then(() => sendResponse({ ok: true }))
      .catch(async (error) => {
        await stopEverything(false);
        sendResponse({ ok: false, error: error.message });
      });
    return true;
  }

  if (message.type === "stopTranslation") {
    stopEverything(true)
      .then(() => sendResponse({ ok: true }))
      .catch((error) => sendResponse({ ok: false, error: error.message }));
    return true;
  }

  if (message.type === "updateVolumes") {
    try {
      applyVolumes(message.originalVolume, message.translatedVolume);
      sendResponse({ ok: true });
    } catch (error) {
      sendResponse({ ok: false, error: error.message });
    }
    return false;
  }

  return false;
});

async function startTranslation(options) {
  await stopEverything(false);
  stopping = false;
  activeProvider = options.provider === "qwen" ? "qwen" : "gemini";

  if (!options.streamId) throw new Error("Sekme ses kimliği eksik.");
  if (!options.apiKey) {
    throw new Error(`${activeProvider === "qwen" ? "Qwen" : "Gemini"} API anahtarı eksik.`);
  }

  await createAudioPipeline(options);
  if (activeProvider === "qwen") {
    await connectQwen(options);
  } else {
    await connectGemini(options);
  }
  running = true;
}

async function createAudioPipeline(options) {
  mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: {
      mandatory: {
        chromeMediaSource: "tab",
        chromeMediaSourceId: options.streamId
      }
    },
    video: false
  });

  const track = mediaStream.getAudioTracks()[0];
  if (!track) throw new Error("Seçilen sekmede yakalanabilir ses yok.");
  track.addEventListener("ended", () => {
    if (!stopping) notifyError("Sekme ses akışı sona erdi.");
    stopEverything(false);
  });

  audioContext = new AudioContext({ latencyHint: "interactive" });
  await audioContext.audioWorklet.addModule(
    chrome.runtime.getURL("audio-worklet.js")
  );
  await audioContext.resume();

  mediaSource = audioContext.createMediaStreamSource(mediaStream);
  originalGain = audioContext.createGain();
  translatedGain = audioContext.createGain();
  captureSink = audioContext.createGain();
  captureProcessor = new AudioWorkletNode(
    audioContext,
    "tab-capture-processor",
    {
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 1,
      channelCountMode: "explicit",
      outputChannelCount: [1]
    }
  );

  originalGain.gain.value = clampVolume(options.originalVolume, 0.15);
  translatedGain.gain.value = clampVolume(options.translatedVolume, 1);
  captureSink.gain.value = 0;

  // tabCapture yakalama başladığında sekmenin sesi normal çıkıştan ayrılır.
  // Bu hat orijinal sesi seçilen seviyede tekrar kullanıcıya verir.
  mediaSource.connect(originalGain);
  originalGain.connect(audioContext.destination);

  // Ayrı ve sessiz hat seçilen modele gönderilecek PCM'i üretir.
  mediaSource.connect(captureProcessor);
  captureProcessor.connect(captureSink);
  captureSink.connect(audioContext.destination);
  translatedGain.connect(audioContext.destination);

  captureProcessor.port.onmessage = (event) => {
    if (!running || websocket?.readyState !== WebSocket.OPEN) return;
    const channel = event.data;
    if (!(channel instanceof Float32Array) || channel.length === 0) return;
    const resampled = resampleLinear(channel, audioContext.sampleRate, INPUT_RATE);
    const pcm = floatToPcm16(resampled);
    const audio = bytesToBase64(new Uint8Array(pcm.buffer));
    const payload = activeProvider === "qwen"
      ? {
          event_id: createEventId(),
          type: "input_audio_buffer.append",
          audio
        }
      : {
          realtimeInput: {
            audio: {
              data: audio,
              mimeType: `audio/pcm;rate=${INPUT_RATE}`
            }
          }
        };
    try {
      websocket.send(JSON.stringify(payload));
    } catch (error) {
      notifyError(`Ses gönderilemedi: ${error.message}`);
    }
  };
}

function applyVolumes(nextOriginalVolume, nextTranslatedVolume) {
  const original = clampVolume(nextOriginalVolume, 0.15);
  const translated = clampVolume(nextTranslatedVolume, 1);

  if (originalGain && audioContext) {
    const now = audioContext.currentTime;
    originalGain.gain.cancelScheduledValues(now);
    originalGain.gain.setTargetAtTime(original, now, 0.015);
  }
  if (translatedGain && audioContext) {
    const now = audioContext.currentTime;
    translatedGain.gain.cancelScheduledValues(now);
    translatedGain.gain.setTargetAtTime(translated, now, 0.015);
  }
}

function connectGemini(options) {
  const endpoint = geminiRealtimeEndpoint(options.apiKey);
  const setup = geminiSetupMessage(
    options.model || GEMINI_MODEL,
    options.targetLang || "tr"
  );

  return new Promise((resolve, reject) => {
    let settled = false;
    let transportErrorSeen = false;
    websocket = new WebSocket(endpoint);
    websocket.binaryType = "arraybuffer";

    const settle = (error) => {
      if (settled) return;
      settled = true;
      clearTimeout(setupTimer);
      if (error) reject(error);
      else resolve();
    };

    websocket.onopen = () => {
      websocket.send(JSON.stringify(setup));
    };

    websocket.onmessage = (event) => {
      try {
        const message = parseServerMessage(event.data);
        if (message.setupComplete !== undefined) {
          running = true;
          settle();
          return;
        }
        handleServerMessage(message);
      } catch (error) {
        settle(error);
        if (running) notifyError(error.message);
      }
    };

    websocket.onerror = () => {
      // Chrome çoğu WebSocket ayrıntısını yalnız hemen ardından gelen close
      // olayında verir. Burada erken ve genel bir hatayla asıl nedeni ezme.
      transportErrorSeen = true;
    };

    websocket.onclose = (event) => {
      const reason = String(event.reason || "").trim();
      const detail = reason ? `: ${reason}` : "";
      const prefix = transportErrorSeen
        ? "Gemini WebSocket bağlantısı kurulamadı"
        : "Gemini bağlantısı kapandı";
      const error = new Error(`${prefix} (${event.code})${detail}`);
      settle(error);
      if (running && !stopping) notifyError(error.message);
      running = false;
    };

    setupTimer = setTimeout(() => {
      settle(new Error("Gemini kurulumu 15 saniye içinde tamamlanmadı."));
      stopEverything(false);
    }, 15000);
  });
}

function connectQwen(options) {
  const model = String(options.model || QWEN_MODEL);
  const endpoint = qwenRealtimeEndpoint(model);
  const targetLang = String(options.targetLang || "tr");
  const outputModalities = qwenSupportsAudio(targetLang)
    ? ["text", "audio"]
    : ["text"];

  return new Promise((resolve, reject) => {
    let settled = false;
    websocket = new WebSocket(endpoint);
    websocket.binaryType = "arraybuffer";

    const settle = (error) => {
      if (settled) return;
      settled = true;
      clearTimeout(setupTimer);
      if (error) reject(error);
      else resolve();
    };

    websocket.onopen = () => {
      websocket.send(JSON.stringify({
        event_id: createEventId(),
        type: "session.update",
        session: {
          modalities: outputModalities,
          voice: "Tina",
          ...qwenSessionAudioConfig(),
          input_audio_transcription: {
            model: "qwen3-asr-flash-realtime",
            language: String(options.sourceLang || "en")
          },
          translation: {
            language: targetLang
          }
        }
      }));
    };

    websocket.onmessage = (event) => {
      try {
        const message = parseServerMessage(event.data);
        if (message.type === "session.updated") {
          running = true;
          settle();
          return;
        }
        handleQwenServerMessage(message);
      } catch (error) {
        settle(error);
        if (running) notifyError(error.message);
      }
    };

    websocket.onerror = () => {
      settle(new Error("Qwen WebSocket bağlantısı kurulamadı."));
    };

    websocket.onclose = (event) => {
      const error = new Error(`Qwen bağlantısı kapandı (${event.code}).`);
      settle(error);
      if (running && !stopping) notifyError(error.message);
      running = false;
      qwenSessionFinishResolver?.();
    };

    setupTimer = setTimeout(() => {
      settle(new Error("Qwen kurulumu 15 saniye içinde tamamlanmadı."));
      stopEverything(false);
    }, 15000);
  });
}

function handleQwenServerMessage(message) {
  switch (message.type) {
    case "conversation.item.input_audio_transcription.text":
      notifyTranscript("input", `${message.text || ""}${message.stash || ""}`);
      break;
    case "conversation.item.input_audio_transcription.completed":
      notifyTranscript("input", message.transcript || "");
      break;
    case "response.audio_transcript.text":
      notifyTranscript("output", `${message.text || ""}${message.stash || ""}`);
      break;
    case "response.audio_transcript.done":
      notifyTranscript("output", message.transcript || "");
      break;
    case "response.text.text":
      notifyTranscript("output", `${message.text || ""}${message.stash || ""}`);
      break;
    case "response.text.done":
      notifyTranscript("output", message.text || "");
      break;
    case "response.audio.delta":
      if (message.delta) queueTranslatedPcm(message.delta, OUTPUT_RATE);
      break;
    case "session.finished":
      qwenSessionFinishResolver?.();
      qwenSessionFinishResolver = null;
      break;
    default:
      break;
  }
}

function parseServerMessage(data) {
  const text = typeof data === "string" ? data : new TextDecoder().decode(data);
  const message = JSON.parse(text);
  if (message.error) {
    throw new Error(message.error.message || JSON.stringify(message.error));
  }
  return message;
}

function handleServerMessage(message) {
  const content = message.serverContent;
  if (!content) return;

  if (content.inputTranscription?.text) {
    notifyTranscript("input", content.inputTranscription.text);
  }
  if (content.outputTranscription?.text) {
    notifyTranscript("output", content.outputTranscription.text);
  }

  for (const part of content.modelTurn?.parts || []) {
    const inline = part.inlineData;
    if (!inline?.data) continue;
    const mimeType = inline.mimeType || `audio/pcm;rate=${OUTPUT_RATE}`;
    if (!mimeType.startsWith("audio/")) continue;
    const rateMatch = mimeType.match(/rate=(\d+)/i);
    const sampleRate = Number(rateMatch?.[1] || OUTPUT_RATE);
    queueTranslatedPcm(inline.data, sampleRate);
  }
}

function queueTranslatedPcm(base64Data, sampleRate) {
  if (!audioContext || !translatedGain) return;
  if (
    typeof base64Data !== "string" ||
    base64Data.length === 0 ||
    base64Data.length > MAX_AUDIO_CHUNK_BASE64_LENGTH
  ) {
    notifyError("Çeviri sağlayıcısı geçersiz büyüklükte bir ses parçası gönderdi.");
    return;
  }
  const bytes = base64ToBytes(base64Data);
  const evenLength = bytes.byteLength - (bytes.byteLength % 2);
  if (!evenLength) return;

  const view = new DataView(bytes.buffer, bytes.byteOffset, evenLength);
  const samples = evenLength / 2;
  const audioBuffer = audioContext.createBuffer(1, samples, sampleRate || OUTPUT_RATE);
  const channel = audioBuffer.getChannelData(0);
  for (let i = 0; i < samples; i += 1) {
    channel[i] = view.getInt16(i * 2, true) / 32768;
  }

  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(translatedGain);

  const startAt = Math.max(audioContext.currentTime + 0.02, playbackCursor);
  playbackCursor = startAt + audioBuffer.duration;
  playbackSources.add(source);
  source.onended = () => playbackSources.delete(source);
  source.start(startAt);

  chrome.runtime.sendMessage({
    target: "background",
    type: "offscreenAudio"
  }).catch(() => {});
}

function notifyTranscript(kind, text) {
  chrome.runtime.sendMessage({
    target: "background",
    type: "offscreenTranscript",
    kind,
    text
  }).catch(() => {});
}

function notifyError(error) {
  chrome.runtime.sendMessage({
    target: "background",
    type: "offscreenError",
    error
  }).catch(() => {});
}

async function stopEverything(sendStreamEnd) {
  stopping = true;
  running = false;
  clearTimeout(setupTimer);
  setupTimer = null;

  const socket = websocket;
  if (socket) {
    if (sendStreamEnd && socket.readyState === WebSocket.OPEN) {
      try {
        if (activeProvider === "qwen") {
          const sessionFinished = new Promise((resolve) => {
            qwenSessionFinishResolver = resolve;
          });
          socket.send(JSON.stringify({
            event_id: createEventId(),
            type: "session.finish"
          }));
          await Promise.race([
            sessionFinished,
            new Promise((resolve) => setTimeout(resolve, 2000))
          ]);
        } else {
          socket.send(JSON.stringify({
            realtimeInput: { audioStreamEnd: true }
          }));
        }
      } catch {
        // Bağlantı zaten kapanıyor olabilir.
      }
    }
    websocket = null;
    socket.onopen = null;
    socket.onmessage = null;
    socket.onerror = null;
    socket.onclose = null;
    try {
      socket.close(1000, "Kullanıcı durdurdu");
    } catch {
      // no-op
    }
  }

  for (const source of playbackSources) {
    try { source.stop(); } catch { /* no-op */ }
  }
  playbackSources.clear();
  playbackCursor = 0;

  try {
    if (captureProcessor) {
      captureProcessor.port.onmessage = null;
      captureProcessor.port.close();
      captureProcessor.disconnect();
    }
    mediaSource?.disconnect();
    originalGain?.disconnect();
    translatedGain?.disconnect();
    captureSink?.disconnect();
  } catch {
    // no-op
  }

  mediaStream?.getTracks().forEach((track) => track.stop());
  const context = audioContext;
  if (context && context.state !== "closed") {
    try {
      await context.suspend();
    } catch {
      // Context zaten kapanmış olabilir.
    }
    try {
      await context.close();
    } catch {
      // no-op
    }
  }

  mediaStream = null;
  audioContext = null;
  mediaSource = null;
  captureProcessor = null;
  captureSink = null;
  originalGain = null;
  translatedGain = null;
  activeProvider = "gemini";
  qwenSessionFinishResolver = null;
}

function createEventId() {
  if (globalThis.crypto?.randomUUID) {
    return `event_${crypto.randomUUID().replaceAll("-", "")}`;
  }
  return `event_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function resampleLinear(input, sourceRate, targetRate) {
  if (sourceRate === targetRate) return input;
  const ratio = sourceRate / targetRate;
  const outputLength = Math.max(1, Math.round(input.length / ratio));
  const output = new Float32Array(outputLength);

  for (let i = 0; i < outputLength; i += 1) {
    const position = i * ratio;
    const left = Math.floor(position);
    const right = Math.min(left + 1, input.length - 1);
    const fraction = position - left;
    output[i] = input[left] * (1 - fraction) + input[right] * fraction;
  }
  return output;
}

function floatToPcm16(input) {
  const pcm = new Int16Array(input.length);
  for (let i = 0; i < input.length; i += 1) {
    const sample = Math.max(-1, Math.min(1, input[i]));
    pcm[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
  }
  return pcm;
}

function bytesToBase64(bytes) {
  let binary = "";
  const block = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += block) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + block));
  }
  return btoa(binary);
}

function base64ToBytes(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function clampVolume(value, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(0, Math.min(1, number));
}
