/**
 * Khởi tạo SDK — lazy singleton + emulator.
 * CHỈ file này (và firestore-*.ts / firebase-auth-adapter.ts) được import `firebase/*`.
 */
import { initializeApp, type FirebaseApp } from 'firebase/app'
import { connectFirestoreEmulator, getFirestore, type Firestore } from 'firebase/firestore'
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth'
import { connectStorageEmulator, getStorage, type FirebaseStorage } from 'firebase/storage'

import { firebaseConfig, isFirebaseConfigured, useEmulator } from './firebase-config'

let app: FirebaseApp | null = null
let firestore: Firestore | null = null
let auth: Auth | null = null
let storage: FirebaseStorage | null = null

function ensureApp(): FirebaseApp {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase chưa cấu hình. Điền VITE_FIREBASE_* vào .env.local.')
  }
  if (!app) app = initializeApp(firebaseConfig)
  return app
}

export function getDb(): Firestore {
  if (!firestore) {
    firestore = getFirestore(ensureApp())
    if (useEmulator) connectFirestoreEmulator(firestore, '127.0.0.1', 8080)
  }
  return firestore
}

export function getAuthClient(): Auth {
  if (!auth) {
    auth = getAuth(ensureApp())
    if (useEmulator) {
      connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
    }
  }
  return auth
}

export function getBucket(): FirebaseStorage {
  if (!storage) {
    storage = getStorage(ensureApp())
    if (useEmulator) connectStorageEmulator(storage, '127.0.0.1', 9199)
  }
  return storage
}
