import { describe, expect, it } from 'vitest'

import type { Person } from '../../people/types'
import { groupKey, groupPeople } from './grouping'

const people: Person[] = [
  {
    id: '1',
    name: 'A',
    initials: 'A',
    currentCity: 'Yokohama',
    company: 'ABC',
    industry: 'Logistics',
    relationshipType: 'Key contact',
  },
  {
    id: '2',
    name: 'B',
    initials: 'B',
    currentCity: 'Tokyo',
    company: 'Nihon',
    industry: 'Tech',
    relationshipType: 'Collaborator',
  },
  {
    id: '3',
    name: 'C',
    initials: 'C',
    currentCity: 'Tokyo',
    company: 'ABC',
    industry: 'Logistics',
    relationshipType: 'Client',
  },
  {
    id: '4',
    name: 'D',
    initials: 'D',
    currentCity: 'Osaka',
    company: 'XYZ',
    industry: 'Retail',
    active: false,
  },
]

describe('groupKey', () => {
  it('maps location', () => {
    expect(groupKey(people[0]!, 'location')).toBe('Yokohama')
  })
  it('falls back to Unknown', () => {
    expect(groupKey({ id: 'x', name: 'X', initials: 'X' }, 'industry')).toBe('Unknown')
  })
})

describe('groupPeople', () => {
  it('groups by company and sorts by size', () => {
    const groups = groupPeople(people, 'company')
    expect(groups[0]?.key).toBe('ABC')
    expect(groups[0]?.members).toHaveLength(2)
  })
  it('skips inactive people', () => {
    const groups = groupPeople(people, 'location')
    const all = groups.flatMap((g) => g.members)
    expect(all).toHaveLength(3)
  })
})
