import { describe, expect, it } from 'vitest'

import { daysUntilBirthday, parseMonthDay } from './dates'

describe('parseMonthDay', () => {
  it("parses 'Nov 22'", () => {
    expect(parseMonthDay('Nov 22')).toEqual({ month: 11, day: 22 })
  })

  it("parses 'Oct 11 (in 3 days)'", () => {
    expect(parseMonthDay('Oct 11 (in 3 days)')).toEqual({ month: 10, day: 11 })
  })

  it('returns null for invalid input', () => {
    expect(parseMonthDay('')).toBeNull()
    expect(parseMonthDay('Hello')).toBeNull()
    expect(parseMonthDay('Jan 40')).toBeNull() // day > 31
  })
})

describe('daysUntilBirthday', () => {
  it('computes days until the next birthday', () => {
    const today = new Date(2026, 9, 8) // Oct 8, 2026
    expect(daysUntilBirthday('Oct 11', today)).toBe(3)
    expect(daysUntilBirthday('Nov 22', today)).toBe(45)
  })

  it('rolls to next year if the date has passed', () => {
    const today = new Date(2026, 10, 1) // Nov 1, 2026
    const days = daysUntilBirthday('Oct 11', today)
    expect(days).toBeGreaterThan(300)
  })

  it('returns Infinity for unparseable input', () => {
    expect(daysUntilBirthday('', new Date())).toBe(Number.POSITIVE_INFINITY)
  })
})
