/** Logic ngày thuần (không React) — dễ test. */

const MONTHS: Record<string, number> = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
}

/** Parse "Nov 22" / "Oct 11 (in 3 days)" → { month, day }. Trả null nếu không parse được. */
export function parseMonthDay(value: string): { month: number; day: number } | null {
  const m = /([A-Za-z]{3})\s*(\d{1,2})/.exec(value)
  if (!m) return null
  const abbr = (m[1]?.[0]?.toUpperCase() ?? '') + (m[1]?.slice(1).toLowerCase() ?? '')
  const month = MONTHS[abbr]
  if (!month) return null
  const day = Number(m[2])
  if (!Number.isInteger(day) || day < 1 || day > 31) return null
  return { month, day }
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

/**
 * Số ngày còn lại tới sinh nhật kế tiếp (0 = hôm nay).
 * Trả Infinity nếu không parse được.
 */
export function daysUntilBirthday(value: string, today: Date): number {
  const parsed = parseMonthDay(value)
  if (!parsed) return Number.POSITIVE_INFINITY

  const todayStart = startOfDay(today)
  let next = new Date(today.getFullYear(), parsed.month - 1, parsed.day)
  if (next < todayStart) {
    next = new Date(today.getFullYear() + 1, parsed.month - 1, parsed.day)
  }
  return Math.round((next.getTime() - todayStart.getTime()) / 86_400_000)
}
