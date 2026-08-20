# BUILD-GUIDE.md — dựng một ứng dụng cấu trúc tương tự

Hướng dẫn dựng lại **bộ khung** của ứng dụng: React 19 + TypeScript strict + Vite, Tailwind v4 + shadcn/ui, Firebase (Firestore + Auth + Storage), i18n có kiểu, và **repository seam** cho phép app chạy đầy đủ khi chưa có Firebase.

Đọc theo thứ tự. Mỗi bước tự chạy được và tự kiểm chứng được — không phải viết hết mới thấy màn hình đầu tiên.

| Bước                                                  | Kết quả kiểm chứng được                               | Thời lượng  |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------- |
| [0. Yêu cầu môi trường](#0-yêu-cầu-môi-trường)        | `node -v` ≥ 20, `java -version` chạy                  | 15 phút     |
| [1. Khởi tạo + tooling](#1-khởi-tạo-dự-án--tooling)   | `npm run dev` mở được trang trắng có chữ              | 1 giờ       |
| [2. Design token + shadcn](#2-design-token--shadcnui) | `/dev/ui` liệt kê component, đổi dark mode được       | 2 giờ       |
| [3. App shell](#3-app-shell-router--provider--layout) | Điều hướng giữa 2 route, F5 không nháy sáng→tối       | 2 giờ       |
| [4. i18n có kiểu](#4-i18n-có-kiểu)                    | Đổi ngôn ngữ đổi toàn bộ chuỗi; thiếu khoá = build đỏ | 2 giờ       |
| [5. Repository seam](#5-repository-seam--tầng-mock)   | Tạo/sửa/xoá dữ liệu, F5 vẫn còn — chưa cần Firebase   | 4 giờ       |
| [6. Firebase setup](#6-firebase-setup)                | `.env.local` có config → cùng UI chạy trên Firestore  | 4 giờ       |
| [7. Feature vertical slice](#7-một-feature-đủ-tầng)   | Một feature 7 file, có test cho `lib/`                | mỗi feature |
| [8. Test 3 tầng](#8-ba-tầng-test)                     | `npm test`, `test:rules`, `test:firebase` đều xanh    | 3 giờ       |
| [9. Build & deploy](#9-build--deploy)                 | URL thật, deep link không 404                         | 2 giờ       |
| [10. Tài liệu vận hành](#10-tài-liệu-vận-hành)        | 3 file để phiên sau (người/agent) biết đứng ở đâu     | 1 giờ       |

---

## Năm trụ cột — hiểu 5 cái này là hiểu cả cấu trúc

Trước khi gõ lệnh nào, đây là những quyết định làm nên cấu trúc. Mọi bước bên dưới chỉ là cách hiện thực hoá chúng.

**1. Bốn tầng, phụ thuộc một chiều.**

```
   app/        router · provider · layout        — biết mọi feature
     ↓
 features/     auth · <domain> · dev             — import chéo được, nhưng một chiều
     ↓
  shared/      components/ui · components · hooks · lib · i18n
     ↓
Firebase SDK   CHỈ được import trong features/*/api/firestore-*.ts
```

`shared/` **không bao giờ** import `features/`. Vi phạm chiều này là cách nhanh nhất biến codebase thành một cục.

**2. Repository seam.** Mỗi nhóm dữ liệu có **1 contract + 2 implementation + 1 file chọn**. Hệ quả: `.env.local` trống → app chạy in-memory, không sửa một dòng code nào. Người mới clone repo về `npm run dev` là xem được ngay; UI làm được trước khi backend sẵn sàng.

**3. Từ điển có kiểu thay vì i18n runtime.** Bản `en` là nguồn, `vi`/`ja` khai kiểu `typeof en` → thiếu khoá là **typecheck đỏ**, không phải phát hiện lúc chạy khi ô hiện ra chữ `board.filter.title`.

**4. Design token, cấm hard-code màu.** Màu khai một lần ở `:root`/`.dark`, map sang utility bằng `@theme inline`. `grep -rE "bg-(red|green|blue)-[0-9]" src/` phải rỗng.

**5. Logic khó tách ra `lib/` thuần và viết test.** Cái gì chỉ e2e mới chạm tới được (kéo thả, tính ngày, thứ tự) thì phải kéo ra thành hàm không phụ thuộc React. Đây là chỗ bắt được bug thật với chi phí ~1 giây chạy test.

---

## 0. Yêu cầu môi trường

| Cần gì           | Vì sao                                                                                   | Kiểm tra                 |
| ---------------- | ---------------------------------------------------------------------------------------- | ------------------------ |
| Node ≥ 20        | Vite 8 yêu cầu; `import.meta.dirname` cần Node 20+                                       | `node -v`                |
| npm ≥ 10         | workspaces + overrides                                                                   | `npm -v`                 |
| **Java JRE 11+** | Firebase Emulator Suite chạy trên JVM — **không có Java thì không chạy được rules test** | `java -version`          |
| firebase-tools   | deploy rules/indexes/hosting, chạy emulator                                              | `npx firebase --version` |
| Tài khoản Google | tạo Firebase project                                                                     | —                        |

```bash
# macOS
brew install node
brew install --cask temurin        # Java — cài ngay từ đầu, đừng để tới lúc cần test rules
```

> **Kinh nghiệm đắt:** thiếu Java thì 100+ ca rules test viết ra không chạy được ca nào, mà rules lại đúng là chỗ dễ vỡ nhất. Cài Java ở Bước 0, không phải Bước 8.

---

## 1. Khởi tạo dự án + tooling

### 1.1 Tạo project

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

### 1.2 Cài dependency

Chia theo vai trò để biết cái nào bỏ được:

```bash
# Bắt buộc — nền tảng
npm i react react-dom react-router zustand
npm i clsx tailwind-merge class-variance-authority
npm i tailwindcss @tailwindcss/vite tw-animate-css
npm i lucide-react

# Backend
npm i firebase

# Form + validate
npm i react-hook-form @hookform/resolvers zod

# Theo nhu cầu domain
npm i date-fns                     # ngày tháng + locale
npm i fractional-indexing          # thứ tự kéo-thả (xem 7.4)
npm i @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities   # kéo thả
npm i @tanstack/react-table        # bảng có sort/filter
npm i sonner cmdk react-day-picker radix-ui   # UI primitive shadcn cần

# Dev
npm i -D typescript vite @vitejs/plugin-react @types/node @types/react @types/react-dom
npm i -D vitest @vitest/coverage-v8
npm i -D oxlint prettier prettier-plugin-tailwindcss
npm i -D firebase-tools @firebase/rules-unit-testing
```

### 1.3 Tech stack — chọn gì, vì sao, thay thế được không

| Vai trò      | Chọn                     | Vì sao chọn cái này                                                                                        | Thay thế        |
| ------------ | ------------------------ | ---------------------------------------------------------------------------------------------------------- | --------------- |
| Build        | **Vite 8**               | dev server nhanh, `import.meta.env` sẵn, plugin API đủ để tự sinh service worker                           | Rspack, Next    |
| Ngôn ngữ     | **TypeScript strict**    | thêm `noUncheckedIndexedAccess` — bắt được `array[0]` có thể `undefined`, ca lỗi runtime phổ biến nhất     | —               |
| Router       | **react-router 8**       | `createBrowserRouter` + `lazy()` per-route, `errorElement` bắt cả lỗi render lẫn loader                    | TanStack Router |
| CSS          | **Tailwind v4**          | không còn `tailwind.config.js`; token khai bằng CSS variable + `@theme inline`                             | CSS Modules     |
| Component    | **shadcn/ui (Radix)**    | copy code vào repo, sửa được, không bị khoá version; a11y do Radix lo                                      | MUI, Mantine    |
| UI state     | **Zustand + persist**    | 3KB, không cần Provider, `persist` sẵn cho filter/zoom/view mode                                           | Redux, Jotai    |
| Server state | **onSnapshot trực tiếp** | dữ liệu realtime — `onSnapshot` **đã là** nguồn chân lý, thêm TanStack Query là hai nguồn chân lý cãi nhau | TanStack Query  |
| Lint         | **oxlint**               | nhanh gấp ~50× ESLint, đủ rule cho React hooks + import cycle                                              | ESLint          |
| Test         | **Vitest**               | dùng chung config/alias với Vite, `environment: node` cho `lib/` thuần → toàn bộ suite ~1 giây             | Jest            |
| Backend      | **Firebase**             | realtime + auth + storage + hosting trong một; không cần server                                            | Supabase        |

### 1.4 Config — nội dung quan trọng

**`tsconfig.json`** dùng project references để config app và config Node (vite.config.ts) không lẫn nhau:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": { "paths": { "@/*": ["./src/*"] } }
}
```

**`tsconfig.app.json`** — phần đáng chú ý:

```jsonc
{
  "compilerOptions": {
    "target": "es2023",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "noEmit": true,
    "types": ["vite/client"],

    // TS 6 bỏ baseUrl — paths giải theo vị trí file tsconfig này.
    // PHẢI khớp alias trong vite.config.ts, lệch là chạy được mà build đỏ.
    "paths": { "@/*": ["./src/*"] },

    "strict": true,
    "noUncheckedIndexedAccess": true, // array[0] có type T | undefined
    "verbatimModuleSyntax": true, // buộc `import type`
    "erasableSyntaxOnly": true, // cấm enum/namespace/parameter property
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
  },
  "include": ["src"],
}
```

**`vite.config.ts`**:

```ts
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Lấy base qua env, không hard-code: `/` cho dev + Firebase Hosting,
// `/<repo>/` khi build cho GitHub Pages.
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "./src") } },
  server: { port: 5173 },
  build: {
    rollupOptions: {
      output: {
        // Tách SDK Firebase ra chunk riêng: nặng ~150KB gzip nhưng gần như
        // không đổi giữa các lần deploy → browser cache được qua nhiều release.
        advancedChunks: {
          groups: [
            {
              name: "firebase",
              test: /node_modules[\\/](@firebase|firebase)[\\/]/,
            },
            {
              name: "react-vendor",
              test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            },
          ],
        },
      },
    },
  },
});
```

**`.prettierrc.json`** — `prettier-plugin-tailwindcss` tự sắp thứ tự class, hết tranh luận:

```json
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "all",
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindStylesheet": "./src/styles/globals.css",
  "tailwindFunctions": ["cn", "cva"]
}
```

**`.oxlintrc.json`** — 5 rule quan trọng nhất:

```json
{
  "plugins": ["react", "typescript", "oxc", "import"],
  "rules": {
    "react/rules-of-hooks": "error",
    "typescript/no-explicit-any": "error",
    "typescript/consistent-type-imports": "warn",
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "eqeqeq": ["error", "smart"]
  }
}
```

**`package.json` scripts** — 5 lệnh phải sạch trước khi báo xong việc:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "typecheck": "tsc -b --noEmit",
    "lint": "oxlint",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "emu": "firebase emulators:start --import=.emulator-data --export-on-exit=.emulator-data",
    "emu:clean": "firebase emulators:start",
    "test:rules": "firebase emulators:exec --only firestore 'vitest run --config vitest.rules.config.ts'",
    "test:firebase": "vitest run --config vitest.integration.config.ts",
    "rules:deploy": "firebase deploy --only firestore:rules,firestore:indexes",
    "storage:deploy": "firebase deploy --only storage:rules",
    "deploy:dev": "npm run build && firebase deploy --only hosting -P dev"
  }
}
```

**Nghiệm thu bước 1:** `npm run dev` mở được trang, `npm run typecheck` và `npm run lint` sạch.

---

## 2. Design token + shadcn/ui

### 2.1 `src/styles/globals.css`

Ba khối, đúng thứ tự này:

```css
@import "tailwindcss";
@import "tw-animate-css";

/* Dark mode bằng class, không dùng @media — để user tự chọn và lưu được */
@custom-variant dark (&:is(.dark *));

:root {
  --radius: 0.625rem;

  /* Token shadcn (light) */
  --background: oklch(1 0 0);
  --foreground: oklch(0.141 0.005 285.823);
  --primary: oklch(0.21 0.006 285.885);
  --muted-foreground: oklch(0.552 0.016 285.938);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.92 0.004 286.32);
  /* … card, popover, secondary, accent, input, ring */

  /* Token RIÊNG của domain — đây là chỗ chống hard-code màu */
  --status-todo: oklch(0.62 0.02 286);
  --status-progress: oklch(0.65 0.13 250);
  --status-done: oklch(0.7 0.15 150);
  --status-overdue: oklch(0.58 0.22 25);
  --priority-low: oklch(0.72 0.1 200);
  --priority-urgent: oklch(0.58 0.22 25);

  /* Token layout — dùng chung giữa nhiều component, lệch 1px là lệch cả lưới */
  --sidebar-width: 16rem;
  --header-height: 3.5rem;
  --row-height: 2rem;
}

.dark {
  --background: oklch(0.141 0.005 285.823);
  --foreground: oklch(0.985 0 0);
  /* … khai lại TOÀN BỘ token trên */
}

/* `inline` để giá trị đọc từ :root/.dark tại runtime — dark mode tự đổi,
   không phải viết `dark:` ở từng chỗ dùng */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-border: var(--border);
  --color-status-done: var(--status-done);
  --color-status-overdue: var(--status-overdue);
  --color-priority-urgent: var(--priority-urgent);

  --spacing-sidebar: var(--sidebar-width);
  --spacing-header: var(--header-height);
  --spacing-row: var(--row-height);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-lg: var(--radius);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

Dùng **oklch** chứ không phải hex: nội suy màu và chỉnh độ sáng cho ra kết quả đều mắt, và cùng một token đổi sang dark chỉ cần đổi tham số L.

### 2.2 shadcn/ui

```bash
npx shadcn@latest init
npx shadcn@latest add button input label card dialog sheet dropdown-menu \
  select tabs badge avatar checkbox switch tooltip popover command \
  table skeleton separator progress alert alert-dialog textarea sonner
```

`components.json` — chú ý `aliases` trỏ vào `shared/`:

```json
{
  "style": "new-york",
  "tsx": true,
  "tailwind": {
    "css": "src/styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/shared/components",
    "ui": "@/shared/components/ui",
    "lib": "@/shared/lib",
    "hooks": "@/shared/hooks",
    "utils": "@/shared/lib/utils"
  }
}
```

> ⚠️ **`npx shadcn add` ghi đè file đã sửa tay.** Component nào trong `ui/` đã sửa thì đừng chạy lại lệnh add cho nó. Ghi lại danh sách file đã sửa vào AGENTS.md.

### 2.3 `cn()` — bắt buộc

```ts
// src/shared/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Bắt buộc dùng khi component nhận `className` từ prop: nếu chỉ nối string,
 * class truyền vào KHÔNG override được class mặc định (cùng specificity,
 * thắng/thua phụ thuộc thứ tự trong file CSS).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 2.4 Trang `/dev/ui`

Một trang liệt kê mọi component + mọi design token, **chỉ đăng ký ở dev**. Rẻ để làm, và là cách duy nhất thấy ngay token nào vỡ ở dark mode mà không phải bấm qua từng màn hình.

**Nghiệm thu bước 2:** mở `/dev/ui`, bật/tắt dark mode, mọi token đọc được ở cả hai chế độ.

---

## 3. App shell: router · provider · layout

### 3.1 Chống nháy sáng→tối (đặt trong `index.html`)

Script này phải chạy **trước** khi React mount, nếu không mỗi lần F5 sẽ thấy một nháy trắng:

```html
<script>
  (() => {
    try {
      const stored = localStorage.getItem("my-app.theme");
      const isDark =
        stored === "dark" ||
        ((stored === "system" || !stored) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    } catch {
      /* localStorage bị chặn — React sẽ tự xử lý */
    }
  })();
</script>
```

Logic ở đây phải khớp `shared/hooks/use-theme.tsx`. Lệch là nháy trở lại.

### 3.2 Thứ tự provider có ý nghĩa

```tsx
// src/app/providers.tsx
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      {" "}
      {/* ngoài cùng: toast và confirm dialog cũng cần chuỗi */}
      <ThemeProvider>
        <AuthProvider>
          {" "}
          {/* feature cần biết user */}
          <TooltipProvider delayDuration={300}>
            <ConfirmDialogProvider>
              <Suspense fallback={<RouteFallback />}>{children}</Suspense>
              <Toaster position="top-right" richColors closeButton />
            </ConfirmDialogProvider>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
}
```

### 3.3 Router: lazy từng route

```tsx
export const router = createBrowserRouter(
  [
    {
      element: (
        <PublicOnlyRoute>
          <AuthLayout />
        </PublicOnlyRoute>
      ),
      errorElement: <RouteErrorBoundary />,
      children: [
        {
          path: "login",
          Component: lazy(() =>
            import("@/features/auth/pages/login-page").then((m) => ({
              default: m.LoginPage,
            })),
          ),
        },
      ],
    },
    {
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      errorElement: <RouteErrorBoundary />,
      children: [
        { index: true, element: <Navigate to="/items" replace /> },
        {
          path: "items",
          Component: lazy(() =>
            import("@/features/items/pages/items-page").then((m) => ({
              default: m.ItemsPage,
            })),
          ),
        },
        ...devRoutes,
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ],
  // Khớp router với `base` của bản build. Thiếu dòng này thì deploy lên
  // GitHub Pages mọi navigate() sẽ trỏ ra ngoài app.
  { basename: import.meta.env.BASE_URL.replace(/\/$/, "") },
);
```

**Hai cạm bẫy:**

1. Route chỉ có ở dev thì `lazy()` phải nằm **trong** nhánh điều kiện. Để ngoài thì `import()` vẫn nằm trong module graph → Vite vẫn emit chunk đó vào bản production.

   ```tsx
   const devRoutes: RouteObject[] = import.meta.env.DEV
     ? [
         {
           path: "dev/ui",
           Component: lazy(() =>
             import("@/features/dev/dev-ui-page").then((m) => ({
               default: m.DevUiPage,
             })),
           ),
         },
       ]
     : [];
   ```

2. `errorElement` phải đặt ở nhánh layout, không phải từng route con — nếu không lỗi sẽ nổ lên tận root và mất cả layout.

### 3.4 Route guard

```tsx
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Splash />; // chưa biết → chưa redirect
  if (!AUTH_ENABLED) return children; // auth chưa bật (đang dùng stub) → pass-through
  if (!user) {
    // Giữ trang đang muốn vào để quay lại sau khi đăng nhập
    return (
      <Navigate
        to="/login"
        state={{ returnUrl: location.pathname + location.search }}
        replace
      />
    );
  }
  return children;
}
```

`if (loading) return <Splash />` **trước** mọi nhánh redirect. Thiếu nó thì mỗi lần F5 người dùng bị đá về `/login` một nhịp rồi mới quay lại.

**Nghiệm thu bước 3:** điều hướng giữa 2 route, F5 giữ nguyên trang, không nháy màu, chunk của route chưa vào chưa được tải (xem tab Network).

---

## 4. i18n có kiểu

Tự viết ~120 dòng thay vì cài i18next. Lý do: app chỉ cần tra chuỗi theo khoá và đổi ngôn ngữ lúc chạy, không cần plural rules/ICU/lazy namespace. Đổi lại giữ được kiểu chặt.

### 4.1 Hạ tầng — `src/shared/i18n/`

| File                   | Việc                                                                     |
| ---------------------- | ------------------------------------------------------------------------ |
| `types.ts`             | `LOCALES`, `Locale`, `Dictionary<T> = Record<Locale, T>`, nhãn ngôn ngữ  |
| `locale.ts`            | logic thuần: `isLocale`, `resolveInitialLocale`, `pickMessages`          |
| `context.ts`           | `createContext` — **tách khỏi provider** để Fast Refresh không mất state |
| `locale-provider.tsx`  | chỉ export component; set `<html lang>`; lưu lựa chọn vào localStorage   |
| `hooks.ts`             | `useLocale`, `useMessages`, `useDateFnsLocale`                           |
| `dictionaries.test.ts` | khoá tính đầy đủ của mọi từ điển                                         |

```ts
// types.ts
export const LOCALES = ["en", "vi", "ja"] as const;
export type Locale = (typeof LOCALES)[number];

/**
 * Mặc định `en`, KHÔNG đoán theo navigator.language: gần như toàn bộ máy trong
 * công ty để tiếng Việt, đoán tự động thì mặc định thật sự sẽ là `vi` — trái
 * yêu cầu, và cùng một app mở ở hai máy lại ra hai ngôn ngữ khác nhau.
 */
export const DEFAULT_LOCALE: Locale = "en";

/** Bản `en` là nguồn; `vi`/`ja` phải cùng hình dạng. */
export type Dictionary<T> = Record<Locale, T>;
```

### 4.2 Từ điển của một feature — `features/<tên>/messages.ts`

Mấu chốt nằm ở dòng `satisfies typeof en`:

```ts
import type { Dictionary } from "@/shared/i18n";

const en = {
  title: "Items",
  empty: "No items yet",
  createdBy: "Created by {name}", // placeholder, KHÔNG nối chuỗi trong JSX
  countLabel: "{count} items",
};

const vi = {
  title: "Danh mục",
  empty: "Chưa có mục nào",
  createdBy: "{name} đã tạo",
  countLabel: "{count} mục",
} satisfies typeof en; // ← thiếu khoá ở đây là typecheck ĐỎ

const ja = {
  title: "アイテム",
  empty: "アイテムがありません",
  createdBy: "作成者：{name}",
  countLabel: "{count} 件",
} satisfies typeof en;

export const ITEM_MESSAGES: Dictionary<typeof en> = { en, vi, ja };
```

Dùng ở component: `const m = useMessages(ITEM_MESSAGES)` rồi `{m.title}`. Chuỗi có tham số: `m.createdBy.replace('{name}', user.displayName)`.

**Không nối chuỗi trong JSX** (`<>Tạo bởi {name}</>`) — trật tự từ mỗi ngôn ngữ một khác, tiếng Nhật đặt động từ ở cuối câu.

**Chỗ không phải component** (lib thuần, zod schema) thì **không gọi hook**: nhận messages qua tham số, hoặc trả về khoá lỗi rồi để UI dịch.

### 4.3 Test khoá tính đầy đủ

Typecheck đã bắt ca thiếu khoá. Test này bắt hai ca kiểu **không** bắt được:

1. "dịch" bằng cách để chuỗi rỗng;
2. quên dịch — bê nguyên câu tiếng Anh sang bản `vi`/`ja`.

```ts
describe.each(DICTIONARIES)("từ điển %s", (_name, dictionary) => {
  const english = entriesOf(dictionary, "en");

  it.each(LOCALES)("bản %s có cùng bộ khoá với bản en", (locale) => {
    expect([...entriesOf(dictionary, locale).keys()].sort()).toEqual(
      [...english.keys()].sort(),
    );
  });

  it.each(LOCALES)("bản %s không có chuỗi rỗng", (locale) => {
    /* … */
  });

  it.each(["vi", "ja"] as const)("bản %s thực sự được dịch", (locale) => {
    const translated = entriesOf(dictionary, locale);
    const identical = [...english].filter(
      ([key, value]) => translated.get(key) === value,
    );
    // Ngưỡng 30%: một số chuỗi trùng là ĐÚNG ('My App', '%', 'WIP limit'),
    // nhưng quá nửa từ điển trùng nghĩa là ai đó copy bản en rồi quên dịch.
    expect(identical.length / english.size).toBeLessThan(0.3);
  });
});
```

Nhớ **đăng ký từ điển mới vào mảng `DICTIONARIES`** — thiếu bước này thì từ điển mới không được test nào phủ.

### 4.4 Ngày tháng

Ngày đi qua `useDateFnsLocale()`, **không** import thẳng `vi` từ `date-fns/locale`:

```ts
const DATE_FNS_LOCALE: Record<Locale, DateFnsLocale> = { en: enUS, vi, ja };
export function useDateFnsLocale() {
  return DATE_FNS_LOCALE[useLocale().locale];
}
```

Ngày **date-only** vẫn lưu chuỗi `YYYY-MM-DD`, chỉ cách hiển thị đổi theo ngôn ngữ.

**Nghiệm thu bước 4:** đổi ngôn ngữ trên header → toàn bộ chuỗi đổi, `<html lang>` đổi, F5 giữ lựa chọn. Xoá một khoá ở bản `vi` → `npm run typecheck` đỏ.

---

## 5. Repository seam + tầng mock

**Đây là quyết định kiến trúc quan trọng nhất của cả cấu trúc này.** Làm đúng thì UI hoàn thiện được trước khi có backend, và người mới clone repo về là chạy được ngay.

### 5.1 Bốn file cho mỗi nhóm dữ liệu

```
features/items/api/
├── items-repository.ts             ← type ItemsRepository (contract, có JSDoc ràng buộc nghiệp vụ)
├── memory-items-repository.ts      ← chạy khi .env.local trống
├── firestore-items-repository.ts   ← chạy khi có VITE_FIREBASE_*
└── index.ts                        ← isFirebaseConfigured ? firestore : memory
```

```ts
// index.ts — cả seam gói trong 5 dòng
import { isFirebaseConfigured } from "@/shared/lib/firebase-config";
import { firestoreItemsRepository } from "./firestore-items-repository";
import { memoryItemsRepository } from "./memory-items-repository";
import type { ItemsRepository } from "./items-repository";

export const itemsRepository: ItemsRepository = isFirebaseConfigured
  ? firestoreItemsRepository
  : memoryItemsRepository;
```

### 5.2 Contract quy định cả nghiệp vụ, không chỉ chữ ký hàm

```ts
export type ItemsRepository = {
  /** Trả hàm unsubscribe — khớp đúng chữ ký `onSnapshot` để bản Firestore không phải bọc thêm. */
  subscribeItems: (
    projectId: string,
    onChange: (items: Item[]) => void,
  ) => () => void;

  /**
   * Tạo item. PHẢI atomic: item doc + tăng `itemCount` trên project trong 1 batch.
   * Để UI tự cộng counter thì quên một nhánh là counter lệch vĩnh viễn, rất khó phát hiện.
   */
  createItem: (input: CreateItemInput, actorUid: string) => Promise<string>;

  /** PHẢI tự set `isDone`/`completedAt` và cập nhật `doneCount`. */
  moveItem: (itemId: string, columnId: string, order: string) => Promise<void>;
};
```

JSDoc ở đây không phải trang trí: nó là chỗ duy nhất ghi được ràng buộc mà **cả hai implementation** phải tuân theo.

### 5.3 Bản memory không phải stub rỗng

Nó phải mô phỏng đúng hành vi Firestore, nếu không thì đổi sang Firestore là vỡ:

| Mô phỏng                  | Cách làm                                     | Vì sao cần                                |
| ------------------------- | -------------------------------------------- | ----------------------------------------- |
| `onSnapshot`              | `Set<listener>` + emit sau mỗi mutation      | hook viết một lần dùng cho cả hai bản     |
| Persist                   | localStorage, có `STORAGE_VERSION`           | test UI bằng tay không mất dữ liệu sau F5 |
| Đồng bộ nhiều tab         | lắng nghe sự kiện `storage`                  | giống realtime thật                       |
| Độ trễ mạng               | `await delay()` 60–120ms                     | thấy được skeleton/loading state          |
| `increment()` trong batch | hàm `bumpCounters()` cộng ngay cùng mutation | counter lệch lộ ra ở bản memory trước     |

### 5.4 `mocks/persistence.ts` — ba cơ chế

```ts
const KEY_PREFIX = "my-app.mock";
/** Tăng MỖI KHI cấu trúc mock đổi, kèm ghi chú đổi gì — dữ liệu cũ sẽ bị bỏ, seed lại. */
const STORAGE_VERSION = 1;

type Envelope<T> = { version: number; data: T };

export function loadMockData<T>(name: string): T | null {
  try {
    const raw = localStorage.getItem(`${KEY_PREFIX}.${name}`);
    if (!raw) return null;
    const envelope = JSON.parse(raw, reviveDates) as Envelope<T>;
    if (envelope.version !== STORAGE_VERSION) return null; // cấu trúc đổi → seed lại
    return envelope.data;
  } catch {
    return null; // JSON hỏng hoặc localStorage bị chặn — coi như chưa có gì
  }
}

/** Mỗi store tự đăng ký hàm reset — tránh store A phải import store B chỉ để reset (import vòng). */
const resetHandlers = new Set<() => void>();
export function registerMockReset(handler: () => void) {
  resetHandlers.add(handler);
}

/** Xoá task thì store con (comment/file) tự dọn — cũng bằng registry, vì store con đã import store cha. */
const cascades = new Set<(id: string) => void>();
export function registerCascade(handler: (id: string) => void) {
  cascades.add(handler);
}
```

Ba điều rút ra:

1. **`STORAGE_VERSION` phải tăng khi đổi cấu trúc mock.** Quên là localStorage cũ làm app vỡ theo cách rất khó đoán — và chỉ vỡ trên máy người đã dùng, máy mới thì bình thường.
2. **Dùng registry, đừng import trực tiếp giữa các store.** Store con đã import store cha để cập nhật counter → import ngược lại thành vòng.
3. **JSON không có `Date`.** Cần một `reviver` đổi lại các field ngày (`createdAt`, `updatedAt`, …) thành `Date` khi đọc.

### 5.5 Banner cảnh báo ở dev

Khi đang chạy bản memory, hiện banner "Dữ liệu mẫu — không phải backend thật" + nút **Reset dữ liệu**. Không có nó thì sớm muộn có người demo bản memory cho khách và tưởng là hệ thống thật.

**Nghiệm thu bước 5:** tạo/sửa/xoá dữ liệu chạy đúng, F5 vẫn còn, mở 2 tab thấy đồng bộ, nút reset seed lại từ đầu — tất cả khi **chưa** có Firebase.

---

## 6. Firebase setup

Từ đây trở đi là phần dịch vụ. Làm theo đúng thứ tự — vài bước phải làm trên Console, agent/script không làm hộ được.

### 6.1 Tạo project trên Console

1. [console.firebase.google.com](https://console.firebase.google.com) → **Add project**.
   Đặt tên có hậu tố môi trường: `my-app-dev`, `my-app-prod`. **Tạo 2 project riêng** — rules và index deploy lên dev trước, không thử trên dữ liệu thật.
2. Tắt Google Analytics nếu không dùng (bật sau được).
3. **Build → Firestore Database → Create database**:
   - **Production mode** (deny-by-default). Đừng chọn test mode: nó mở toàn bộ 30 ngày và rất dễ quên.
   - Location: chọn gần người dùng và **không đổi được về sau** (`asia-northeast1` Tokyo, `asia-southeast1` Singapore).
4. **Build → Authentication → Get started** → bật **Email/Password**. Tắt "Email link" nếu không dùng.
5. **Build → Storage** → Get started (cần Blaze ở một số vùng — xem 6.9).
6. **Project settings → General → Your apps → Web (`</>`)** → đăng ký app → copy đoạn config.

### 6.2 Biến môi trường

`.env.example` (commit) và `.env.local` (KHÔNG commit — đã có trong `.gitignore` qua `*.local`):

```bash
# Config Firebase Web KHÔNG phải secret — nó nằm trong bundle client.
# Bảo mật do Security Rules + App Check đảm nhiệm, không phải do ẩn key.
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# App Check — site key reCAPTCHA v3
VITE_RECAPTCHA_SITE_KEY=

# true → nối Emulator Suite; false → project thật
VITE_USE_EMULATOR=true
```

Điểm này quyết định cả seam ở Bước 5: **để trống là app chạy in-memory**.

### 6.3 Tách `firebase-config.ts` khỏi `firebase.ts` — đừng bỏ qua

```ts
// src/shared/lib/firebase-config.ts
// KHÔNG được import gì từ `firebase/*` trong file này.
export const firebaseConfig = {
  apiKey: import.meta.env["VITE_FIREBASE_API_KEY"],
  projectId: import.meta.env["VITE_FIREBASE_PROJECT_ID"],
  // …
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId,
);
export const useEmulator = import.meta.env["VITE_USE_EMULATOR"] === "true";
```

**Vì sao phải tách:** `AuthProvider` nằm ở app shell (không lazy được — mọi route đều cần) và cần biết "đã cấu hình Firebase chưa" để chọn adapter. Nếu nó phải import `firebase.ts` để hỏi thì cả SDK Firebase (~150–170KB gzip) bị kéo vào bundle khởi động. Đã đo: `index.html` preload luôn chunk firebase.

Cùng lý do đó, adapter auth phải **nạp động**:

```ts
// features/auth/api/index.ts
export const AUTH_ENABLED = isFirebaseConfigured;

/** Kết quả `import()` được cache nên gọi nhiều lần không tốn thêm. */
export async function loadAuthAdapter(): Promise<AuthAdapter> {
  if (!isFirebaseConfigured) return stubAuthAdapter;
  const { firebaseAuthAdapter } = await import("./firebase-auth-adapter");
  return firebaseAuthAdapter;
}
```

### 6.4 Khởi tạo SDK — lazy singleton + emulator

```ts
// src/shared/lib/firebase.ts — CHỈ file này và firebase-auth-adapter.ts được import `firebase/auth`
let app: FirebaseApp | null = null;

function ensureApp(): FirebaseApp {
  if (!isConfigured)
    throw new Error(
      "Firebase chưa cấu hình. Điền VITE_FIREBASE_* vào .env.local.",
    );
  app ??= initializeApp(firebaseConfig);
  return app;
}

export function getDb(): Firestore {
  if (!firestore) {
    firestore = getFirestore(ensureApp());
    if (useEmulator) connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
  }
  return firestore;
}
// getAuthClient() và getBucket() cùng khuôn; connectAuthEmulator dùng
// { disableWarnings: true } để console không đỏ mỗi lần reload ở dev.
```

**Không tự lưu token vào localStorage.** SDK đã quản lý phiên trong IndexedDB và tự refresh ID token; tự lưu thêm là mở đường cho XSS đọc được. Nguồn chân lý duy nhất của trạng thái đăng nhập là `onAuthStateChanged`.

### 6.5 `firebase.json` + `.firebaserc`

```json
// .firebaserc — alias để deploy không gõ sai project
{
  "projects": {
    "default": "my-app-dev",
    "dev": "my-app-dev",
    "prod": "my-app-prod"
  }
}
```

```json
// firebase.json
{
  "firestore": {
    "rules": "firebase/firestore.rules",
    "indexes": "firebase/firestore.indexes.json"
  },
  "storage": { "rules": "firebase/storage.rules" },
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }],
    "headers": [
      {
        "source": "/assets/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "/index.html",
        "headers": [{ "key": "Cache-Control", "value": "no-cache" }]
      },
      {
        "source": "/sw.js",
        "headers": [{ "key": "Cache-Control", "value": "no-cache" }]
      }
    ]
  },
  "emulators": {
    "auth": { "port": 9099 },
    "firestore": { "port": 8080 },
    "storage": { "port": 9199 },
    "hosting": { "port": 5000 },
    "ui": { "enabled": true, "port": 4000 },
    "singleProjectMode": true
  }
}
```

`rewrites: ** → /index.html` là bắt buộc cho SPA: thiếu nó thì F5 ở `/items/abc` ra 404.

Asset có hash tên file nên cache `immutable` 1 năm; `index.html` và `sw.js` **phải** `no-cache`, nếu không người dùng dính bản cũ vĩnh viễn.

### 6.6 Data model — thiết kế trước khi viết rules

```
admins/{uid}                     — quyền hệ thống, chỉ tạo tay qua Console
users/{uid}                      — profile, do chính người dùng tạo lúc đăng nhập lần đầu
projects/{pid}                   — memberIds[] (cho rules + query), itemCount, doneCount
├── members/{uid}                — role: owner|manager|member|viewer
├── columns/{cid}                — order (fractional index)
└── items/{iid}                  — projectId (cho collection-group query), columnId, order
    └── comments/{cid}
```

Ba quyết định trong sơ đồ này:

- **`memberIds[]` lặp lại trên project doc** dù đã có subcollection `members`. Cần cho rules (`array_contains` đánh giá được ở `list`) và cho query "project của tôi". Đánh đổi: phải cập nhật 2 chỗ trong cùng một batch.
- **`projectId` lặp trên item doc** để `collectionGroup('items')` lọc được theo project.
- **Counter (`itemCount`, `doneCount`, `commentCount`)** lưu sẵn trên doc cha, ghi bằng `writeBatch` + `increment()` cùng lúc với mutation. Firestore không có `COUNT(*)` rẻ cho realtime.

### 6.7 Security Rules — chỗ vỡ nhiều nhất

> **Mọi bug nghiêm trọng trong dự án gốc đều nằm ở Security Rules, và chỉ lộ ra khi chạy trên Firestore thật** — rules compile sạch, hàng trăm unit test xanh, mà bấm vào là hỏng.

**`get` và `list` là hai phép đánh giá khác nhau.** Đây là bug số 1:

```javascript
// SAI — chặn nguyên cả query danh sách
function isProjectMember(pid) {
  return request.auth.uid in get(/databases/$(database)/documents/projects/$(pid)).data.memberIds;
}

// ĐÚNG cho chính document project
function isProjectMember() {
  return signedIn() && request.auth.uid in resource.data.memberIds;
}
```

Với truy vấn `list`, Firestore phải chứng minh **mọi** document trả về đều thoả luật, và nó làm việc đó bằng cách đối chiếu ràng buộc của query với `resource`. Luật viết bằng `get()` thì không đối chiếu được → Firestore từ chối **nguyên cả truy vấn**, kể cả khi collection đang rỗng. Đổi sang `resource.data` còn rẻ hơn một nửa: bản `get()` tốn thêm 1 document read cho mỗi project chỉ để kiểm tra quyền đọc chính nó.

Với document **con** (item, column, member) thì `resource` là document con, nên buộc phải `get()` lên project cha — đó là ca dùng `get()` hợp lệ.

**Vòng luẩn quẩn lúc khởi tạo:** ngay sau khi project doc ra đời, subcollection `members` còn rỗng nên luật "phải là manager" chưa thể đúng — người vừa tạo dự án không tự thêm được chính mình, và không tạo nổi column nào. Gỡ bằng cách tin vào `ownerId` trên project doc:

```javascript
function isProjectOwner(pid) {
  return signedIn() && get(/databases/$(database)/documents/projects/$(pid)).data.ownerId == request.auth.uid;
}
```

Khung rules:

```javascript
rules_version = '2';
// Deny-by-default: mỗi collection phải khai tường minh.
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() { return request.auth != null; }

    // Khi bật Blaze thì đổi thành request.auth.token.admin == true (0 document read)
    function isAdmin() {
      return signedIn() && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    match /projects/{pid} {
      allow get: if isMember(pid) || isAdmin();
      allow list: if signedIn() && request.auth.uid in resource.data.memberIds;
      allow create: if signedIn() && request.resource.data.ownerId == request.auth.uid;
      allow update: if canManage(pid);
      allow delete: if isAdmin();

      match /items/{iid} {
        allow read: if isMember(pid);
        allow write: if canEdit(pid);
      }
    }
    // Không khai → bị từ chối. Đúng ý muốn.
  }
}
```

**Luật làm việc với rules:**

1. Mọi thay đổi rules **phải kèm test** trong `firebase/tests/firestore.rules.test.ts`.
2. Sửa rules xong **bắt buộc chạy** `npm run test:rules` (emulator) **và** `npm run test:firebase` (Firebase thật) trước khi báo xong.
3. Sau khi deploy, xác nhận rules đang chạy trên server bằng vài ca **ghi ngược luật phải bị từ chối** — deploy thành công không có nghĩa là rules mới đã hiệu lực (có độ trễ lan truyền).

### 6.8 Index

Firestore tự đòi composite index khi query cần. Cách làm đúng:

1. Chạy app, mở Console log → SDK in ra **link tạo index sẵn** cho query bị thiếu.
2. Bấm link (tạo trên Console) **hoặc** thêm vào `firebase/firestore.indexes.json` rồi `npm run rules:deploy`. Nên làm cách 2: index vào git, môi trường nào cũng giống nhau.

```json
{
  "indexes": [
    {
      "collectionGroup": "projects",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "memberIds", "arrayConfig": "CONTAINS" },
        { "fieldPath": "updatedAt", "order": "DESCENDING" }
      ]
    }
  ],
  "fieldOverrides": []
}
```

Index build mất vài phút với dữ liệu lớn; trong lúc đó query vẫn lỗi. Đừng vội kết luận rules sai.

**Cân nhắc:** với dữ liệu nhỏ (< 100 project), **filter/sort ở client** rẻ hơn nhiều so với tạo composite index cho từng tổ hợp filter. Query Firestore chỉ lấy theo `memberIds`, phần còn lại lọc trong hook. Khi quy mô lớn hơn thì đổi lại — chỉ phải sửa một hook.

### 6.9 Spark vs Blaze

| Cần gì                       | Spark (free)       | Blaze (trả theo dùng) |
| ---------------------------- | ------------------ | --------------------- |
| Firestore, Auth, Hosting     | ✅                 | ✅                    |
| Emulator Suite (local)       | ✅                 | ✅                    |
| **Cloud Storage** (vùng mới) | ❌                 | ✅                    |
| **Cloud Functions**          | ❌                 | ✅                    |
| **Custom claims** (`admin`)  | ❌ (cần Admin SDK) | ✅                    |
| Liệt kê user qua Admin SDK   | ❌                 | ✅                    |

Hệ quả thiết kế khi còn ở Spark:

- Quyền admin phải đọc từ `admins/{uid}` (tốn 1 read/lần kiểm tra) thay vì custom claim (0 read).
- Không liệt kê được tài khoản Auth từ client → danh sách người dùng phải đọc từ collection `users`, mà document đó do **chính người dùng tạo lúc đăng nhập lần đầu**. Hệ quả cần biết trước: người được cấp tài khoản nhưng **chưa đăng nhập lần nào** sẽ chưa chọn được vào dự án.
- Không có Functions → không cascade xoá subcollection. Xoá project/task ở Firestore để lại rác; cần script dọn hoặc chấp nhận và ghi rõ.

**Chốt Spark/Blaze trước khi thiết kế phần upload file và phần phân quyền** — đổi về sau là sửa cả rules, cả model, cả UI.

### 6.10 Storage rules — biết trước giới hạn

**Storage rules KHÔNG đọc được Firestore.** Nghĩa là không kiểm tra được "người này có phải thành viên dự án không". Thực tế chỉ chặn được tới mức:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // GIỚI HẠN ĐÃ BIẾT: không đọc được Firestore nên không kiểm tra được
    // thành viên dự án. Chỉ chặn tới mức "đã đăng nhập" + giới hạn dung lượng.
    match /projects/{pid}/items/{iid}/{fileId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
        && request.resource.size < 20 * 1024 * 1024;
    }
  }
}
```

Ghi giới hạn này thẳng trong file rules. Muốn chặn đúng theo thành viên thì cần Cloud Functions (Blaze) hoặc signed URL.

### 6.11 Emulator Suite

```bash
npm run emu          # import/export dữ liệu để giữa các lần chạy không mất
npm run emu:clean    # dữ liệu rỗng
# UI ở http://localhost:4000
```

`.env.local` để `VITE_USE_EMULATOR=true` là app tự nối vào emulator. Thêm `.emulator-data/` vào `.gitignore`.

### 6.12 App Check (production)

Bật khi đã có domain thật: Console → **App Check** → reCAPTCHA v3 → lấy site key vào `VITE_RECAPTCHA_SITE_KEY`. Chạy **monitor mode** vài ngày trước khi enforce, nếu không sẽ tự chặn chính app của mình.

**Nghiệm thu bước 6:** điền `.env.local` → **cùng bộ UI** đó chạy trên Firestore thật, không sửa dòng code nào. `npm run test:firebase` xanh. Ba ca ghi ngược luật bị từ chối.

---

## 7. Một feature đủ tầng

Mỗi feature có **cùng một bộ thư mục**. Đồng dạng quan trọng hơn tối ưu từng chỗ: mở feature lạ ra là biết ngay tìm cái gì ở đâu.

```
features/<tên>/
├── api/          contract + memory + firestore + index (Bước 5)
├── components/   UI của feature
├── hooks/        subscribe dữ liệu + mutation
├── lib/          logic thuần, CÓ TEST
├── store/        Zustand (filter, view mode, zoom)
├── pages/        trang gắn vào router
├── messages.ts   từ điển en/vi/ja
├── schemas.ts    zod + error class riêng của feature
└── types.ts      type của domain
```

### 7.1 Luồng dữ liệu

```
 Component ──> Hook ──────> Repository ──> Firestore | Memory store
     ↑          │                                  │
     └──────────┴── snapshot (onSnapshot / pub-sub) ┘
```

Không có tầng cache trung gian: `onSnapshot` **đã là** nguồn chân lý.

### 7.2 Bốn loại state, mỗi loại một chỗ

| Loại                    | Ở đâu                                      | Ví dụ                    |
| ----------------------- | ------------------------------------------ | ------------------------ |
| Server state (realtime) | `useState` trong hook + `subscribe*`       | danh sách item, chi tiết |
| UI state bền            | Zustand + `persist`                        | filter, view mode, zoom  |
| UI state theo URL       | query param                                | `?item=<id>` mở drawer   |
| Optimistic tạm thời     | `Map` override trong hook, xoá khi confirm | kéo thả, sửa inline      |

Đặt sai chỗ là nguồn của phần lớn bug state: filter nhét vào URL thì link chia sẻ mang theo cả bộ lọc cá nhân; drawer nhét vào Zustand thì không chia sẻ link được.

### 7.3 Hook — khuôn subscribe + optimistic

```ts
export function useItems(projectId: string) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  // Override optimistic: ghi vào Map → gọi repository → snapshot về thì XOÁ override
  const [overrides, setOverrides] = useState<Map<string, Partial<Item>>>(
    new Map(),
  );

  useEffect(() => {
    setLoading(true);
    const unsubscribe = itemsRepository.subscribeItems(projectId, (next) => {
      setItems(next);
      setLoading(false);
      setOverrides(new Map()); // ← KHÔNG dọn override là bug kinh điển:
    }); //   item bị "ghim", thay đổi của người khác bị che mất
    return unsubscribe; // trả trực tiếp hàm unsubscribe
  }, [projectId]);

  const moveItem = useCallback(
    async (item: Item, columnId: string, order: string) => {
      setOverrides((prev) => new Map(prev).set(item.id, { columnId, order }));
      try {
        await itemsRepository.moveItem(item.id, columnId, order);
      } catch (error) {
        setOverrides((prev) => {
          const next = new Map(prev);
          next.delete(item.id);
          return next;
        });
        toast.error(m.moveFailed); // rollback + báo lỗi
      }
    },
    [m],
  );

  const visible = useMemo(
    () => items.map((item) => ({ ...item, ...overrides.get(item.id) })),
    [items, overrides],
  );

  return { items: visible, loading, moveItem };
}
```

### 7.4 Thứ tự kéo-thả: fractional index, không dùng `order: number`

Với `order: number`, kéo một phần tử phải ghi lại **toàn bộ** danh sách. Với fractional index (chuỗi giữa hai chuỗi kề), một lần kéo chỉ ghi **1 document**:

```ts
import { generateKeyBetween } from "fractional-indexing";

/** Thả giữa hai phần tử → sinh key mới nằm giữa. Chỉ item bị kéo được ghi. */
export function orderBetween(
  before: string | null,
  after: string | null,
): string {
  return generateKeyBetween(before, after);
}
```

Tách vào `lib/ordering.ts` và test kỹ: đây là logic mà chỉ e2e mới chạm tới được nếu để trong event handler.

### 7.5 Ngày date-only

Lưu chuỗi `YYYY-MM-DD`, tính toán bằng UTC:

```ts
// SAI — ở múi giờ âm trả về 11
new Date("2026-08-12").getDate();

// ĐÚNG
export function fromDateOnly(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, y, m, d] = match;
  return new Date(Number(y), Number(m) - 1, Number(d)); // local midnight
}
```

### 7.6 Converter Firestore

Một converter generic cho mọi query, làm hai việc: gắn `id` từ `snapshot.id`, và đổi `Timestamp` ↔ `Date`.

```ts
fromFirestore(snapshot, options) {
  /**
   * `serverTimestamps: 'estimate'` là BẮT BUỘC, không phải tuỳ chọn cho đẹp.
   *
   * `serverTimestamp()` chỉ là sentinel; server mới điền giá trị thật. Nhưng
   * onSnapshot bắn ngay một snapshot cục bộ trước khi server trả lời, và trong
   * snapshot đó field kia đọc ra **null**. Kiểu `createdAt: Date` khi đó là nói
   * dối, và `createdAt.getTime()` lúc sort làm vỡ nguyên trang ngay sau khi
   * người dùng bấm "Tạo".
   */
  const data = timestampsToDates(snapshot.data({ ...options, serverTimestamps: 'estimate' }))
  return { ...data, id: snapshot.id } as T
}
```

Vẫn nên có lớp phòng thứ hai ở chỗ sort (`timeOf(value) = value instanceof Date ? value.getTime() : 0`): document tạo từ Console hoặc script import vẫn có thể thiếu ngày, và sai thứ tự một dòng vẫn hơn ném lỗi giữa `Array.sort` làm trắng cả trang.

### 7.7 Markdown + chống XSS

Nếu có mô tả/comment dạng markdown: **không dùng `dangerouslySetInnerHTML`**. Parser tự viết trả về **token**, rồi component render token thành React element. Đó là lớp chặn XSS, không phải chuyện thẩm mỹ.

### 7.8 Checklist thêm một feature mới

- [ ] `types.ts` — type domain
- [ ] `api/` — contract (JSDoc ràng buộc nghiệp vụ) + memory + firestore + index
- [ ] `mocks/<tên>.ts` — dữ liệu mẫu **tất định**, phủ cả ca biên (rỗng, tên rất dài, quá hạn, không người phụ trách)
- [ ] tăng `STORAGE_VERSION` nếu cấu trúc mock đổi
- [ ] `messages.ts` — en/vi/ja + **đăng ký vào `DICTIONARIES` trong `dictionaries.test.ts`**
- [ ] `lib/` — kéo logic khó ra + viết test
- [ ] `hooks/` — subscribe + mutation + optimistic
- [ ] `store/` — chỉ UI state, không đựng server state
- [ ] `pages/` + đăng ký route **lazy**
- [ ] rules cho collection mới + test rules
- [ ] index cho query mới vào `firestore.indexes.json`
- [ ] 5 lệnh sạch: typecheck · lint · format:check · test · build

---

## 8. Ba tầng test

| Tầng         | Lệnh                    | Phủ gì                                                          | Chạy được khi nào    |
| ------------ | ----------------------- | --------------------------------------------------------------- | -------------------- |
| **Unit**     | `npm test`              | toàn bộ `lib/` thuần + `mocks/` + hook logic thuần              | luôn luôn, ~1 giây   |
| **Rules**    | `npm run test:rules`    | các ca **bị từ chối** + phân quyền từng vai trò                 | cần Java + emulator  |
| **Tích hợp** | `npm run test:firebase` | đường thành công, gọi đúng repository của app sau khi đăng nhập | cần Firebase project |

Ba tầng này **không thay thế nhau**. Test tích hợp chỉ đi đường thành công; nó không phủ được ca "viewer cố sửa task thì phải bị chặn". Rules test làm việc đó, nhưng chạy trên emulator nên không bắt được khác biệt giữa emulator và server thật.

```ts
// vitest.config.ts — environment: node vì chỉ test lib thuần → cả suite ~1 giây
export default defineConfig({
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "./src") } },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    coverage: {
      provider: "v8",
      // Chỉ tính logic thuần; component UI để e2e phủ
      include: ["src/**/lib/**", "src/**/hooks/**", "src/shared/lib/**"],
    },
  },
});
```

Cần 3 config vitest riêng (`vitest.config.ts`, `vitest.rules.config.ts`, `vitest.integration.config.ts`) vì môi trường khác nhau: node thuần / emulator / project thật.

**Một test đáng viết ngay từ đầu:** khoá ràng buộc của mock data — "số lượng sinh ra phải khớp counter". Nó bắt được lệch counter ở bản memory **trước** khi lệch trên Firestore, nơi sửa lại rất khó.

**Chưa phủ, phải ghi rõ:** component React (cần React Testing Library), e2e (Playwright). Đừng để trống mà không nói.

---

## 9. Build & deploy

### 9.1 Ngân sách bundle

Đặt một con số và giữ nó. Ví dụ: **initial < 250KB gzip**. Cách giữ:

- Lazy mọi route (`lazy()` + `import()`).
- Tách chunk `firebase` và `react-vendor` (xem 1.4).
- Nạp động adapter Firebase Auth (xem 6.3).
- Đo mỗi lần build: `npm run build` in ra kích thước từng chunk.

### 9.2 Deploy Firebase Hosting

```bash
npm run build
npx firebase deploy --only hosting -P dev     # dev trước
npx firebase deploy --only hosting -P prod    # rồi mới prod
npm run rules:deploy                          # rules + indexes
```

### 9.3 Deploy GitHub Pages (nếu cần)

Pages là static host, **không có rewrite** dạng `** → /index.html`, nên cần thêm hai file:

- `404.html` y hệt `index.html` — Pages trả file đó mà **giữ nguyên URL trên address bar**, nhờ đó router vẫn khớp route (nếu không, F5 ở deep link ra trang 404 của GitHub).
- `.nojekyll` — không có nó, Jekyll bỏ qua mọi file/thư mục bắt đầu bằng `_`.

Sinh bằng Vite plugin ở hook `closeBundle`, đừng `cp` trong npm script: quên thì deep link vỡ mà build vẫn xanh — rất khó phát hiện.

```ts
function githubPagesFiles(): Plugin {
  return {
    name: "github-pages-files",
    apply: "build",
    closeBundle() {
      if (base === "/") return; // bản Firebase Hosting không đổi
      fs.copyFileSync("dist/index.html", "dist/404.html");
      fs.writeFileSync("dist/.nojekyll", "");
    },
  };
}
```

Build cho Pages: `BASE_PATH=/<repo>/ npm run build`.

### 9.4 PWA (tuỳ chọn)

Tự sinh `sw.js` bằng plugin ~40 dòng thay vì `vite-plugin-pwa`: thứ duy nhất cần từ build là **danh sách file của bản build này** (tên có hash nên không đoán trước được), lấy ra ở hook `generateBundle`. Đổi lại không thêm dependency và luật cache nằm trong code của mình, đọc được, **có test**.

Bốn điều phải đúng:

1. `sw.js` nằm ở **gốc** thư mục build — service worker chỉ điều khiển được đường dẫn ngang hàng hoặc sâu hơn chính nó.
2. `index.html` thêm vào precache **tường minh** — ở hook `generateBundle` Vite chưa chắc đã emit nó, mà thiếu vỏ app thì mở offline ra trang trắng.
3. File tĩnh trong `public/` không đi qua bundle → phải tự liệt kê.
4. **Không bao giờ cache host Firebase.** Viết luật cache thành module riêng (`shared/pwa/cache-rules.ts`) và test khoá điều này.

Service worker chỉ chạy ở bản build (`import.meta.env.PROD`); ở `npm run dev` tắt hẳn để không tranh với HMR. Thử bằng `npm run build && npm run preview` — đây là **cách duy nhất** thử PWA.

---

## 10. Tài liệu vận hành

Ba file, mỗi file trả lời một câu hỏi khác nhau. Đây là thứ giữ cho phiên làm việc sau (người mới hoặc AI agent) không phải suy lại từ code.

| File                  | Trả lời                                                | Cập nhật khi nào              |
| --------------------- | ------------------------------------------------------ | ----------------------------- |
| **AGENTS.md**         | Hệ thống là gì, luật chơi, chỗ dễ vấp                  | khi có quy ước mới / bẫy mới  |
| **ARCHITECTURE.md**   | Code nằm đâu, phụ thuộc chiều nào, dữ liệu chảy ra sao | khi đổi cấu trúc              |
| **feature-list.json** | Đặc tả, quyết định, việc gì xong/chưa, **làm gì tiếp** | **mỗi lần xong một hạng mục** |

### 10.1 `feature-list.json` — một nguồn chân lý về trạng thái

Khung tối thiểu:

```jsonc
{
  "project": "my-app",
  "updatedAt": "2026-08-20T00:00:00Z",
  "decisions": [{ "id": "D1", "issue": "…", "resolution": "…", "why": "…" }],
  "openDecisions": [{ "id": "…", "question": "…", "needsHuman": true }],
  "techChoices": [{ "area": "state", "choice": "zustand", "why": "…" }],
  "risks": [],
  "roadmap": [
    {
      "step": 0,
      "name": "Khởi tạo dự án",
      "status": "done",
      "delivered": ["…"],
      "decisions": [{ "issue": "…", "resolution": "…", "why": "…" }],
      "verified": "typecheck/lint/format sạch; build 231KB gzip",
      "notVerified": "CHƯA mở browser xem", // ← ghi thẳng
    },
  ],
  "statusLegend": {
    "pass": "kiểm chứng TỰ ĐỘNG được: unit test, hoặc typecheck+build cho phần thuần cấu hình",
    "partial": "có UI mà CHƯA mở browser xem — code chạy được ≠ đã nghiệm thu",
    "blocked": "viết xong nhưng thiếu điều kiện bên ngoài (Java, Firebase project)",
    "todo": "chưa bắt đầu",
  },
  "summary": { "total": 0, "pass": 0, "partial": 0, "blocked": 0, "todo": 0 },
  "nextUp": [
    { "id": "…", "why": "vì sao việc này trước việc kia", "needsHuman": false },
  ],
  "features": [
    {
      "id": "project-scaffold",
      "name": "Khởi tạo dự án",
      "step": "Bước 0",
      "status": "pass",
      "evidence": "npm run typecheck / lint / format:check / build sạch cả 4",
      "testedAt": "2026-08-20T07:01:00Z",
    },
  ],
}
```

Ba quy tắc làm nó có ích thay vì thành văn bản trang trí:

1. **`evidence` phải kiểm chứng lại được**: số test và tên hàm được test, lệnh đã chạy, số liệu build — hoặc câu nói thẳng _"CHƯA verify vì không mở được browser"_. Không viết "đã hoàn thành", "hoạt động tốt".
2. **`pass` chỉ khi tự động kiểm chứng được.** Mọi thứ có UI mà chưa mở browser xem là `partial`.
3. **`why` trong `decisions` là phần đáng giá nhất** — nó là lý do không suy lại được từ code, và là thứ giữ cho người sau không vô tình phá bỏ một đánh đổi đã cân nhắc kỹ.

Đếm lại `summary` bằng script chứ đừng đoán:

```bash
python3 -c "import json,collections;d=json.load(open('feature-list.json'));c=collections.Counter(f['status'] for f in d['features']);print(dict(c),len(d['features']),d['summary'])"
```

---

## Phụ lục A — Quy ước bắt buộc (dán vào AGENTS.md)

1. **Không hard-code màu.** Dùng design token. `grep -rE "bg-(red|green|blue)-[0-9]" src/` phải rỗng.
2. **Luôn `cn()`** khi component nhận `className` từ prop.
3. **Chỉ lấy user hiện tại qua `useAuth()`.** Cấm import `firebase/auth` trong feature code.
4. **Chỉ đọc/ghi dữ liệu qua repository.** Cấm import `firebase/firestore` trong component/hook.
5. **Không `dangerouslySetInnerHTML`.** Markdown đi qua parser → token → React element.
6. **Ngày date-only lưu chuỗi `YYYY-MM-DD`**, tính bằng UTC.
7. **Thứ tự dùng fractional index**, không dùng `order: number`. Một lần kéo ghi 1 document.
8. **Counter do repository giữ**, ghi bằng `writeBatch` + `increment()` cùng lúc với mutation. Đừng cộng trừ ở UI.
9. **Mọi thay đổi Security Rules phải kèm test.**
10. **Logic khó tách ra `lib/` và viết test.** Đừng để trong event handler.
11. **Không tự lưu Firebase token vào localStorage.** SDK đã quản lý (IndexedDB).
12. **`npx shadcn add` ghi đè file đã sửa tay** — ghi lại danh sách file đã sửa.
13. **`shared/` không import `features/`.**
14. **Trước khi báo xong việc:** typecheck · lint · format:check · test · build — sạch cả 5.

## Phụ lục B — Những chỗ dễ vấp

| Chỗ                          | Điều cần biết                                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Rules `get` vs `list`        | Luật viết bằng `get()` lên chính document đang liệt kê **chặn nguyên cả query**. Dùng `resource.data`.          |
| Rules lúc khởi tạo           | Subcollection `members` còn rỗng → phải tin `ownerId` trên project doc, nếu không người tạo không tự thêm được  |
| `serverTimestamp()`          | Snapshot cục bộ đầu tiên đọc ra `null` → cần `serverTimestamps: 'estimate'` trong converter                     |
| Đổi cấu trúc mock            | Phải tăng `STORAGE_VERSION`, nếu không localStorage cũ làm app vỡ (chỉ vỡ trên máy đã dùng)                     |
| Store mock import lẫn nhau   | Dễ thành import vòng — dùng registry (`registerCascade`) hoặc tách store riêng                                  |
| Click vs kéo                 | Kéo xong trình duyệt vẫn bắn `click` — dùng tay cầm kéo riêng + `distance: 5`, hoặc nuốt 1 click sau khi kéo    |
| Radix Dialog/Sheet + dnd-kit | Focus trap chọi với kéo-thả. Drawer render **ngoài** `DndContext`; `DragOverlay` render trong portal ở `<body>` |
| Ô nhập tự lưu                | Flush khi blur **và** khi unmount; ghi theo id tường minh, vì lúc flush thì `?item=` có thể đã bị xoá khỏi URL  |
| Override optimistic          | Không dọn override khi snapshot về = item bị "ghim", thay đổi của người khác bị che mất                         |
| Route chỉ có ở dev           | `lazy()` phải nằm **trong** nhánh điều kiện, nếu không Vite vẫn emit chunk vào bản production                   |
| `basename` của router        | Thiếu là deploy lên GitHub Pages mọi `navigate()` trỏ ra ngoài app                                              |
| Storage rules                | **Không đọc được Firestore** → không kiểm tra được thành viên dự án. Ghi rõ giới hạn trong file rules           |
| Sửa service worker           | Chỉ chạy ở bản build. Thử bằng `npm run build && npm run preview`. **Không bao giờ cache host Firebase**        |
| Xoá doc có subcollection     | Firestore **không cascade** — cần script/Function dọn, hoặc chấp nhận rác và ghi rõ                             |
| Thiếu Java                   | Emulator không khởi động → mọi rules test viết ra không chạy được ca nào. Cài ở Bước 0                          |

## Phụ lục C — Thứ tự khuyến nghị (và vì sao)

```
0  Khởi tạo + tooling          ┐
1  Design token + shadcn       ├ nền tảng — sai ở đây thì sửa về sau rất đắt
2  App shell + i18n            ┘
3  Repository seam + mock       ← LÀM TRƯỚC Firebase: UI hoàn thiện mà không bị chặn bởi backend
4  Feature chính #1 (UI đầy đủ trên mock)
5  Firebase: project + rules + index + auth thật
6  Feature chính #2, #3…        ← từ đây mỗi feature chạy trên cả 2 implementation
7  Test rules + tích hợp
8  PWA + deploy
9  e2e (Playwright)             ← cuối cùng: e2e viết sớm thì sửa UI là sửa test
```

**Vì sao seam trước Firebase:** nó cho phép làm xong toàn bộ UI mà chưa cần quyết định Spark/Blaze, chưa cần chờ ai tạo project, chưa cần Java. Đổi lại phải viết bản memory tử tế — nhưng bản memory đó về sau chính là môi trường dev nhanh nhất và là chỗ bắt lệch counter sớm nhất.

**Vì sao đừng làm auth thật đầu tiên:** auth thật kéo theo SDK vào bundle khởi động, kéo theo quyết định về phân quyền, và chặn mọi màn hình phía sau nó. Stub adapter + `AUTH_ENABLED = false` cho pass-through là đủ để làm mọi thứ khác.
