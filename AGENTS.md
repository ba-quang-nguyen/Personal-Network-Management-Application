# AGENTS.md — Network Management

App cá nhân "CRM quan hệ". **Frontend = chính mock gốc** (`index.html` + `js/` + `css/` + `vendor/`), giữ 100% UI/UX, **mobile là bề mặt chính**. Data layer theo triết lý BUILD-GUIDE (repository seam bằng vanilla JS), backend Firebase là phase sau.

## Code nằm ở đâu

- `index.html` + `css/styles.css` + `js/*.js` + `vendor/leaflet/` — **frontend chính thức** (sửa ở đây).
- `omoide.html` — bản single-file, **sinh bằng `node build.mjs`** (đừng sửa tay; chạy lại sau mỗi lần đổi nguồn).
- `js/store.js` — data layer DUY NHẤT (persist localStorage `nm-data`, đa tab). UI không đụng localStorage trực tiếp.
- `js/data.js` — vocab + `SAMPLE_PEOPLE` (10 người hư cấu) + helpers tính động (`computeCareItems`, `home*`, `personPos`, `personLinks`, `daysUntilBirthday`…).
- `js/i18n.js` — từ điển **English-only** (theo D5; multi-language đã gỡ, chỉ `STR.en`).
- `js/app.js` — UI/render (giữ nguyên HTML gốc, chỉ đổi nguồn dữ liệu sang Store + logic thật).
- `app/` — **dự án React cũ, chỉ để tham khảo** + nơi chứa `app/firebase/firestore.rules` (đã test) cho Phase Firebase. Không xoá.
- `screenshots/`, `BUILD-GUIDE.md` — tài liệu tham khảo.

## Luật chơi (bắt buộc)

1. **Mọi đọc/ghi dữ liệu qua `Store.*`** (`js/store.js`) — không sửa `PEOPLE`/localStorage trực tiếp trong app.js.
2. **Mọi mutation phải persist**: gọi `Store.*` (đã tự persist + emit) — không mutate rồi quên lưu.
3. **UI 100% mock**: không đổi layout/CSS hiện có khi thêm tính năng; chỉ thêm state/handler.
4. **Data thật bắt đầu RỖNG** — 10 người hư cấu chỉ nạp qua nút "Load sample data".
5. **Chuỗi mới phải thêm vào `STR.en`** trong `js/i18n.js` (app English-only theo D5).
6. **Logic khó để ở `js/data.js` hoặc store.js** (thuần, test được bằng node) — không nhét vào handler DOM.
7. **Không hard-code màu** — dùng token trong `css/styles.css`.
8. **Sau khi sửa nguồn**: `node build.mjs` để cập nhật `omoide.html` + chạy bộ test smoke.

## Lệnh & test

```bash
node build.mjs                 # sinh lại omoide.html (single-file, gồm SDK Firebase)
node build.mjs --pages         # lắp ráp dist/ cho GitHub Pages (404.html + .nojekyll)
node --check js/*.js           # syntax
node /tmp/test-store.mjs       # smoke: store CRUD/persist/export-import
node /tmp/test-boot.mjs        # smoke: boot local-only
node /tmp/test-screens.mjs     # smoke: render mọi màn hình + capture modes
node /tmp/test-firebase-mode.mjs  # smoke: login + sync (SDK stub)
python3 -m http.server 8000    # chạy local (localhost:8000) — test mobile qua Chrome device mode
```

## Firebase (tuỳ chọn)

1. Tạo project Console → bật **Firestore** (production mode) + **Auth Email/Password**.
2. Copy `js/firebase-config.example.js` → `js/firebase-config.js` rồi điền config (file bị gitignore).
3. Deploy rules: `cd app && npx firebase deploy --only firestore:rules` (rules đã test 5/5 ở `app/firebase/`).
4. Mở app → login → data sync lên `users/{uid}/people/{id}`.

## Deploy GitHub Pages

Push repo → Settings → Pages → source = **GitHub Actions** → `.github/workflows/deploy.yml` chạy `node build.mjs --pages` + deploy `dist/`.

## Bẫy đã biết

- `PEOPLE` là `let` — Store **gán lại mảng mới** khi loadSample/import/deleteAll; mọi helper đọc qua `byId()`/`activePeople()` (closure theo biến, an toàn). Đừng giữ tham chiếu mảng cũ.
- Capture voice cần HTTPS hoặc localhost (Web Speech API); fallback text đã có.
- **build.mjs nhúng file vào HTML phải dùng function replacement** — `String.replace` với chuỗi sẽ diễn giải `$&`/`$`` trong mã SDK Firebase → chèn cả file HTML (đã dính, đã sửa).
- `omoide.html` do `build.mjs` sinh — đừng sửa tay.
- Đổi cấu trúc dữ liệu → tăng `STORE_VERSION` trong `js/store.js`.
- `setPhotoNote` persist KHÔNG emit (tránh mất focus khi gõ).
- Firebase mode: đăng xuất sẽ **xoá bản local** (cloud là nguồn chân lý).

## Trạng thái

Xem `feature-list.json` (một nguồn chân lý về việc gì xong/chưa + làm gì tiếp).
