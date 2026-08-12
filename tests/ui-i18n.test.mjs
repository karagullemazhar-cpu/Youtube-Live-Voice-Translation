import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  UI_LANGUAGES,
  UI_MESSAGE_KEYS,
  isRtlLanguage,
  languageDisplayName,
  localizeErrorMessage,
  uiText
} from "../ui-i18n.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("21 hedef dilin her UI mesajı paket içinde eksiksizdir", () => {
  assert.equal(UI_LANGUAGES.length, 21);
  assert.equal(new Set(UI_LANGUAGES).size, UI_LANGUAGES.length);
  for (const language of UI_LANGUAGES) {
    for (const key of UI_MESSAGE_KEYS) {
      const value = uiText(language, key, {
        provider: "Gemini",
        service: "Google AI Studio",
        count: 3,
        message: "test"
      });
      assert.ok(value && value !== key, `${language}:${key}`);
      assert.doesNotMatch(value, /\{(?:provider|service|count|message)\}/, `${language}:${key}`);
    }
  }
});

test("popup HTML içindeki bütün sabit yerelleştirme anahtarları geçerlidir", async () => {
  const html = await readFile(path.join(root, "popup.html"), "utf8");
  const keys = [...html.matchAll(/data-i18n=["']([^"']+)["']/g)]
    .map((match) => match[1]);
  assert.ok(keys.length > 0);
  for (const key of keys) assert.ok(UI_MESSAGE_KEYS.includes(key), key);
});

test("dil adları seçili arayüz dilinde, Arapça ve Farsça RTL gösterilir", () => {
  assert.match(languageDisplayName("de", "de"), /Deutsch/i);
  assert.equal(isRtlLanguage("ar"), true);
  assert.equal(isRtlLanguage("fa-IR"), true);
  assert.equal(isRtlLanguage("tr"), false);
});

test("yerel çalışma zamanı hataları hedef dile çevrilir", () => {
  assert.equal(
    localizeErrorMessage("Aktif sekme bulunamadı.", "en", "Gemini"),
    "No active tab was found. Try again on a normal web tab."
  );
  assert.match(
    localizeErrorMessage("Geçerli bir Qwen API anahtarı girin.", "de", "Qwen"),
    /Qwen-API-Schlüssel/
  );
  assert.match(
    localizeErrorMessage("provider-specific diagnostic", "ja", "Gemini"),
    /provider-specific diagnostic/
  );
});
