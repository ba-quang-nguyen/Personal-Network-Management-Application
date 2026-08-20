import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'sonner'

import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { useMessages } from '@/shared/i18n'
import { useAuth } from '@/features/auth/auth-provider'
import { APP_MESSAGES } from '@/app/messages'

export function LoginPage() {
  const m = useMessages(APP_MESSAGES)
  const { signIn, sendPasswordReset } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const returnUrl = (location.state as { returnUrl?: string } | null)?.returnUrl ?? '/'

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      await signIn(email, password)
      navigate(returnUrl, { replace: true })
    } catch {
      setError(m.auth_invalid)
    } finally {
      setBusy(false)
    }
  }

  async function onForgot() {
    if (!email.trim()) {
      toast.error(m.auth_email)
      return
    }
    try {
      await sendPasswordReset(email)
      toast.success(m.auth_reset_sent)
    } catch {
      setError(m.auth_invalid)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="mb-1 text-center">
        <h2 className="text-lg font-semibold">{m.auth_login_title}</h2>
        <p className="text-sm text-ink-3">{m.auth_login_sub}</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">{m.auth_email}</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">{m.auth_password}</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" disabled={busy}>
        {busy ? m.common_loading : m.auth_sign_in}
      </Button>
      <Button type="button" variant="link" onClick={() => void onForgot()}>
        {m.auth_forgot}
      </Button>
    </form>
  )
}
