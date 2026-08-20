# Network Management

CRM quan hệ cá nhân — bộ nhớ riêng tư cho các mối quan hệ của bạn (offline-first, mobile-first).

**Frontend** = mock gốc (`index.html` + `js/` + `css/` + `vendor/`), giữ 100% UI/UX.
**Data** = localStorage (`js/store.js`, seam theo BUILD-GUIDE) + **Firebase** (tuỳ chọn: Firestore `users/{uid}/people`, Auth Email/Password, PWA).

## Chạy local

```bash
python3 -m http.server 8000   # mở http://localhost:8000
node server/ai-proxy.mjs      # optional: backend proxy for DeepSeek extraction at http://127.0.0.1:8787
node build.mjs                # sinh lại omoide.html (bản single-file)
```

## Chức năng

- Capture 4 mode: **Voice** (Web Speech API), **Text**, **Card**, **Manual** → nhận diện → màn **confirm tự điền trường** → sửa → lưu.
- CRUD người + meetings/memories/follow-up, photos, circles, active — persist sau F5.
- Home (care/upcoming/recent), Care queue (sinh nhật/im lặng/lời hứa), Ask (tìm data thật), Map (7 lens + Leaflet location).
- Export/Import JSON, Merge trùng, Delete all.
- i18n **vi / en / ja** (mặc định vi).

## AI proxy (DeepSeek)

Frontend public không giữ API key. Nếu muốn extraction thật cho voice/text/card:

1. Copy `server/.env.example` thành `server/.env.local`.
2. Điền `DEEPSEEK_API_KEY`.
3. Chạy `node server/ai-proxy.mjs`.
4. Mở app local bằng `http://127.0.0.1:8000` hoặc `http://localhost:8000`.

Mặc định `js/ai-proxy-config.js` chỉ tự trỏ sang `http://127.0.0.1:8787/api/ai` khi chạy local. Bản GitHub Pages/public sẽ không gọi backend nào trừ khi bạn chủ động cấu hình `baseUrl` của proxy đã deploy.

## Firebase (tuỳ chọn)

1. Tạo project → bật Firestore + Auth Email/Password.
2. `cp js/firebase-config.example.js js/firebase-config.js` → điền config.
3. Deploy rules: `npx firebase deploy --only firestore:rules` (rules đã test 5/5 ở `app/firebase/`). Project mặc định: `personal-network-management`.

## Deploy GitHub Pages (tự động)

Push lên GitHub → Settings → Pages → source = **GitHub Actions** → workflow `.github/workflows/deploy.yml` chạy `node build.mjs --pages` và deploy `dist/`. URL: `https://<username>.github.io/network-management/`

Lưu ý: GitHub Pages chỉ host frontend tĩnh. Muốn dùng AI extraction ở production, deploy `server/ai-proxy.mjs` lên một backend riêng rồi cấu hình `js/ai-proxy-config.js` với URL proxy public đó.

Chi tiết xem `AGENTS.md`, `ARCHITECTURE.md`, `feature-list.json`.
