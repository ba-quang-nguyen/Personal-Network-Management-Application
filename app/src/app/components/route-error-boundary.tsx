import { isRouteErrorResponse, useRouteError, useNavigate } from 'react-router'

import { Button } from '@/shared/components/ui/button'
import { useMessages } from '@/shared/i18n'
import { APP_MESSAGES } from '@/app/messages'

export function RouteErrorBoundary() {
  const error = useRouteError()
  const navigate = useNavigate()
  const m = useMessages(APP_MESSAGES)

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : String(error)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="text-sm font-semibold text-ink-3">{m.route_error}</div>
      <p className="max-w-md text-sm break-words text-ink-2">{message}</p>
      <Button onClick={() => navigate('/')}>{m.route_back_home}</Button>
    </div>
  )
}
