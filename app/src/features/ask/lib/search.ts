import type { Person } from '../../people/types'

/** Tìm kiếm có cấu trúc trên dữ liệu người. Logic thuần — dễ test. */
export function searchPeople(people: Person[], query: string): Person[] {
  const q = query.trim().toLowerCase()
  if (!q) return people

  const terms = q.split(/\s+/).filter(Boolean)

  const scored = people
    .map((person) => {
      const haystack = [
        person.name,
        person.nameJa,
        person.nickname,
        person.company,
        person.title,
        person.role,
        person.relationshipType,
        person.industry,
        person.profession,
        person.currentCity,
        person.area,
        person.country,
        person.nationality,
        person.email,
        person.introducedBy,
        person.about,
        ...(person.tags ?? []),
        ...(person.interests ?? []),
        ...(person.circles ?? []),
        ...(person.expertise ?? []),
        ...(person.skills ?? []),
        ...(person.businessTopics ?? []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      let score = 0
      const nameLower = person.name.toLowerCase()
      const companyLower = (person.company ?? '').toLowerCase()
      for (const term of terms) {
        if (nameLower.includes(term)) score += 5
        if (companyLower.includes(term)) score += 3
        if (haystack.includes(term)) score += 1
      }
      return { person, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.map((x) => x.person)
}
