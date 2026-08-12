// İsteğe bağlı canlı protokol duman testi. Gerçek kullanıcı anahtarı kullanmaz;
// sunucunun setup JSON'unu kabul edip anahtar doğrulama aşamasına geçtiğini sınar.
import assert from "node:assert/strict";
import {
  GEMINI_MODEL,
  geminiRealtimeEndpoint,
  geminiSetupMessage
} from "../shared-config.mjs";

const endpoint = geminiRealtimeEndpoint("invalid-smoke-test-key");

const result = await new Promise((resolve, reject) => {
  const socket = new WebSocket(endpoint);
  const timer = setTimeout(() => {
    try { socket.close(); } catch { /* no-op */ }
    reject(new Error("Gemini sunucusu 10 saniye içinde yanıt vermedi."));
  }, 10_000);

  socket.addEventListener("open", () => {
    socket.send(JSON.stringify(geminiSetupMessage(GEMINI_MODEL, "tr")));
  });
  socket.addEventListener("error", () => {
    // Asıl protokol ayrıntısı close olayının code/reason alanında gelir.
  });
  socket.addEventListener("close", (event) => {
    clearTimeout(timer);
    resolve({ code: event.code, reason: event.reason });
  });
});

assert.equal(result.code, 1007);
assert.match(result.reason, /API key not valid/i);
assert.doesNotMatch(result.reason, /Invalid JSON payload|Unknown name/i);
console.log(JSON.stringify({
  endpoint: new URL(endpoint).origin + new URL(endpoint).pathname,
  setupAccepted: true,
  authenticationReached: true,
  closeCode: result.code,
  reason: result.reason
}, null, 2));
