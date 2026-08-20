/* js/ai-proxy-config.js
   Public client config for the optional AI extraction proxy.
   Safe to commit: this file must never contain provider API secrets.
*/
(function initAIProxyConfig() {
  const isLocal = typeof location !== "undefined" &&
    (location.hostname === "127.0.0.1" || location.hostname === "localhost");
  window.AI_PROXY_CONFIG = Object.freeze({
    baseUrl: isLocal ? "http://127.0.0.1:8787/api/ai" : "",
    timeoutMs: 22000,
  });
}());
