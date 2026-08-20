import { Suspense } from 'react'

import { Toaster } from '@/shared/components/ui/sonner'
import { TooltipProvider } from '@/shared/components/ui/tooltip'
import { useTheme, ThemeProvider } from '@/shared/hooks/use-theme'
import { LocaleProvider } from '@/shared/i18n'
import { AuthProvider } from '@/features/auth/auth-provider'

import { Splash } from './components/splash'

function ThemedToaster() {
  const { theme } = useTheme()
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      theme={theme === 'system' ? undefined : theme}
    />
  )
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider delayDuration={300}>
            <Suspense fallback={<Splash />}>{children}</Suspense>
            <ThemedToaster />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </LocaleProvider>
  )
}
