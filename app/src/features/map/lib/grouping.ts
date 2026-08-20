import type { Person } from '../../people/types'

export type LensKey = 'location' | 'industry' | 'company' | 'relationship'

export const LENSES: LensKey[] = ['location', 'industry', 'company', 'relationship']

export function groupKey(person: Person, lens: LensKey): string {
  switch (lens) {
    case 'location':
      return person.currentCity || person.country || 'Unknown'
    case 'industry':
      return person.industry || 'Unknown'
    case 'company':
      return person.company || 'Unknown'
    case 'relationship':
      return person.relationshipType || person.role || 'Unknown'
  }
}

/** Nhóm người theo lens. Trả về danh sách nhóm, sắp theo số thành viên giảm dần. */
export function groupPeople(people: Person[], lens: LensKey): { key: string; members: Person[] }[] {
  const map = new Map<string, Person[]>()
  for (const person of people) {
    if (person.active === false) continue
    const key = groupKey(person, lens)
    const members = map.get(key) ?? []
    members.push(person)
    map.set(key, members)
  }
  return [...map.entries()]
    .map(([key, members]) => ({ key, members }))
    .sort((a, b) => b.members.length - a.members.length)
}
