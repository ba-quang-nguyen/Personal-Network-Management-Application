import { describe, expect, it } from 'vitest'

import type { Person } from '../../people/types'
import { computeCareItems, silenceThreshold } from './care'

const base: Person = { id: 'p1', name: 'Test Person', initials: 'TP' }

describe('silenceThreshold', () => {
  it('maps frequency to days', () => {
    expect(silenceThreshold('monthly')).toBe(30)
    expect(silenceThreshold('quarterly')).toBe(90)
  })

  it('defaults to 60 for unknown/undefined frequency', () => {
    expect(silenceThreshold(undefined)).toBe(60)
    expect(silenceThreshold('custom')).toBe(60)
  })
})

describe('computeCareItems', () => {
  const today = new Date(2026, 9, 8) // Oct 8, 2026

  it('flags a birthday within 14 days', () => {
    const person: Person = { ...base, birthday: 'Oct 11' }
    const items = computeCareItems([person], today)
    expect(items.some((i) => i.reason === 'birthday')).toBe(true)
  })

  it('flags silence past the frequency threshold', () => {
    const person: Person = { ...base, frequency: 'monthly', lastContactDays: 45 }
    const items = computeCareItems([person], today)
    expect(items.some((i) => i.reason === 'silence')).toBe(true)
  })

  it('flags an open promise', () => {
    const person: Person = {
      ...base,
      followUp: { id: 'f1', when: 'Open', what: 'Introduce someone', kind: 'action' },
    }
    const items = computeCareItems([person], today)
    expect(items.some((i) => i.reason === 'promise')).toBe(true)
  })

  it('skips inactive people', () => {
    const person: Person = { ...base, active: false, birthday: 'Oct 11' }
    expect(computeCareItems([person], today)).toHaveLength(0)
  })

  it('sorts high urgency before low', () => {
    const urgent: Person = {
      ...base,
      followUp: { id: 'f1', when: 'Open', what: 'x', kind: 'action' },
    }
    const mild: Person = { ...base, id: 'p2', name: 'Two', initials: 'T', birthday: 'Oct 20' }
    const items = computeCareItems([mild, urgent], today)
    expect(items[0]?.urgency).toBe('high')
  })
})
