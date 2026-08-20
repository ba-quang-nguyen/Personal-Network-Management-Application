/* ============================================================
   Firebase config — COPY file này thành js/firebase-config.js rồi điền giá trị.
   Config web KHÔNG phải secret (nằm trong bundle client) — bảo mật do
   Security Rules (app/firebase/firestore.rules, đã test) đảm nhiệm.
   Để trống → app chạy local-only (localStorage), không cần Firebase.
   ============================================================ */
const FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};
