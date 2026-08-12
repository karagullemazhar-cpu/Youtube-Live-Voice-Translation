import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => readFile(path.join(root, file), "utf8");

test("manifest mağaza sınırları ve dar izinlerle uyumludur", async () => {
  const manifest = JSON.parse(await read("manifest.json"));
  assert.equal(manifest.manifest_version, 3);
  assert.equal(manifest.version, "1.6.0");
  assert.equal(manifest.name, "Youtube Live Voice Translation");
  assert.equal(manifest.short_name, "LT");
  assert.equal(
    manifest.description,
    "This AI application translates the current YouTube video realtime into Turkish or into your chosen language."
  );
  assert.equal("content_scripts" in manifest, false);
  assert.equal("host_permissions" in manifest, false);
  assert.deepEqual(manifest.optional_host_permissions, [
    "https://generativelanguage.googleapis.com/*",
    "https://dashscope-intl.aliyuncs.com/*",
    "wss://dashscope-intl.aliyuncs.com/*"
  ]);
  assert.doesNotMatch(manifest.content_security_policy.extension_pages, /unsafe-eval|http:/);
  assert.match(manifest.content_security_policy.extension_pages, /generativelanguage\.googleapis\.com/);
  assert.match(manifest.content_security_policy.extension_pages, /dashscope-intl\.aliyuncs\.com/);
});

test("popup JavaScript'inin kullandığı bütün kimlikler HTML'de vardır", async () => {
  const [html, script] = await Promise.all([read("popup.html"), read("popup.js")]);
  const ids = [...script.matchAll(/\$\("([A-Za-z0-9_-]+)"\)/g)].map((match) => match[1]);
  for (const id of new Set(ids)) {
    assert.match(html, new RegExp(`id=["']${id}["']`), id);
  }
});

test("Gemini ve Qwen Base URL alanları kullanıcıya açılmaz; yalnız sabit endpointler kullanılır", async () => {
  const [html, popup, background, sharedConfig] = await Promise.all([
    read("popup.html"),
    read("popup.js"),
    read("background.js"),
    read("shared-config.mjs")
  ]);
  assert.doesNotMatch(html, /id=["']geminiBaseUrl["']/);
  assert.doesNotMatch(html, /id=["']qwenBaseUrl["']/);
  assert.doesNotMatch(popup, /setBaseUrl|qwenBaseUrl|normalizeQwenBaseUrl/);
  assert.doesNotMatch(background, /case ["']setBaseUrl["']|qwenBaseUrl|normalizeQwenBaseUrl/);
  assert.match(
    sharedConfig,
    /GEMINI_WS_ENDPOINT\s*=\s*[\s\S]{0,180}GenerativeService\.BidiGenerateContent/
  );
  assert.match(
    sharedConfig,
    /QWEN_WS_ENDPOINT\s*=\s*[\s\S]{0,100}dashscope-intl\.aliyuncs\.com\/api-ws\/v1\/realtime/
  );
});

test("API anahtarları gecikmesiz ve yalnız güvenilir uzantı depolamasında kalıcı saklanır", async () => {
  const [popup, background] = await Promise.all([
    read("popup.js"),
    read("background.js")
  ]);
  assert.match(popup, /addEventListener\("input",[\s\S]{0,180}persistApiKey/);
  assert.match(popup, /type:\s*["']setApiKey["']/);
  assert.doesNotMatch(popup, /setTimeout[\s\S]{0,100}setApiKey/);
  assert.match(background, /setAccessLevel\(\{\s*accessLevel:\s*["']TRUSTED_CONTEXTS["']/);
  assert.match(background, /translatorCredentials/);
  assert.match(background, /chrome\.storage\.local\.set\(\{[\s\S]{0,100}translatorCredentials/);
  assert.match(background, /enqueueCredentialUpdate\(message\)/);
});

test("uzantı sayfaları yalnız paket içi betikleri yükler", async () => {
  for (const file of ["popup.html", "offscreen.html"]) {
    const html = await read(file);
    const sources = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/g)]
      .map((match) => match[1]);
    assert.ok(sources.length > 0, file);
    for (const source of sources) {
      assert.doesNotMatch(source, /^(?:https?:)?\/\//, `${file}: ${source}`);
      await access(path.join(root, source));
    }
  }
});

test("çalışma zamanı kodunda eski workspace, geçersiz ses veya uzaktan kod yoktur", async () => {
  const runtimeFiles = [
    "background.js",
    "offscreen.js",
    "popup.js",
    "shared-config.mjs",
    "ui-i18n.mjs"
  ];
  const code = (await Promise.all(runtimeFiles.map(read))).join("\n");
  assert.doesNotMatch(code, /ws-pob8tfgx0m8v91rn/);
  assert.doesNotMatch(code, /voice:\s*["']Arda["']/);
  assert.doesNotMatch(code, /\beval\s*\(|new\s+Function\s*\(/);
  assert.match(code, /voice:\s*["']Tina["']/);
  assert.match(code, /chrome\.storage\.session/);
  assert.match(code, /\(\[\?\]\.\*\)\?\$/);
});

test("güncel Gemini ve Qwen canlı protokol alanları pakette kullanılır", async () => {
  const [offscreen, sharedConfig, audioWorklet] = await Promise.all([
    read("offscreen.js"),
    read("shared-config.mjs"),
    read("audio-worklet.js")
  ]);
  assert.match(
    sharedConfig,
    /generationConfig:\s*\{[\s\S]{0,240}translationConfig:\s*\{[\s\S]{0,240}\},\s*inputAudioTranscription:\s*\{\},\s*outputAudioTranscription:\s*\{\}/
  );
  assert.match(sharedConfig, /model:\s*`models\/\$\{modelName\}`/);
  assert.match(offscreen, /geminiSetupMessage\(/);
  assert.match(audioWorklet, /Math\.round\(sampleRate \* 0\.1\)/);
  assert.match(offscreen, /qwenSessionAudioConfig\(\)/);
  assert.match(offscreen, /language:\s*String\(options\.sourceLang\s*\|\|\s*["']en["']\)/);
});

test("gizlilik sayfası temel veri uygulamalarını açıklar", async () => {
  const privacy = await read("privacy.html");
  for (const phrase of [
    "Tek amaç",
    "Google Gemini Live API",
    "Alibaba Cloud Model Studio Singapur Qwen LiveTranslate API",
    "chrome.storage.local",
    "chrome.storage.session",
    "Ham ses uzantı tarafından diske kaydedilmez",
    "Chrome izinlerinin gerekçeleri",
    "declarativeNetRequestWithHostAccess",
    "Limited Use",
    "Paket ve kod güvenliği",
    "uzak sunuculardan JavaScript"
  ]) {
    assert.match(privacy, new RegExp(phrase.replaceAll(".", "\\.")), phrase);
  }
});
