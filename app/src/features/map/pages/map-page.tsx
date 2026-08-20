import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

import { Badge } from '@/shared/components/ui/badge'
import { cn } from '@/shared/lib/utils'
import { useMessages } from '@/shared/i18n'
import { usePeople } from '@/features/people/hooks/use-people'

import { LENSES, groupPeople, type LensKey } from '../lib/grouping'
import { MAP_MESSAGES } from '../messages'

export function MapPage() {
  const m = useMessages(MAP_MESSAGES)
  const navigate = useNavigate()
  const { people } = usePeople()

  const [lens, setLens] = useState<LensKey>('location')
  const groups = useMemo(() => groupPeople(people, lens), [people, lens])

  const lensLabel = (k: LensKey) => m[`lens_${k}`]

  return (
    <div className="px-10 py-8">
      <div className="mb-6">
        <div className="text-xs font-medium tracking-wider text-ink-3 uppercase">
          {m.map_kicker}
        </div>
        <h1 className="text-2xl font-semibold">{m.map_title}</h1>
        <p className="mt-1 text-sm text-ink-2">{m.map_sub}</p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {LENSES.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setLens(k)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm',
              lens === k
                ? 'border-transparent bg-primary text-primary-foreground'
                : 'text-ink-2 hover:bg-accent hover:text-accent-foreground',
            )}
          >
            {lensLabel(k)}
          </button>
        ))}
      </div>

      {groups.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center text-sm text-ink-3">
          {m.map_empty}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {groups.map((group) => (
            <div key={group.key} className="rounded-xl border bg-card p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm font-semibold">{group.key}</span>
                <Badge variant="secondary">{group.members.length}</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.members.map((person) => (
                  <button
                    key={person.id}
                    type="button"
                    className="rounded-full border bg-background px-3 py-1 text-sm text-ink-2 hover:bg-accent hover:text-accent-foreground"
                    onClick={() => navigate(`/people/${person.id}`)}
                  >
                    {person.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
