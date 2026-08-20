#!/usr/bin/env node
/**
 * build.mjs — sinh lại omoide.html (bản single-file) từ nguồn:
 *   index.html + css/styles.css + vendor/leaflet/* + js/*.js (+ vendor/firebase/*)
 * Chạy:  node build.mjs
 * Deploy: node build.mjs --pages   (lắp ráp thư mục dist/ cho GitHub Pages)
 */
import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const PAGES = process.argv.includes("--pages");

function read(file) {
  return readFileSync(join(root, file), "utf8");
}

/** Nhúng nội dung file vào thẻ <script>, escape chuỗi đóng script nếu có. */
function inlineScript(html, tag, file) {
  const content = read(file).replace(/<\/script/gi, "<\\/script");
  return html.replace(tag, () => "<script>\n" + content + "\n</script>");
}

let html = read("index.html");

// CSS
html = html.replace(
  '<link rel="stylesheet" href="css/styles.css?v=5" />',
  () => "<style>\n" + read("css/styles.css") + "\n</style>",
);
html = html.replace(
  '<link rel="stylesheet" href="vendor/leaflet/leaflet.css" />',
  () => "<style>\n" + read("vendor/leaflet/leaflet.css") + "\n</style>",
);

// JS — đúng thứ tự nạp
html = inlineScript(html, '<script src="vendor/leaflet/leaflet.js"></script>', "vendor/leaflet/leaflet.js");
html = inlineScript(html, '<script src="js/data.js?v=5"></script>', "js/data.js");
html = inlineScript(html, '<script src="js/store.js?v=5"></script>', "js/store.js");
html = inlineScript(html, '<script src="js/firebase-config.js"></script>', "js/firebase-config.js");
html = inlineScript(html, '<script src="js/firebase.js?v=5"></script>', "js/firebase.js");
html = inlineScript(html, '<script src="js/i18n.js?v=5"></script>', "js/i18n.js");
html = inlineScript(html, '<script src="js/app.js?v=5"></script>', "js/app.js");

// SDK Firebase (compat) — inline vào bản single-file để offline hoàn toàn.
// DÙNG function replacement để $& / $` trong mã SDK không bị diễn giải (bug chèn cả file HTML).
const FB_SCRIPTS =
  "\n<script>\n" + read("vendor/firebase/firebase-app-compat.js").replace(/<\/script/gi, "<\\/script") + "\n</script>" +
  "\n<script>\n" + read("vendor/firebase/firebase-auth-compat.js").replace(/<\/script/gi, "<\\/script") + "\n</script>" +
  "\n<script>\n" + read("vendor/firebase/firebase-firestore-compat.js").replace(/<\/script/gi, "<\\/script") + "\n</script>";
html = html.replace("</body>", () => FB_SCRIPTS + "\n</body>");

writeFileSync(join(root, "omoide.html"), html);
console.log("omoide.html built:", html.length, "bytes");

if (PAGES) {
  // Lắp ráp dist/ cho GitHub Pages (artifact của workflow)
  const dist = join(root, "dist");
  rmSync(dist, { recursive: true, force: true });
  const copy = (src, dest) => {
    const from = join(root, src);
    const to = join(dist, dest);
    mkdirSync(dirname(to), { recursive: true });
    copyFileSync(from, to);
  };
  copy("index.html", "index.html");
  copy("omoide.html", "omoide.html");
  copy("index.html", "404.html"); // deep-link: Pages trả 404.html giữ nguyên URL
  writeFileSync(join(dist, ".nojekyll"), "");
  copy("manifest.webmanifest", "manifest.webmanifest");
  copy("sw.js", "sw.js");
  copy("icon.svg", "icon.svg");
  copy("css/styles.css", "css/styles.css");
  ["data.js", "store.js", "firebase-config.js", "firebase-config.example.js", "firebase.js", "i18n.js", "app.js"].forEach((f) =>
    copy("js/" + f, "js/" + f),
  );
  copy("vendor/leaflet/leaflet.js", "vendor/leaflet/leaflet.js");
  copy("vendor/leaflet/leaflet.css", "vendor/leaflet/leaflet.css");
  ["firebase-app-compat.js", "firebase-auth-compat.js", "firebase-firestore-compat.js"].forEach((f) =>
    copy("vendor/firebase/" + f, "vendor/firebase/" + f),
  );
  console.log("dist/ assembled for GitHub Pages");
}
