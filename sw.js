/* ============================================================
   Network Management — service worker (PWA, offline-first)
   Precache danh sách tĩnh (mock không có build nên tên file cố định).
   KHÔNG BAO GIỜ cache host Firebase/Google — dữ liệu realtime đi qua SDK.
   ============================================================ */
const CACHE = 'nm-v2';
const PRECACHE = [
  './',
  './index.html',
  './css/styles.css',
  './js/data.js',
  './js/store.js',
  './js/i18n.js',
  './js/app.js',
  './js/firebase-config.js',
  './js/firebase.js',
  './vendor/leaflet/leaflet.js',
  './vendor/leaflet/leaflet.css',
  './vendor/firebase/firebase-app-compat.js',
  './vendor/firebase/firebase-auth-compat.js',
  './vendor/firebase/firebase-firestore-compat.js',
  './manifest.webmanifest',
  './icon.svg',
];

const FIREBASE_HOSTS = [
  'firebaseapp.com',
  'googleapis.com',
  'gstatic.com',
  'firebaseio.com',
  'google.com',
  'google-analytics.com',
];

function shouldCache(url) {
  try {
    const u = new URL(url);
    const host = u.hostname;
    if (FIREBASE_HOSTS.some((h) => host === h || host.endsWith('.' + h))) return false;
    if (u.pathname.startsWith('/__/')) return false;
    return true;
  } catch (e) {
    return false;
  }
}

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return; // cross-origin (Firebase/fonts) → network
  if (!shouldCache(e.request.url)) return;
  e.respondWith(
    caches.match(e.request).then(
      (cached) =>
        cached ||
        fetch(e.request).then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return res;
        }),
    ),
  );
});
