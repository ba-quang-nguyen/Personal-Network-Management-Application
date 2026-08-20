/**
 * Config Firebase Web KHÔNG phải secret — nó nằm trong bundle client.
 * Bảo mật do Security Rules + App Check đảm nhiệm.
 *
 * KHÔNG được import gì từ `firebase/*` trong file này — AuthProvider ở app shell
 * cần biết "đã cấu hình Firebase chưa" mà không kéo cả SDK vào bundle khởi động.
 */
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY ?? ''
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? ''
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID ?? ''
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? ''
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? ''
const appId = import.meta.env.VITE_FIREBASE_APP_ID ?? ''

export const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
}

/** `.env.local` trống → app chạy in-memory (repository seam). */
export const isFirebaseConfigured = Boolean(apiKey && projectId)

export const useEmulator = import.meta.env.VITE_USE_EMULATOR === 'true'
