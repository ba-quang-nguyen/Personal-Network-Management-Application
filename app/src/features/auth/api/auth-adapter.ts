export type AuthUser = {
  uid: string
  email: string | null
  displayName: string | null
}

/**
 * Adapter auth — stub (không Firebase) hoặc Firebase. UI chỉ gọi qua contract này.
 */
export type AuthAdapter = {
  /** Trả hàm unsubscribe; gọi onChange với user hiện tại rồi mỗi lần đổi. */
  subscribeUser: (onChange: (user: AuthUser | null) => void) => () => void
  signIn: (email: string, password: string) => Promise<AuthUser>
  signOut: () => Promise<void>
  sendPasswordReset: (email: string) => Promise<void>
  getCurrentUser: () => Promise<AuthUser | null>
}
