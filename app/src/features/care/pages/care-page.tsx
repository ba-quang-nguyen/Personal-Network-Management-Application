import { useMemo } from 'react'
import { useNavigate } from 'react-router'

import { Badge } from '@/shared/components/ui/badge'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { useMessages } from '@/shared/i18n'
import { usePeople } from '@/features/people/hooks/use-people'
import type { Person } from '@/features/people/types'

import { computeCareItems, type CareReason, type CareUrgency } from '../lib/care'
import { CARE_MESSAGES } from '../messages'

type CareMessages = (typeof CARE_MESSAGES)['en']

const URGENCY_VARIANT: Record<CareUrgency, 'warn' | 'ok' | 'outline'> = {
  high: 'warn',
  medium: 'ok',
  low: 'outline',
}

function detailFor(
  m: CareMessages,
  reason: CareReason,
  days: number | undefined,
  followUp: Person['followUp'],
): string {
  if (reason === 'birthday' && days != null) return m.birthday_in.replace('{days}', String(days))
  if (reason === 'silence' && days != null) return m.silence_days.replace('{days}', String(days))
  return followUp?.what ?? ''
}

export function CarePage() {
  const m = useMessages(CARE_MESSAGES)
  const navigate = useNavigate()
  const { people, loading } = usePeople()

  const items = useMemo(() => computeCareItems(people), [people])
  const byId = useMemo(() => new Map(people.map((p) => [p.id, p])), [people])

  return (
    <div className="px-10 py-8">
      <div className="mb-6">
        <div className="text-xs font-medium tracking-wider text-ink-3 uppercase">
          {m.care_kicker}
        </div>
        <h1 className="text-2xl font-semibold">{m.care_title}</h1>
        <p className="mt-1 text-sm text-ink-2">{m.care_sub}</p>
      </div>

      {loading ? (
        <div className="flex flex-col gap-2">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed p-10 text-center">
          <div className="text-sm font-medium">{m.care_empty}</div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item) => {
            const person = byId.get(item.personId)
            if (!person) return null
            const reasonKey = `reason_${item.reason}` as const
            const urgencyKey = `urgency_${item.urgency}` as const
            return (
              <button
                key={`${item.personId}-${item.reason}`}
                type="button"
                className="flex items-center gap-3 rounded-xl border bg-card p-3 text-left"
                onClick={() => navigate(`/people/${person.id}`)}
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{person.name}</div>
                  <div className="truncate text-xs text-ink-2">
                    {m[reasonKey]} · {detailFor(m, item.reason, item.days, item.followUp)}
                  </div>
                </div>
                <Badge variant={URGENCY_VARIANT[item.urgency]}>{m[urgencyKey]}</Badge>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
