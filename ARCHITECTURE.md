# ARCHITECTURE.md — Network Management

## Cấu trúc tầng (phụ thuộc một chiều)

```
app/src/
├── app/            router · provider · layout · guards · messages   — biết mọi feature
├── features/       auth · people · home · care · ask · map · settings · capture
│   └── <feature>/
│       ├── api/        contract + memory + firestore + index  (repository seam)
│       ├── components/  · hooks/  · lib/  · store/  · pages/
│       ├── messages.ts  · schemas.ts  · types.ts
├── shared/         components/ui · components · hooks · lib · i18n · mocks
└── styles/globals.css   design token (Tailwind v4 @theme inline)
```

`shared/` **không bao giờ** import `features/`. Firebase SDK chỉ được import trong `features/*/api/firestore-*.ts` + `shared/lib/firebase.ts` + `features/auth/api/firebase-auth-adapter.ts`.

## Repository seam

Mỗi nhóm dữ liệu = **1 contract + 2 implementation + 1 file chọn**:

```
features/people/api/
├── people-repository.ts             contract (JSDoc ràng buộc nghiệp vụ)
├── memory-people-repository.ts      chạy khi .env.local trống (localStorage + pub-sub + đa tab)
├── firestore-people-repository.ts   chạy khi có VITE_FIREBASE_*
└── index.ts                         isFirebaseConfigured ? firestore : memory
```

`.env.local` trống → app chạy in-memory, không sửa dòng code nào.

## Luồng dữ liệu

```
Component ──> Hook (usePeople) ──> Repository ──> Firestore | Memory store
    ↑                                  │
    └──────────── snapshot (onSnapshot / pub-sub) ┘
```

Không có tầng cache trung gian — `onSnapshot` đã là nguồn chân lý.

## Data model (Firestore, 1 người dùng)

```
users/{uid}                — profile (tạo lúc đăng nhập lần đầu)
  ├── people/{id}          — 1 người: ~40 field + meetings[] · memories[] · followUps[] · dates[]
  └── circles/{id}         — name, color, memberIds[]
```

- Sub-entity **nhúng** vào doc người (dữ liệu nhỏ, không counter, rules 1 dòng).
- `ownerId` ghi trên mỗi doc (phòng thủ). Rules: `match /users/{uid}/{document=**} { allow read, write: if request.auth.uid == uid; }`.
- `createdAt`/`updatedAt` là ISO string; các field "when" giữ chuỗi hiển thị (khớp prototype).

## Auth

Email/Password + quên mật khẩu (`sendPasswordResetEmail`). `AUTH_ENABLED = isFirebaseConfigured` → stub adapter pass-through khi chưa có Firebase. Adapter auth **nạp động** để SDK Firebase không vào bundle khởi động (`features/auth/api/index.ts`).

## i18n

`en` là nguồn; `vi`/`ja` `satisfies typeof en` → thiếu khoá = typecheck đỏ. Mặc định `vi`. Ngày đi qua `useDateFnsLocale()`.

## Deploy

GitHub Pages: `BASE_PATH=/<repo>/ npm run build`, kèm `404.html` + `.nojekyll` (chưa thêm — xem `feature-list.json`). PWA `sw.js` + manifest (chưa thêm).

## Test (dự kiến)

- Unit (`vitest`, node env): `lib/` thuần (care, search, dates, ordering), mock invariant, `dictionaries.test.ts`.
- Rules (`test:rules`, cần Java): chủ đọc/ghi được; uid khác bị chặn; deny-by-default.
- Tích hợp (`test:firebase`): CRUD 1 người sau đăng nhập.
