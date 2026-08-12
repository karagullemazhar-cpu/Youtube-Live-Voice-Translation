import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_GEMINI_BASE_URL,
  GEMINI_MODEL,
  QWEN_MODEL,
  QWEN_WS_ENDPOINT,
  geminiPermissionOrigin,
  geminiRealtimeEndpoint,
  geminiSetupMessage,
  providerForModel,
  qwenPermissionOrigin,
  qwenRealtimeEndpoint,
  qwenRequestHost,
  qwenSessionAudioConfig,
  qwenSupportsAudio
} from "../shared-config.mjs";

test("model sağlayıcısını belirler", () => {
  assert.equal(providerForModel(GEMINI_MODEL), "gemini");
  assert.equal(providerForModel(QWEN_MODEL), "qwen");
});

test("Gemini yalnız sabit resmi Google Live endpointini kullanır", () => {
  const official =
    "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent";
  assert.equal(DEFAULT_GEMINI_BASE_URL, official);
  assert.equal(geminiPermissionOrigin(), "https://generativelanguage.googleapis.com/*");
  const endpoint = new URL(geminiRealtimeEndpoint("test-key"));
  assert.equal(endpoint.origin + endpoint.pathname, official);
  assert.equal(endpoint.searchParams.get("key"), "test-key");
});

test("Gemini 3.5 Live Translate çağrısı resmi v1beta WebSocket sözleşmesiyle aynıdır", () => {
  assert.deepEqual(geminiSetupMessage(GEMINI_MODEL, "tr"), {
    setup: {
      model: "models/gemini-3.5-live-translate-preview",
      generationConfig: {
        responseModalities: ["AUDIO"],
        translationConfig: {
          targetLanguageCode: "tr",
          echoTargetLanguage: true
        }
      },
      inputAudioTranscription: {},
      outputAudioTranscription: {}
    }
  });
});

test("Qwen yalnız sabit Alibaba Cloud Singapur endpointini ve doğru modeli kullanır", () => {
  assert.equal(
    QWEN_WS_ENDPOINT,
    "wss://dashscope-intl.aliyuncs.com/api-ws/v1/realtime"
  );
  const endpoint = new URL(qwenRealtimeEndpoint());
  assert.equal(endpoint.protocol, "wss:");
  assert.equal(endpoint.hostname, "dashscope-intl.aliyuncs.com");
  assert.equal(endpoint.pathname, "/api-ws/v1/realtime");
  assert.equal(endpoint.searchParams.get("model"), QWEN_MODEL);
  assert.equal([...endpoint.searchParams.keys()].length, 1);
});

test("Qwen sabit host iznini ve DNR istek alanını üretir", () => {
  assert.equal(
    qwenPermissionOrigin(),
    "wss://dashscope-intl.aliyuncs.com/*"
  );
  assert.equal(qwenRequestHost(), "dashscope-intl.aliyuncs.com");
});

test("Qwen genel Singapur endpointinin çalışan ses sözleşmesini korur", () => {
  assert.deepEqual(qwenSessionAudioConfig(), {
    input_audio_format: "pcm16",
    output_audio_format: "pcm24"
  });
});

test("Qwen ses destekli ve yalnız metin dillerini ayırır", () => {
  assert.equal(qwenSupportsAudio("tr"), true);
  assert.equal(qwenSupportsAudio("en"), true);
  assert.equal(qwenSupportsAudio("bn"), false);
  assert.equal(qwenSupportsAudio("uk"), false);
});
