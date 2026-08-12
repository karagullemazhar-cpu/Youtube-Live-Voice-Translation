// MV3 service worker: kullanıcı ayarları, tabCapture ve offscreen koordinasyonu.

import {
  GEMINI_MODEL,
  QWEN_MODEL,
  geminiPermissionOrigin,
  providerForModel,
  qwenPermissionOrigin,
  qwenRealtimeEndpoint,
  qwenRequestHost
} from "./shared-config.mjs";

const OFFSCREEN_URL = "offscreen.html";
const POPUP_URL = "popup.html";
const QWEN_AUTH_RULE_ID = 1001;

const DEFAULT_SETTINGS = {
  sourceLang: "en",
  targetLang: "tr",
  model: GEMINI_MODEL,
  originalVolume: 0.15,
  translatedVolume: 1
};

const DEFAULT_SECRETS = {
  geminiApiKey: "",
  qwenApiKey: ""
};

const DEFAULT_STATE = {
  running: false,
  tabId: null,
  provider: null,
  model: null,
  status: "idle",
  lastError: "",
  inputTranscript: "",
  outputTranscript: "",
  audioChunks: 0
};

let settings = { ...DEFAULT_SETTINGS };
let secrets = { ...DEFAULT_SECRETS };
let state = { ...DEFAULT_STATE };
let creatingOffscreen = null;
let credentialUpdateQueue = Promise.resolve();

const storeReady = (async () => {
  await Promise.all([
    chrome.storage.local.setAccessLevel({ accessLevel: "TRUSTED_CONTEXTS" }),
    chrome.storage.session.setAccessLevel({ accessLevel: "TRUSTED_CONTEXTS" })
  ]);

  const [localStored, sessionStored] = await Promise.all([
    chrome.storage.local.get([
      "translatorSettings",
      "translatorCredentials",
      "translatorState"
    ]),
    chrome.storage.session.get(["translatorSecrets", "translatorState"])
  ]);

  const legacy = localStored.translatorSettings || {};
  const legacySessionSecrets = sessionStored.translatorSecrets || {};
  const storedCredentials = localStored.translatorCredentials || {};
  settings = sanitizeSettings(legacy);
  secrets = {
    geminiApiKey: String(
      legacySessionSecrets.geminiApiKey ||
      storedCredentials.geminiApiKey ||
      legacy.geminiApiKey ||
      legacy.apiKey ||
      ""
    ).trim(),
    qwenApiKey: String(
      legacySessionSecrets.qwenApiKey ||
      storedCredentials.qwenApiKey ||
      legacy.qwenApiKey ||
      ""
    ).trim()
  };

  state = {
    ...DEFAULT_STATE,
    ...(sessionStored.translatorState || localStored.translatorState || {})
  };

  await Promise.all([
    saveSettings(),
    saveCredentials(),
    saveState(),
    chrome.storage.local.remove("translatorState"),
    chrome.storage.session.remove("translatorSecrets")
  ]);
})();

function sanitizeSettings(value = {}) {
  const model = value.model === QWEN_MODEL ? QWEN_MODEL : GEMINI_MODEL;
  return {
    sourceLang: String(value.sourceLang || "en").trim() || "en",
    targetLang: String(value.targetLang || "tr").trim() || "tr",
    model,
    originalVolume: clampVolume(value.originalVolume, DEFAULT_SETTINGS.originalVolume),
    translatedVolume: clampVolume(value.translatedVolume, DEFAULT_SETTINGS.translatedVolume)
  };
}

function publicState() {
  return { ...state };
}

function popupSettings() {
  return { ...settings, ...secrets };
}

async function saveSettings() {
  await chrome.storage.local.set({ translatorSettings: sanitizeSettings(settings) });
}

async function saveCredentials() {
  await chrome.storage.local.set({
    translatorCredentials: {
      geminiApiKey: String(secrets.geminiApiKey || "").trim(),
      qwenApiKey: String(secrets.qwenApiKey || "").trim()
    }
  });
}

async function saveState() {
  await chrome.storage.session.set({ translatorState: state });
}

async function offscreenExists() {
  const offscreenUrl = chrome.runtime.getURL(OFFSCREEN_URL);
  const contexts = await chrome.runtime.getContexts({
    contextTypes: ["OFFSCREEN_DOCUMENT"],
    documentUrls: [offscreenUrl]
  });
  return contexts.length > 0;
}

async function ensureOffscreen() {
  if (await offscreenExists()) return;
  if (creatingOffscreen) {
    await creatingOffscreen;
    return;
  }

  creatingOffscreen = chrome.offscreen.createDocument({
    url: OFFSCREEN_URL,
    reasons: ["USER_MEDIA", "AUDIO_PLAYBACK"],
    justification: "Kullanıcının seçtiği sekme sesini çeviri sağlayıcısına iletmek ve çevrilmiş sesi oynatmak"
  });

  try {
    await creatingOffscreen;
  } finally {
    creatingOffscreen = null;
  }
}

function validateStartRequest(message) {
  if (message.dataConsent !== true) {
    throw new Error("Başlatmadan önce veri aktarımı açıklamasını kabul edin.");
  }

  const model = String(message.model || settings.model || GEMINI_MODEL).trim();
  if (model !== GEMINI_MODEL && model !== QWEN_MODEL) {
    throw new Error("Geçerli bir çeviri modeli seçin.");
  }

  const provider = providerForModel(model);
  const geminiApiKey = String(
    message.geminiApiKey ?? secrets.geminiApiKey ?? ""
  ).trim();
  const qwenApiKey = String(
    message.qwenApiKey ?? secrets.qwenApiKey ?? ""
  ).trim();
  const apiKey = provider === "qwen" ? qwenApiKey : geminiApiKey;
  const sourceLang = provider === "qwen"
    ? String(message.sourceLang || settings.sourceLang || "en").trim()
    : "auto";
  const targetLang = String(message.targetLang || settings.targetLang || "tr").trim();
  if (!apiKey || apiKey.length < 20) {
    throw new Error(
      `Geçerli bir ${provider === "qwen" ? "Qwen" : "Gemini"} API anahtarı girin.`
    );
  }
  if (!/^[a-z]{2,3}(?:-[A-Za-z]{2,4})?$/.test(targetLang)) {
    throw new Error("Geçerli bir hedef dil seçin.");
  }
  if (provider === "qwen" && !/^[a-z]{2,3}(?:-[A-Za-z]{2,4})?$/.test(sourceLang)) {
    throw new Error("Qwen için geçerli bir kaynak dil seçin.");
  }

  return {
    provider,
    apiKey,
    geminiApiKey,
    qwenApiKey,
    sourceLang,
    targetLang,
    model,
    originalVolume: clampVolume(message.originalVolume, settings.originalVolume),
    translatedVolume: clampVolume(message.translatedVolume, settings.translatedVolume)
  };
}

async function requireEndpointHostPermission(provider) {
  const origin = provider === "qwen"
    ? qwenPermissionOrigin()
    : geminiPermissionOrigin();
  const granted = await chrome.permissions.contains({ origins: [origin] });
  if (!granted) {
    throw new Error("Seçtiğiniz API alan adına bağlantı izni verilmedi. Yeniden başlatıp izin penceresini onaylayın.");
  }
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function configureQwenAuthorization(apiKey = "") {
  const removeRuleIds = [QWEN_AUTH_RULE_ID];
  const addRules = [];

  if (apiKey) {
    const endpoint = new URL(qwenRealtimeEndpoint(QWEN_MODEL));
    const host = qwenRequestHost();
    addRules.push({
      id: QWEN_AUTH_RULE_ID,
      priority: 100,
      action: {
        type: "modifyHeaders",
        requestHeaders: [{
          header: "Authorization",
          operation: "set",
          value: `Bearer ${apiKey}`
        }]
      },
      condition: {
        regexFilter:
          `^${escapeRegex(`${endpoint.protocol}//${endpoint.host}${endpoint.pathname}`)}` +
          "([?].*)?$",
        initiatorDomains: [chrome.runtime.id],
        requestDomains: [host],
        resourceTypes: ["websocket"]
      }
    });
  }

  await chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds,
    addRules
  });
}

function clampVolume(value, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(0, Math.min(1, number));
}

async function startTranslation(message) {
  await storeReady;
  const next = validateStartRequest(message);
  const tabId = Number(message.tabId);
  if (!Number.isInteger(tabId)) throw new Error("Aktif sekme bulunamadı.");

  await requireEndpointHostPermission(next.provider);

  const tab = await chrome.tabs.get(tabId);
  if (!tab.url || !/^https?:\/\//i.test(tab.url)) {
    throw new Error("Bu sayfa yakalanamaz. Bir http/https video sekmesinde tekrar deneyin.");
  }

  if (state.running || state.status === "connecting") {
    await stopTranslation(false);
  }

  settings = {
    sourceLang: next.provider === "qwen" ? next.sourceLang : settings.sourceLang,
    targetLang: next.targetLang,
    model: next.model,
    originalVolume: next.originalVolume,
    translatedVolume: next.translatedVolume
  };
  secrets = {
    geminiApiKey: next.geminiApiKey,
    qwenApiKey: next.qwenApiKey
  };
  await Promise.all([saveSettings(), saveCredentials()]);

  state = {
    ...DEFAULT_STATE,
    tabId,
    provider: next.provider,
    model: next.model,
    status: "connecting"
  };
  await saveState();
  await broadcastState();

  try {
    await configureQwenAuthorization(next.provider === "qwen" ? next.apiKey : "");

    await ensureOffscreen();
    const streamId = await chrome.tabCapture.getMediaStreamId({ targetTabId: tabId });
    if (!streamId) throw new Error("Sekme ses akışı alınamadı.");

    const response = await chrome.runtime.sendMessage({
      target: "offscreen",
      type: "startTranslation",
      streamId,
      provider: next.provider,
      apiKey: next.apiKey,
      sourceLang: next.sourceLang,
      targetLang: next.targetLang,
      model: next.model,
      originalVolume: next.originalVolume,
      translatedVolume: next.translatedVolume
    });

    if (!response?.ok) {
      throw new Error(response?.error || "Ses işleyici başlatılamadı.");
    }

    state.running = true;
    state.status = "translating";
    state.lastError = "";
    await saveState();
    await broadcastState();
    return publicState();
  } catch (error) {
    try {
      await configureQwenAuthorization();
    } catch {
      // Başlatma hatasında oturum kuralı zaten kaldırılmış olabilir.
    }
    await setError(error);
    throw error;
  }
}

async function stopTranslation(updateStatus = true) {
  await storeReady;
  const stoppedTabId = state.tabId;

  try {
    await Promise.race([
      chrome.runtime.sendMessage({
        target: "offscreen",
        type: "stopTranslation"
      }),
      new Promise((resolve) => setTimeout(resolve, 3000))
    ]);
  } catch {
    // Offscreen belge yoksa zaten durmuştur.
  }

  try {
    await configureQwenAuthorization();
  } catch {
    // Yetkilendirme kuralı zaten temizlenmiş olabilir.
  }

  try {
    if (creatingOffscreen) {
      await creatingOffscreen.catch(() => {});
      creatingOffscreen = null;
    }
    if (await offscreenExists()) {
      await chrome.offscreen.closeDocument();
    }
  } catch {
    // Belge eşzamanlı olarak kapanmış olabilir.
  }

  state.running = false;
  state.tabId = null;
  if (updateStatus) state.status = "stopped";
  await saveState();
  await broadcastState(stoppedTabId);
  return publicState();
}

async function updateVolumes(message) {
  await storeReady;
  settings.originalVolume = clampVolume(
    message.originalVolume,
    settings.originalVolume
  );
  settings.translatedVolume = clampVolume(
    message.translatedVolume,
    settings.translatedVolume
  );
  await saveSettings();

  if (state.running) {
    const response = await chrome.runtime.sendMessage({
      target: "offscreen",
      type: "updateVolumes",
      originalVolume: settings.originalVolume,
      translatedVolume: settings.translatedVolume
    });
    if (!response?.ok) {
      throw new Error(response?.error || "Ses seviyeleri uygulanamadı.");
    }
  }

  return {
    originalVolume: settings.originalVolume,
    translatedVolume: settings.translatedVolume
  };
}

async function updateApiKey(message) {
  await storeReady;
  const provider = String(message.provider || "");
  if (provider !== "gemini" && provider !== "qwen") {
    throw new Error("Geçerli bir API sağlayıcısı seçin.");
  }

  const apiKey = String(message.apiKey ?? "").trim();
  if (apiKey.length > 4096 || /[\u0000-\u001F\u007F]/.test(apiKey)) {
    throw new Error("API anahtarı geçersiz veya çok uzun.");
  }
  if (apiKey && apiKey.length < 20) {
    throw new Error(`Geçerli bir ${provider === "qwen" ? "Qwen" : "Gemini"} API anahtarı girin.`);
  }

  const key = provider === "qwen" ? "qwenApiKey" : "geminiApiKey";
  secrets[key] = apiKey;
  await saveCredentials();
  return { provider, stored: Boolean(apiKey) };
}

function enqueueCredentialUpdate(message) {
  const update = credentialUpdateQueue
    .catch(() => {})
    .then(() => updateApiKey(message));
  credentialUpdateQueue = update.catch(() => {});
  return update;
}

async function updateSelectionSettings(message) {
  await storeReady;
  const model = String(message.model || "").trim();
  const sourceLang = String(message.sourceLang || "").trim();
  const targetLang = String(message.targetLang || "").trim();
  const languagePattern = /^[a-z]{2,3}(?:-[A-Za-z]{2,4})?$/;

  if (model !== GEMINI_MODEL && model !== QWEN_MODEL) {
    throw new Error("Geçerli bir çeviri modeli seçin.");
  }
  if (!languagePattern.test(targetLang)) {
    throw new Error("Geçerli bir hedef dil seçin.");
  }
  if (!languagePattern.test(sourceLang)) {
    throw new Error("Qwen için geçerli bir kaynak dil seçin.");
  }

  settings = { ...settings, model, sourceLang, targetLang };
  await saveSettings();
  return { model, sourceLang, targetLang };
}

async function resetAll() {
  await stopTranslation(false);
  state = { ...DEFAULT_STATE };
  settings = { ...DEFAULT_SETTINGS };
  secrets = { ...DEFAULT_SECRETS };
  await Promise.all([
    chrome.storage.local.set({ translatorSettings: settings }),
    chrome.storage.local.remove(["translatorCredentials", "translatorState"]),
    chrome.storage.session.remove(["translatorState", "translatorSecrets"])
  ]);
  await broadcastState();
  return { state: publicState(), settings: popupSettings() };
}

async function setError(error) {
  const message = error instanceof Error ? error.message : String(error || "Bilinmeyen hata");
  state.running = false;
  state.status = "error";
  state.lastError = message;
  await saveState();
  await broadcastState();
}

async function updateActionBadge(snapshot, targetTabId) {
  if (!Number.isInteger(targetTabId)) return;
  const text = snapshot.running
    ? "ON"
    : (snapshot.status === "connecting" ? "…" : "");
  const title = snapshot.running
    ? "Youtube Live Voice Translation çalışıyor"
    : (snapshot.status === "connecting" ? "Youtube Live Voice Translation bağlanıyor" : "Youtube Live Voice Translation");
  await Promise.all([
    chrome.action.setBadgeText({ tabId: targetTabId, text }),
    chrome.action.setTitle({ tabId: targetTabId, title })
  ]);
}

async function broadcastState(targetTabId = state.tabId) {
  const snapshot = publicState();
  chrome.runtime.sendMessage({
    target: "popup",
    type: "stateUpdate",
    state: snapshot
  }).catch(() => {});

  await updateActionBadge(snapshot, targetTabId).catch(() => {});
}

function assertInternalSender(sender) {
  if (sender.id !== chrome.runtime.id) {
    throw new Error("Yetkisiz mesaj göndereni.");
  }
}

function assertSenderPage(sender, page) {
  assertInternalSender(sender);
  if (sender.url !== chrome.runtime.getURL(page)) {
    throw new Error("Bu işlem yalnızca uzantı arayüzünden başlatılabilir.");
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.target !== "background") return false;

  (async () => {
    await storeReady;
    assertInternalSender(sender);

    switch (message.type) {
      case "getState":
        return { state: publicState() };
      case "getPopupData":
        assertSenderPage(sender, POPUP_URL);
        return { state: publicState(), settings: popupSettings() };
      case "start":
        assertSenderPage(sender, POPUP_URL);
        return { state: await startTranslation(message) };
      case "stop":
        assertSenderPage(sender, POPUP_URL);
        return { state: await stopTranslation() };
      case "setVolumes":
        assertSenderPage(sender, POPUP_URL);
        return { ok: true, volumes: await updateVolumes(message) };
      case "setApiKey":
        assertSenderPage(sender, POPUP_URL);
        return { ok: true, ...(await enqueueCredentialUpdate(message)) };
      case "setSelectionSettings":
        assertSenderPage(sender, POPUP_URL);
        return { ok: true, settings: await updateSelectionSettings(message) };
      case "reset":
        assertSenderPage(sender, POPUP_URL);
        return await resetAll();
      case "offscreenTranscript":
        assertSenderPage(sender, OFFSCREEN_URL);
        if (message.kind === "input") state.inputTranscript = String(message.text || "").slice(0, 12000);
        if (message.kind === "output") state.outputTranscript = String(message.text || "").slice(0, 12000);
        await saveState();
        await broadcastState();
        return { ok: true };
      case "offscreenAudio":
        assertSenderPage(sender, OFFSCREEN_URL);
        state.audioChunks += 1;
        await saveState();
        await broadcastState();
        return { ok: true };
      case "offscreenError":
        assertSenderPage(sender, OFFSCREEN_URL);
        try {
          await configureQwenAuthorization();
        } catch {
          // Bağlantı hatasında oturum kuralı zaten kaldırılmış olabilir.
        }
        await setError(message.error || "Çeviri bağlantısı kesildi.");
        return { ok: true };
      default:
        return { error: "Bilinmeyen mesaj." };
    }
  })()
    .then(sendResponse)
    .catch((error) => sendResponse({ error: error.message, state: publicState() }));

  return true;
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabId === state.tabId) stopTranslation().catch(() => {});
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeBackgroundColor({ color: "#16a34a" });
});

storeReady.then(async () => {
  const hasOffscreen = await offscreenExists();
  if (state.running && !hasOffscreen) {
    state = { ...DEFAULT_STATE };
    await Promise.all([saveState(), configureQwenAuthorization()]);
  } else if (!state.running) {
    await configureQwenAuthorization();
  }
  await chrome.action.setBadgeBackgroundColor({ color: "#16a34a" });
  await broadcastState();
});
