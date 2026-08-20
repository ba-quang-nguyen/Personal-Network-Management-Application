import { Navigate, useLocation } from 'react-router'

import { AUTH_ENABLED } from '@/features/auth/api'
import { useAuth } from '@/features/auth/auth-provider'

import { Splash } from './components/splash'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <Splash /> // chưa biết → chưa redirect
  if (!AUTH_ENABLED) return <>{children}</> // auth chưa bật (stub) → pass-through
  if (!user) {
    // Giữ trang đang muốn vào để quay lại sau khi đăng nhập.
    return (
      <Navigate to="/login" state={{ returnUrl: location.pathname + location.search }} replace />
    )
  }
  return <>{children}</>
}

export function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return <Splash />
  if (!AUTH_ENABLED || !user) return <>{children}</>
  return <Navigate to="/" replace />
}
