import assert from "node:assert/strict";

const port = Number(process.argv[2] || 9345);
const expectedExistingQwenApiKey = process.argv[3] || "";
const base = `http://127.0.0.1:${port}`;
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const testQwenApiKey = "qwen-test-credential-1234567890";

async function targets() {
  return fetch(`${base}/json/list`).then((response) => response.json());
}

async function waitForExtensionId() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const target = (await targets()).find((item) =>
        /^chrome-extension:\/\/[^/]+\/background\.js$/.test(item.url)
      );
      if (target) return new URL(target.url).host;
    } catch {
      // Tarayıcı hata ayıklama portu henüz dinlemeye başlamamış olabilir.
    }
    await wait(100);
  }
  throw new Error("Extension service worker target was not found.");
}

async function openPopup(extensionId) {
  const url = `chrome-extension://${extensionId}/popup.html`;
  const response = await fetch(`${base}/json/new?${encodeURIComponent(url)}`, { method: "PUT" });
  if (!response.ok) throw new Error(`Could not open popup target: ${response.status}`);
  const target = await response.json();
  const page = await connect(target.webSocketDebuggerUrl);
  await page.command("Emulation.setDeviceMetricsOverride", {
    width: 410,
    height: 600,
    deviceScaleFactor: 1,
    mobile: false
  });
  return { ...page, targetId: target.id };
}

async function closePopup(page) {
  page.socket.close();
  const response = await fetch(`${base}/json/close/${page.targetId}`);
  if (!response.ok) throw new Error(`Could not close popup target: ${response.status}`);
  await wait(150);
}

async function connect(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl);
  const pending = new Map();
  let nextId = 0;
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) return;
    const task = pending.get(message.id);
    if (!task) return;
    pending.delete(message.id);
    if (message.error) task.reject(new Error(message.error.message));
    else task.resolve(message.result);
  });
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  const command = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
  await command("Runtime.enable");
  await command("Page.enable");
  await wait(300);
  const evaluate = async (expression) => {
    const result = await command("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true
    });
    if (result.exceptionDetails) {
      throw new Error(result.exceptionDetails.exception?.description || "Evaluation failed");
    }
    return result.result.value;
  };
  return { socket, command, evaluate };
}

async function setLanguage(page, language) {
  await page.evaluate(`(() => {
    const select = document.getElementById("targetLang");
    select.value = ${JSON.stringify(language)};
    select.dispatchEvent(new Event("change", { bubbles: true }));
  })()`);
  await wait(100);
}

async function selectQwen(page) {
  await page.evaluate(`(() => {
    const select = document.getElementById("model");
    select.value = "qwen3.5-livetranslate-flash-realtime";
    select.dispatchEvent(new Event("change", { bubbles: true }));
  })()`);
  // Model seçiminin kalıcı ayarlara yazılmasını anahtar hızlı-kapatma
  // senaryosundan ayrı tutuyoruz.
  await wait(150);
}

async function snapshot(page) {
  return page.evaluate(`(async () => {
    const popupData = await chrome.runtime.sendMessage({
      target: "background",
      type: "getPopupData"
    });
    const localData = await chrome.storage.local.get([
      "translatorSettings",
      "translatorCredentials"
    ]);
    const sessionData = await chrome.storage.session.get("translatorSecrets");
    return ({
      version: chrome.runtime.getManifest().version,
      lang: document.documentElement.lang,
      dir: document.documentElement.dir,
      targetLabel: document.querySelector('label[for="targetLang"]').textContent,
      dataUse: document.getElementById("dataUseTitle").textContent,
      start: document.getElementById("startBtn").textContent,
      model: document.getElementById("model").value,
      apiKeyValue: document.getElementById("apiKey").value,
      storedGeminiApiKey: localData.translatorCredentials?.geminiApiKey || "",
      storedQwenApiKey: localData.translatorCredentials?.qwenApiKey || "",
      legacySessionQwenApiKey: sessionData.translatorSecrets?.qwenApiKey || "",
      popupQwenApiKey: popupData.settings.qwenApiKey || "",
      hasGeminiBaseUrlField: Boolean(document.getElementById("geminiBaseUrl")),
      hasQwenBaseUrlField: Boolean(document.getElementById("qwenBaseUrl")),
      horizontalOverflow:
        document.documentElement.scrollWidth > document.documentElement.clientWidth,
      layout: {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        bodyWidth: document.body.getBoundingClientRect().width
      }
    });
  })()`);
}

const extensionId = await waitForExtensionId();
const first = await openPopup(extensionId);
const initial = await snapshot(first);
assert.equal(initial.version, "1.6.0");
assert.equal(initial.hasGeminiBaseUrlField, false);
assert.equal(initial.hasQwenBaseUrlField, false);
assert.equal(initial.legacySessionQwenApiKey, "");
if (expectedExistingQwenApiKey) {
  assert.equal(initial.model, "qwen3.5-livetranslate-flash-realtime");
  assert.equal(initial.apiKeyValue, expectedExistingQwenApiKey);
  assert.equal(initial.popupQwenApiKey, expectedExistingQwenApiKey);
  assert.equal(initial.storedQwenApiKey, expectedExistingQwenApiKey);
}
await closePopup(first);

const active = await openPopup(extensionId);
await selectQwen(active);
const qwenSelected = await snapshot(active);
assert.equal(qwenSelected.model, "qwen3.5-livetranslate-flash-realtime");
assert.equal(qwenSelected.hasQwenBaseUrlField, false);

const obsoleteOverrideAttempt = await active.evaluate(`chrome.runtime.sendMessage({
  target: "background",
  type: "setBaseUrl",
  provider: "qwen",
  baseUrl: "wss://paid-qwen.example.com/custom/realtime"
})`);
assert.equal(obsoleteOverrideAttempt.error, "Bilinmeyen mesaj.");

await active.evaluate(`(() => {
  const input = document.getElementById("apiKey");
  input.value = ${JSON.stringify(testQwenApiKey)};
  input.dispatchEvent(new Event("input", { bubbles: true }));
})()`);

// Kayıt için beklemeden popup'ı kapat. Mesaj popup yaşam süresinden bağımsız
// olarak service worker tarafından kalıcı depolamaya yazılmalıdır.
await closePopup(active);
const afterFastClose = await openPopup(extensionId);
const fastClosePersisted = await snapshot(afterFastClose);
assert.equal(fastClosePersisted.model, "qwen3.5-livetranslate-flash-realtime");
assert.equal(fastClosePersisted.apiKeyValue, testQwenApiKey);
assert.equal(fastClosePersisted.popupQwenApiKey, testQwenApiKey);
assert.equal(fastClosePersisted.storedQwenApiKey, testQwenApiKey);
assert.equal(fastClosePersisted.legacySessionQwenApiKey, "");
assert.equal(fastClosePersisted.hasGeminiBaseUrlField, false);
assert.equal(fastClosePersisted.hasQwenBaseUrlField, false);

await setLanguage(afterFastClose, "de");
const german = await snapshot(afterFastClose);
assert.equal(german.lang, "de");
assert.equal(german.dir, "ltr");
assert.equal(german.targetLabel, "Zielsprache");
assert.equal(german.dataUse, "Datennutzung");
assert.equal(german.start, "▶ Akzeptieren und starten");
assert.equal(german.horizontalOverflow, false);

await setLanguage(afterFastClose, "ar");
const arabic = await snapshot(afterFastClose);
assert.equal(arabic.lang, "ar");
assert.equal(arabic.dir, "rtl");
assert.equal(arabic.targetLabel, "اللغة الهدف");
assert.equal(arabic.dataUse, "استخدام البيانات");
assert.equal(arabic.start, "▶ موافقة وبدء");
assert.equal(arabic.horizontalOverflow, false);

await closePopup(afterFastClose);
const second = await openPopup(extensionId);
const persisted = await snapshot(second);
assert.equal(persisted.lang, "ar");
assert.equal(persisted.dir, "rtl");
assert.equal(persisted.model, "qwen3.5-livetranslate-flash-realtime");
assert.equal(persisted.apiKeyValue, testQwenApiKey);
assert.equal(persisted.storedQwenApiKey, testQwenApiKey);
assert.equal(persisted.hasGeminiBaseUrlField, false);
assert.equal(persisted.hasQwenBaseUrlField, false);

console.log(JSON.stringify({
  extensionId,
  initial: {
    ...initial,
    apiKeyValue: initial.apiKeyValue ? "[stored]" : "",
    popupQwenApiKey: initial.popupQwenApiKey ? "[stored]" : "",
    storedQwenApiKey: initial.storedQwenApiKey ? "[stored]" : ""
  },
  qwenSelected,
  obsoleteOverrideAttempt,
  fastClosePersisted: {
    ...fastClosePersisted,
    apiKeyValue: "[stored]",
    popupQwenApiKey: "[stored]",
    storedQwenApiKey: "[stored]"
  },
  german: { ...german, apiKeyValue: "[stored]", popupQwenApiKey: "[stored]", storedQwenApiKey: "[stored]" },
  arabic: { ...arabic, apiKeyValue: "[stored]", popupQwenApiKey: "[stored]", storedQwenApiKey: "[stored]" },
  persisted: {
    ...persisted,
    apiKeyValue: "[stored]",
    popupQwenApiKey: "[stored]",
    storedQwenApiKey: "[stored]"
  }
}, null, 2));
await closePopup(second);
