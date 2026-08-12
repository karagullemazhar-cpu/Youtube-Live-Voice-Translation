import {
  GEMINI_MODEL,
  QWEN_MODEL,
  geminiPermissionOrigin,
  providerForModel,
  qwenPermissionOrigin,
  qwenSupportsAudio
} from "./shared-config.mjs";
import {
  UI_LANGUAGES,
  isRtlLanguage,
  languageDisplayName,
  localizeErrorMessage,
  uiText
} from "./ui-i18n.mjs";

const $ = (id) => document.getElementById(id);

let currentState = null;
let volumeUpdateTimer = null;
let visibleProvider = "gemini";
let qwenSourceLang = "en";
let selectionSaveQueue = Promise.resolve();
const apiKeySaveRevisions = {
  gemini: 0,
  qwen: 0
};
const apiKeySavePending = {
  gemini: Promise.resolve(),
  qwen: Promise.resolve()
};
let draftApiKeys = {
  gemini: "",
  qwen: ""
};

function interfaceLanguage() {
  const selected = String($("targetLang")?.value || "tr").toLowerCase();
  return UI_LANGUAGES.includes(selected) ? selected : "en";
}

function t(key, variables = {}) {
  return uiText(interfaceLanguage(), key, variables);
}

function providerName(provider = selectedProvider()) {
  return provider === "qwen" ? "Qwen" : "Gemini";
}

function selectedProvider() {
  return providerForModel($("model")?.value || GEMINI_MODEL);
}

function updateButtons() {
  const status = currentState?.status || "idle";
  const busy = Boolean(currentState?.running || status === "connecting");
  $("startBtn").disabled = busy || !$("dataConsent").checked;
  $("stopBtn").disabled = !currentState?.running && status !== "connecting";
}

function renderState(state) {
  if (!state) return;
  currentState = state;
  const status = state.status || "idle";
  const provider = state.provider || selectedProvider();
  const statusKeys = {
    idle: "ready",
    translating: "translating",
    stopped: "stopped",
    error: "translationStopped"
  };
  const statusLabel = status === "connecting"
    ? t("connecting", { provider: providerName(provider) })
    : t(statusKeys[status] || "ready");
  $("status").className = `status ${status}`;
  $("statusText").textContent =
    `${statusLabel}${state.audioChunks ? ` · ${t("audioChunks", { count: state.audioChunks })}` : ""}`;
  $("inputTranscript").textContent = state.inputTranscript || "—";
  $("outputTranscript").textContent = state.outputTranscript || "—";
  $("errorBox").hidden = !(status === "error" && state.lastError);
  $("errorBox").textContent = state.lastError
    ? localizeErrorMessage(state.lastError, interfaceLanguage(), providerName(provider))
    : "";
  updateButtons();
}

function renderSettings(settings) {
  if (!settings) return;
  draftApiKeys = {
    gemini: settings.geminiApiKey || "",
    qwen: settings.qwenApiKey || ""
  };
  $("targetLang").value = settings.targetLang || "tr";
  qwenSourceLang = settings.sourceLang || "en";
  $("model").value = settings.model === QWEN_MODEL ? QWEN_MODEL : GEMINI_MODEL;
  visibleProvider = selectedProvider();
  $("originalVolume").value = settings.originalVolume ?? 0.15;
  $("translatedVolume").value = settings.translatedVolume ?? 1;
  renderLocale();
  renderVolumeLabels();
}

function persistApiKey(provider = visibleProvider) {
  const value = String(draftApiKeys[provider] || "").trim();
  const revision = ++apiKeySaveRevisions[provider];

  // Boş değer kayıtlı anahtarı siler. Eksik yazılmış bir anahtar ise daha
  // önceki geçerli kaydı bozmaz; en az 20 karaktere ulaştığında hemen
  // background service worker'a gönderilir.
  if (value && value.length < 20) return apiKeySavePending[provider];

  const saveRequest = send({
    type: "setApiKey",
    provider,
    apiKey: value
  });

  apiKeySavePending[provider] = saveRequest.catch((error) => {
    if (revision === apiKeySaveRevisions[provider]) showLocalError(error);
  });
  return apiKeySavePending[provider];
}

function renderQwenOutputHint() {
  const qwenSelected = selectedProvider() === "qwen";
  const hasAudio = qwenSupportsAudio($("targetLang").value);
  $("qwenOutputHint").hidden = !qwenSelected || hasAudio;
  $("qwenOutputHint").textContent = qwenSelected && !hasAudio
    ? t("qwenTextOnly")
    : "";
}

function renderLanguageOptions() {
  const language = interfaceLanguage();
  const targetValue = $("targetLang").value || "tr";
  const sourceValue = qwenSourceLang || $("sourceLang").value || "en";
  const createOption = (value, label) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    return option;
  };

  $("sourceLang").replaceChildren(
    createOption("auto", t("autoGemini")),
    ...UI_LANGUAGES.map((code) => createOption(code, languageDisplayName(code, language)))
  );
  $("targetLang").replaceChildren(
    ...UI_LANGUAGES.map((code) => createOption(code, languageDisplayName(code, language)))
  );
  $("targetLang").value = UI_LANGUAGES.includes(targetValue) ? targetValue : "en";
  $("sourceLang").value = UI_LANGUAGES.includes(sourceValue) ? sourceValue : "en";
}

function renderLocale() {
  const language = interfaceLanguage();
  document.documentElement.lang = language;
  document.documentElement.dir = isRtlLanguage(language) ? "rtl" : "ltr";
  document.title = t("appTitle");
  for (const element of document.querySelectorAll("[data-i18n]")) {
    element.textContent = t(element.dataset.i18n);
  }
  renderLanguageOptions();
  renderProviderUi();
  if (currentState) renderState(currentState);
}

function renderProviderUi() {
  const provider = selectedProvider();
  visibleProvider = provider;
  $("apiKey").value = draftApiKeys[provider] || "";
  $("apiKey").type = "password";
  $("toggleKey").textContent = t("show");
  $("toggleKey").title = t("toggleKey");
  $("sourceLang").disabled = provider !== "qwen";
  $("sourceLang").value = provider === "qwen" ? qwenSourceLang : "auto";

  if (provider === "qwen") {
    $("apiKeyLabel").textContent = t("apiKeyLabel", { provider: "Qwen" });
    $("apiKey").placeholder = t("apiKeyPlaceholder", { service: "Alibaba Cloud Model Studio" });
    $("providerText").textContent = `Qwen LiveTranslate · ${t("liveTranslation")}`;
    $("apiKeyHint").textContent = t("apiHint", { provider: "Qwen" });
  } else {
    $("apiKeyLabel").textContent = t("apiKeyLabel", { provider: "Gemini" });
    $("apiKey").placeholder = t("apiKeyPlaceholder", { service: "Google AI Studio" });
    $("providerText").textContent = `Gemini Live · ${t("liveAudioTranslation")}`;
    $("apiKeyHint").textContent = t("apiHint", { provider: "Gemini" });
  }

  renderQwenOutputHint();
}

function renderVolumeLabels() {
  $("originalVolumeText").textContent = `${Math.round(Number($("originalVolume").value) * 100)}%`;
  $("translatedVolumeText").textContent = `${Math.round(Number($("translatedVolume").value) * 100)}%`;
}

function persistSelectionSettings() {
  const snapshot = {
    model: $("model").value,
    sourceLang: qwenSourceLang,
    targetLang: $("targetLang").value
  };
  selectionSaveQueue = selectionSaveQueue
    .catch(() => {})
    .then(() => send({ type: "setSelectionSettings", ...snapshot }))
    .catch(showLocalError);
}

function currentVolumes() {
  return {
    originalVolume: Number($("originalVolume").value),
    translatedVolume: Number($("translatedVolume").value)
  };
}

function scheduleVolumeUpdate() {
  renderVolumeLabels();
  clearTimeout(volumeUpdateTimer);
  volumeUpdateTimer = setTimeout(() => {
    send({ type: "setVolumes", ...currentVolumes() }).catch(showLocalError);
  }, 80);
}

function commitVolumeUpdate() {
  renderVolumeLabels();
  clearTimeout(volumeUpdateTimer);
  send({ type: "setVolumes", ...currentVolumes() }).catch(showLocalError);
}

async function send(message) {
  const response = await chrome.runtime.sendMessage({
    target: "background",
    ...message
  });
  if (response?.error) throw new Error(response.error);
  return response;
}

async function activeTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tabs[0]?.id) throw new Error("Aktif sekme bulunamadı.");
  return tabs[0];
}

async function refresh() {
  const response = await send({ type: "getPopupData" });
  renderSettings(response.settings);
  renderState(response.state);
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await refresh();
  } catch (error) {
    showLocalError(error);
  }

  $("toggleKey").addEventListener("click", () => {
    const showing = $("apiKey").type === "text";
    $("apiKey").type = showing ? "password" : "text";
    $("toggleKey").textContent = showing ? t("show") : t("hide");
  });

  $("apiKey").addEventListener("input", () => {
    draftApiKeys[visibleProvider] = $("apiKey").value;
    persistApiKey(visibleProvider);
  });
  $("apiKey").addEventListener("change", () => persistApiKey(visibleProvider));

  $("model").addEventListener("change", () => {
    draftApiKeys[visibleProvider] = $("apiKey").value;
    persistApiKey(visibleProvider);
    renderProviderUi();
    persistSelectionSettings();
  });

  $("targetLang").addEventListener("change", () => {
    renderLocale();
    persistSelectionSettings();
  });
  $("sourceLang").addEventListener("change", () => {
    if (selectedProvider() === "qwen") qwenSourceLang = $("sourceLang").value;
    persistSelectionSettings();
  });
  $("dataConsent").addEventListener("change", updateButtons);
  $("originalVolume").addEventListener("input", scheduleVolumeUpdate);
  $("translatedVolume").addEventListener("input", scheduleVolumeUpdate);
  $("originalVolume").addEventListener("change", commitVolumeUpdate);
  $("translatedVolume").addEventListener("change", commitVolumeUpdate);

  $("startBtn").addEventListener("click", async () => {
    try {
      if (!$("dataConsent").checked) {
        throw new Error("Başlatmadan önce veri aktarımı açıklamasını kabul edin.");
      }

      draftApiKeys[visibleProvider] = $("apiKey").value;
      const provider = selectedProvider();
      if (provider === "qwen") qwenSourceLang = $("sourceLang").value;

      // İzin isteği doğrudan kullanıcı tıklaması içinde ve ilk asenkron işlem
      // olarak yapılır; böylece Chrome kullanıcı hareketini kaybetmez.
      const permissionOrigin = provider === "qwen"
        ? qwenPermissionOrigin()
        : geminiPermissionOrigin();

      const granted = await chrome.permissions.request({
        origins: [permissionOrigin]
      });
      if (!granted) {
        throw new Error("Seçtiğiniz API alan adına bağlantı izni verilmedi.");
      }

      const tab = await activeTab();
      renderState({ ...currentState, provider, status: "connecting", lastError: "" });
      const response = await send({
        type: "start",
        dataConsent: true,
        tabId: tab.id,
        geminiApiKey: draftApiKeys.gemini.trim(),
        qwenApiKey: draftApiKeys.qwen.trim(),
        sourceLang: provider === "qwen" ? qwenSourceLang : "auto",
        targetLang: $("targetLang").value,
        model: $("model").value,
        ...currentVolumes()
      });
      renderState(response.state);
    } catch (error) {
      showLocalError(error);
    }
  });

  $("stopBtn").addEventListener("click", async () => {
    try {
      const response = await send({ type: "stop" });
      renderState(response.state);
    } catch (error) {
      showLocalError(error);
    }
  });

  $("resetBtn").addEventListener("click", async () => {
    try {
      await Promise.allSettled([
        apiKeySavePending.gemini,
        apiKeySavePending.qwen,
        selectionSaveQueue
      ]);
      const response = await send({ type: "reset" });
      $("dataConsent").checked = false;
      renderState(response.state);
      renderSettings(response.settings);
      updateButtons();
    } catch (error) {
      showLocalError(error);
    }
  });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message?.target === "popup" && message.type === "stateUpdate") {
    renderState(message.state);
  }
});

function showLocalError(error) {
  const message = error instanceof Error ? error.message : String(error);
  renderState({
    ...(currentState || {}),
    running: false,
    status: "error",
    lastError: message
  });
}
