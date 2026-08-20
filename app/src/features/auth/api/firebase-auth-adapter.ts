import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  type User,
} from 'firebase/auth'

import { getAuthClient } from '@/shared/lib/firebase'

import type { AuthAdapter, AuthUser } from './auth-adapter'

function toUser(user: User | null): AuthUser | null {
  if (!user) return null
  return { uid: user.uid, email: user.email, displayName: user.displayName }
}

export const firebaseAuthAdapter: AuthAdapter = {
  subscribeUser(onChange) {
    return onAuthStateChanged(getAuthClient(), (user) => onChange(toUser(user)))
  },
  async signIn(email, password) {
    const cred = await signInWithEmailAndPassword(getAuthClient(), email, password)
    const user = toUser(cred.user)
    if (!user) throw new Error('Sign-in failed')
    return user
  },
  async signOut() {
    await fbSignOut(getAuthClient())
  },
  async sendPasswordReset(email) {
    await sendPasswordResetEmail(getAuthClient(), email)
  },
  async getCurrentUser() {
    return toUser(getAuthClient().currentUser)
  },
}
