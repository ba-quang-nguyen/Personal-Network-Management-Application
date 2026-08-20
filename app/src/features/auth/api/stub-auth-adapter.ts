import type { AuthAdapter, AuthUser } from './auth-adapter'

/** Chạy khi chưa bật Firebase — pass-through (không đăng nhập). */
const STUB_USER: AuthUser = { uid: 'local-user', email: null, displayName: 'You' }

export const stubAuthAdapter: AuthAdapter = {
  subscribeUser(onChange) {
    onChange(STUB_USER)
    return () => {}
  },
  async signIn() {
    return STUB_USER
  },
  async signOut() {},
  async sendPasswordReset() {},
  async getCurrentUser() {
    return STUB_USER
  },
}
