import { daysUntilBirthday } from '@/shared/lib/dates'

import type { FollowUp, Person } from '../../people/types'

export type CareReason = 'birthday' | 'promise' | 'follow_up' | 'silence'
export type CareUrgency = 'high' | 'medium' | 'low'

export type CareItem = {
  personId: string
  reason: CareReason
  urgency: CareUrgency
  /** days since contact (silence) hoặc days until birthday (birthday). */
  days?: number
  followUp?: FollowUp
}

const FREQUENCY_DAYS: Record<string, number> = {
  monthly: 30,
  '2months': 60,
  quarterly: 90,
  biannual: 180,
  yearly: 365,
}

/** Ngưỡng im lặng theo nhịp liên lạc; mặc định 60 ngày. */
export function silenceThreshold(frequency?: string): number {
  return FREQUENCY_DAYS[frequency ?? ''] ?? 60
}

const URGENCY_ORDER: Record<CareUrgency, number> = { high: 0, medium: 1, low: 2 }

/** Tính care queue từ danh sách người. Logic thuần — không phụ thuộc React. */
export function computeCareItems(people: Person[], today: Date = new Date()): CareItem[] {
  const items: CareItem[] = []

  for (const person of people) {
    if (person.active === false) continue

    if (person.birthday) {
      const days = daysUntilBirthday(person.birthday, today)
      if (days <= 14) {
        items.push({
          personId: person.id,
          reason: 'birthday',
          urgency: days <= 3 ? 'high' : 'medium',
          days,
        })
      }
    }

    if (person.lastContactDays != null) {
      const threshold = silenceThreshold(person.frequency)
      if (person.lastContactDays > threshold) {
        items.push({
          personId: person.id,
          reason: 'silence',
          urgency: person.lastContactDays > threshold * 2 ? 'high' : 'medium',
          days: person.lastContactDays,
        })
      }
    }

    if (person.followUp) {
      const isOpenAction = person.followUp.kind === 'action' || person.followUp.when === 'Open'
      items.push({
        personId: person.id,
        reason: isOpenAction ? 'promise' : 'follow_up',
        urgency: isOpenAction ? 'high' : 'low',
        followUp: person.followUp,
      })
    }
  }

  return items.sort((a, b) => URGENCY_ORDER[a.urgency] - URGENCY_ORDER[b.urgency])
}
