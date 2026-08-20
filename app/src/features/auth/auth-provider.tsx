import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

import { loadAuthAdapter } from './api'
import type { AuthAdapter, AuthUser } from './api'

type AuthContextValue = {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  sendPasswordReset: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const adapterRef = useRef<AuthAdapter | null>(null)

  useEffect(() => {
    let unsub: (() => void) | undefined
    let cancelled = false

    loadAuthAdapter().then((adapter) => {
      if (cancelled) return
      adapterRef.current = adapter
      unsub = adapter.subscribeUser((next) => {
        setUser(next)
        setLoading(false)
      })
    })

    return () => {
      cancelled = true
      unsub?.()
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    const adapter = adapterRef.current ?? (await loadAuthAdapter())
    await adapter.signIn(email, password)
  }, [])

  const signOut = useCallback(async () => {
    const adapter = adapterRef.current ?? (await loadAuthAdapter())
    await adapter.signOut()
  }, [])

  const sendPasswordReset = useCallback(async (email: string) => {
    const adapter = adapterRef.current ?? (await loadAuthAdapter())
    await adapter.sendPasswordReset(email)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, sendPasswordReset }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
