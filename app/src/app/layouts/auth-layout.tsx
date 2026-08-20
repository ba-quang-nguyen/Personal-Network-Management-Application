import { Outlet } from 'react-router'

import { useMessages } from '@/shared/i18n'

import { APP_MESSAGES } from '@/app/messages'

export function AuthLayout() {
  const m = useMessages(APP_MESSAGES)

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground">
            NM
          </div>
          <div>
            <h1 className="text-lg font-semibold">{m.app_name}</h1>
            <p className="text-sm text-ink-3">{m.tagline}</p>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
