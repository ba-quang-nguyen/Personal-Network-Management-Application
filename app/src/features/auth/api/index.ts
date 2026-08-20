import { isFirebaseConfigured } from '@/shared/lib/firebase-config'

import type { AuthAdapter } from './auth-adapter'
import { stubAuthAdapter } from './stub-auth-adapter'

/** Auth chưa bật (đang dùng stub) → route guard pass-through. */
export const AUTH_ENABLED = isFirebaseConfigured

/** Kết quả `import()` được cache nên gọi nhiều lần không tốn thêm. */
let cached: AuthAdapter | null = null

export async function loadAuthAdapter(): Promise<AuthAdapter> {
  if (!AUTH_ENABLED) return stubAuthAdapter
  if (!cached) {
    const { firebaseAuthAdapter } = await import('./firebase-auth-adapter')
    cached = firebaseAuthAdapter
  }
  return cached
}

export type { AuthAdapter, AuthUser } from './auth-adapter'
