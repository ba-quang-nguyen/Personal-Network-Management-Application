import { DEFAULT_LOCALE, LOCALES, type Locale } from './types'

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
}

export function resolveInitialLocale(saved: string | null): Locale {
  return isLocale(saved) ? saved : DEFAULT_LOCALE
}

/** Tách message theo locale hiện tại; lỗi nếu thiếu locale (phòng thủ). */
export function pickMessages<T>(dictionary: Record<Locale, T>, locale: Locale): T {
  return dictionary[locale]
}
