import { describe, expect, it } from 'vitest'

import type { Person } from '../../people/types'
import { searchPeople } from './search'

const people: Person[] = [
  {
    id: '1',
    name: 'Tanaka Hiroshi',
    initials: 'TH',
    company: 'ABC Logistics',
    currentCity: 'Yokohama',
    tags: ['robotics'],
  },
  {
    id: '2',
    name: 'Suzuki Keiko',
    initials: 'SK',
    company: 'Nihon AI',
    currentCity: 'Tokyo',
    interests: ['AI'],
  },
]

describe('searchPeople', () => {
  it('matches name with highest priority', () => {
    expect(searchPeople(people, 'tanaka')[0]?.id).toBe('1')
  })

  it('matches city', () => {
    expect(searchPeople(people, 'yokohama')[0]?.id).toBe('1')
  })

  it('matches a tag', () => {
    expect(searchPeople(people, 'robotics')[0]?.id).toBe('1')
  })

  it('matches company', () => {
    expect(searchPeople(people, 'nihon')[0]?.id).toBe('2')
  })

  it('returns all on empty query', () => {
    expect(searchPeople(people, '')).toHaveLength(2)
  })

  it('returns empty for no match', () => {
    expect(searchPeople(people, 'zzzz')).toHaveLength(0)
  })
})
