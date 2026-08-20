import { useMemo } from 'react'
import { useNavigate } from 'react-router'

import { Badge } from '@/shared/components/ui/badge'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { useMessages } from '@/shared/i18n'
import { usePeople } from '@/features/people/hooks/use-people'
import type { Person } from '@/features/people/types'
import { computeCareItems } from '@/features/care/lib/care'

import { HOME_MESSAGES } from '../messages'

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return (parts[0]?.[0] ?? '?').toUpperCase()
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase()
}

function Avatar({ person }: { person: Person }) {
  return (
    <div
      className="flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
      style={{ background: person.color ?? '#8D867C' }}
    >
      {initialsOf(person.name)}
    </div>
  )
}

export function HomePage() {
  const m = useMessages(HOME_MESSAGES)
  const navigate = useNavigate()
  const { people, loading } = usePeople()

  const active = useMemo(() => people.filter((p) => p.active !== false), [people])
  const care = useMemo(() => computeCareItems(active).slice(0, 4), [active])
  const byId = useMemo(() => new Map(people.map((p) => [p.id, p])), [people])

  const recent = useMemo(
    () =>
      [...active]
        .filter((p) => p.lastContactDays != null)
        .sort((a, b) => (a.lastContactDays ?? 0) - (b.lastContactDays ?? 0))
        .slice(0, 5),
    [active],
  )

  const upcoming = useMemo(
    () =>
      active
        .filter((p) => p.followUp && p.followUp.when !== 'Open' && p.followUp.kind !== 'action')
        .slice(0, 5),
    [active],
  )

  if (loading) {
    return (
      <div className="flex flex-col gap-3 px-10 py-8">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    )
  }

  return (
    <div className="px-10 py-8">
      <div className="mb-6">
        <div className="text-xs font-medium tracking-wider text-ink-3 uppercase">
          {m.home_kicker}
        </div>
        <h1 className="text-2xl font-semibold">{m.home_title}</h1>
        <p className="mt-1 text-sm text-ink-2">{m.home_sub}</p>
      </div>

      {active.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center text-sm text-ink-3">
          {m.home_no_people}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <section>
            <h2 className="mb-2 text-sm font-semibold text-ink-2">{m.home_care}</h2>
            {care.length === 0 ? (
              <p className="text-sm text-ink-3">{m.home_empty_care}</p>
            ) : (
              <div className="flex flex-col gap-2">
                {care.map((item) => {
                  const person = byId.get(item.personId)
                  if (!person) return null
                  return (
                    <button
                      key={`${item.personId}-${item.reason}`}
                      type="button"
                      className="flex items-center gap-3 rounded-xl border bg-card p-3 text-left"
                      onClick={() => navigate(`/people/${person.id}`)}
                    >
                      <Avatar person={person} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold">{person.name}</div>
                        <div className="truncate text-xs text-ink-2">
                          {item.followUp?.what ?? item.reason}
                        </div>
                      </div>
                      <Badge variant={item.urgency === 'high' ? 'warn' : 'ok'}>{item.reason}</Badge>
                    </button>
                  )
                })}
              </div>
            )}
          </section>

          {upcoming.length > 0 && (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-ink-2">{m.home_upcoming}</h2>
              <div className="flex flex-col gap-2">
                {upcoming.map((person) => (
                  <button
                    key={person.id}
                    type="button"
                    className="flex items-center gap-3 rounded-xl border bg-card p-3 text-left"
                    onClick={() => navigate(`/people/${person.id}`)}
                  >
                    <Avatar person={person} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold">{person.name}</div>
                      <div className="truncate text-xs text-ink-2">{person.followUp?.what}</div>
                    </div>
                    <span className="text-xs text-ink-3">{person.followUp?.when}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {recent.length > 0 && (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-ink-2">{m.home_recent}</h2>
              <div className="flex flex-wrap gap-2">
                {recent.map((person) => (
                  <button
                    key={person.id}
                    type="button"
                    className="flex items-center gap-2 rounded-full border bg-card py-1 pr-3 pl-1 text-sm"
                    onClick={() => navigate(`/people/${person.id}`)}
                  >
                    <Avatar person={person} />
                    <span className="truncate">{person.name}</span>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
