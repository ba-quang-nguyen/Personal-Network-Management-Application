import fs from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// Lấy base qua env, không hard-code: `/` cho dev, `/<repo>/` khi build GitHub Pages.
const base = process.env.BASE_PATH ?? '/'

/**
 * GitHub Pages là static host, KHÔNG có rewrite `** -> /index.html`, nên cần:
 * - `404.html` y hệt `index.html` — Pages trả file đó mà giữ nguyên URL, nhờ vậy
 *   router vẫn khớp route (F5 ở deep link không 404).
 * - `.nojekyll` — không có nó, Jekyll bỏ qua file/thư mục bắt đầu bằng `_`.
 */
function githubPagesFiles(): Plugin {
  return {
    name: 'github-pages-files',
    apply: 'build',
    closeBundle() {
      if (base === '/') return // bản dev/Firebase Hosting không đổi
      const outDir = path.resolve(import.meta.dirname, 'dist')
      fs.copyFileSync(path.join(outDir, 'index.html'), path.join(outDir, '404.html'))
      fs.writeFileSync(path.join(outDir, '.nojekyll'), '')
    },
  }
}

/** Sinh `sw.js` từ danh sách file của BẢN BUILD NÀY (tên có hash → không đoán trước được). */
function generateSw(precache: string[]): string {
  const list = JSON.stringify(precache)
  return `const CACHE = 'nm-v1';
const PRECACHE = ${list};

const FIREBASE_HOSTS = ['firebaseapp.com', 'googleapis.com', 'gstatic.com', 'firebaseio.com', 'google.com', 'google-analytics.com'];

function shouldCache(url) {
  try {
    const u = new URL(url);
    const host = u.hostname;
    if (FIREBASE_HOSTS.some((h) => host === h || host.endsWith('.' + h))) return false;
    if (u.pathname.startsWith('/__/')) return false;
    return true;
  } catch { return false; }
}

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return; // cross-origin (Firebase/fonts) -> network
  if (!shouldCache(e.request.url)) return;
  e.respondWith(
    caches.match(e.request).then((cached) =>
      cached ||
      fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      }),
    ),
  );
});
`
}

/** Service worker chỉ chạy ở bản build (PROD); ở dev tắt hẳn để không tranh HMR. */
function serviceWorker(): Plugin {
  let precache: string[] = []
  return {
    name: 'service-worker',
    apply: 'build',
    generateBundle(_options, bundle) {
      precache = Object.keys(bundle)
        .filter((f) => !f.endsWith('.map') && f !== 'index.html')
        .map((f) => `${base}${f}`)
      // index.html thêm vào precache TƯỜNG MINH (generateBundle chưa chắc đã emit nó).
      precache.push(`${base}index.html`)
      precache.push(`${base}manifest.webmanifest`)
    },
    closeBundle() {
      if (precache.length === 0) return
      const outDir = path.resolve(import.meta.dirname, 'dist')
      fs.writeFileSync(path.join(outDir, 'sw.js'), generateSw(precache))
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), githubPagesFiles(), serviceWorker()],
  resolve: { alias: { '@': path.resolve(import.meta.dirname, './src') } },
  server: { port: 5173 },
  build: {
    rolldownOptions: {
      output: {
        // Tách SDK Firebase ra chunk riêng để browser cache được qua nhiều release.
        codeSplitting: {
          groups: [
            {
              name: 'firebase',
              test: /node_modules[\\/](@firebase|firebase)[\\/]/,
            },
            {
              name: 'react-vendor',
              test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            },
          ],
        },
      },
    },
  },
})
