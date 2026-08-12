export const GEMINI_MODEL = "gemini-3.5-live-translate-preview";
export const QWEN_MODEL = "qwen3.5-livetranslate-flash-realtime";

export const GEMINI_WS_ENDPOINT =
  "wss://generativelanguage.googleapis.com/ws/" +
  "google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent";
export const QWEN_WS_ENDPOINT =
  "wss://dashscope-intl.aliyuncs.com/api-ws/v1/realtime";

// Gemini, Google AI Studio'dan alınan anahtarla her zaman bu sabit resmi Live
// API WebSocket'ini kullanır. Kullanıcı tarafından değiştirilemez.
export const DEFAULT_GEMINI_BASE_URL = GEMINI_WS_ENDPOINT;

const QWEN_AUDIO_LANGUAGE_CODES = new Set([
  "zh", "en", "ar", "de", "fr", "es", "pt", "id", "it", "ko",
  "ru", "th", "vi", "ja", "tr", "hi", "ms", "nl", "ur", "nb",
  "sv", "da", "he", "fi", "pl", "is", "cs", "fil", "fa"
]);

export function providerForModel(model) {
  return model === QWEN_MODEL ? "qwen" : "gemini";
}

export function qwenSupportsAudio(languageCode) {
  return QWEN_AUDIO_LANGUAGE_CODES.has(String(languageCode || "").toLowerCase());
}

function permissionOrigin(endpoint) {
  const url = new URL(endpoint);
  return `https://${url.hostname}/*`;
}

export function geminiRealtimeEndpoint(apiKey) {
  const endpoint = new URL(GEMINI_WS_ENDPOINT);
  endpoint.searchParams.set("key", String(apiKey || "").trim());
  return endpoint.toString();
}

export function geminiSetupMessage(model = GEMINI_MODEL, targetLanguage = "tr") {
  const modelName = String(model || GEMINI_MODEL).trim().replace(/^models\//, "");
  const targetLanguageCode = String(targetLanguage || "tr").trim() || "tr";
  return {
    setup: {
      model: `models/${modelName}`,
      generationConfig: {
        responseModalities: ["AUDIO"],
        translationConfig: {
          targetLanguageCode,
          echoTargetLanguage: true
        }
      },
      inputAudioTranscription: {},
      outputAudioTranscription: {}
    }
  };
}

export function geminiPermissionOrigin() {
  return permissionOrigin(GEMINI_WS_ENDPOINT);
}

export function qwenRealtimeEndpoint(model = QWEN_MODEL) {
  const url = new URL(QWEN_WS_ENDPOINT);
  url.searchParams.set("model", String(model || QWEN_MODEL));
  return url.toString();
}

export function qwenPermissionOrigin() {
  // DNR modifyHeaders'in WebSocket handshake'ine uygulanması icin host izninin
  // wss:// semasini kapsamasi gerekir. https:// izni wss isteklerini kapsamaz.
  return "wss://dashscope-intl.aliyuncs.com/*";
}

export function qwenRequestHost() {
  return new URL(QWEN_WS_ENDPOINT).hostname;
}

export function qwenSessionAudioConfig() {
  // Daha önce çalışan genel Singapur QwenCloud endpointinin sözleşmesi.
  return {
    input_audio_format: "pcm16",
    output_audio_format: "pcm24"
  };
}
