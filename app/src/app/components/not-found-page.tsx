import { useNavigate } from 'react-router'

import { Button } from '@/shared/components/ui/button'
import { useMessages } from '@/shared/i18n'
import { APP_MESSAGES } from '@/app/messages'

export function NotFoundPage() {
  const navigate = useNavigate()
  const m = useMessages(APP_MESSAGES)

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <div className="text-4xl font-bold text-ink-3">404</div>
      <p className="text-sm text-ink-2">{m.route_not_found}</p>
      <Button onClick={() => navigate('/')}>{m.route_back_home}</Button>
    </div>
  )
}
