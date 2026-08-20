import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Search } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { useMessages } from '@/shared/i18n'
import { usePeople } from '@/features/people/hooks/use-people'

import { searchPeople } from '../lib/search'
import { ASK_MESSAGES } from '../messages'

const QUICK_QUESTIONS = [
  'Who is interested in robotics?',
  'Who lives in Yokohama?',
  'Who did I meet at EDIX?',
] as const

const DEFAULT_QUESTION = QUICK_QUESTIONS[0]

export function AskPage() {
  const m = useMessages(ASK_MESSAGES)
  const navigate = useNavigate()
  const { people } = usePeople()

  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState('')

  const results = useMemo(() => searchPeople(people, submitted), [people, submitted])

  function run(q: string) {
    setSubmitted(q)
  }

  return (
    <div className="px-10 py-8">
      <div className="mb-6">
        <div className="text-xs font-medium tracking-wider text-ink-3 uppercase">
          {m.ask_kicker}
        </div>
        <h1 className="text-2xl font-semibold">{m.ask_title}</h1>
        <p className="mt-1 text-sm text-ink-2">{m.ask_sub}</p>
      </div>

      <div className="mb-3 flex max-w-xl gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-3" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && run(query || DEFAULT_QUESTION)}
            placeholder={m.ask_ph}
            className="pl-9"
          />
        </div>
        <Button onClick={() => run(query || DEFAULT_QUESTION)}>{m.ask_btn}</Button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="text-xs text-ink-3">{m.ask_quick}:</span>
        {QUICK_QUESTIONS.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => {
              setQuery(q)
              run(q)
            }}
            className="rounded-full border px-3 py-1 text-xs text-ink-2 hover:bg-accent hover:text-accent-foreground"
          >
            {q}
          </button>
        ))}
      </div>

      {submitted && (
        <div className="mb-2 text-xs text-ink-3">
          {m.ask_results.replace('{count}', String(results.length))}
        </div>
      )}

      {submitted && results.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center text-sm text-ink-3">
          {m.ask_empty}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {results.map((person) => (
            <button
              key={person.id}
              type="button"
              className="flex items-center gap-3 rounded-xl border bg-card p-3 text-left"
              onClick={() => navigate(`/people/${person.id}`)}
            >
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{person.name}</div>
                <div className="truncate text-xs text-ink-2">
                  {[person.role, person.company, person.currentCity].filter(Boolean).join(' · ') ||
                    '—'}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
