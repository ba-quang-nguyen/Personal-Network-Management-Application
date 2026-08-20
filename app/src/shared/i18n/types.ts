export const LOCALES = ['en', 'vi', 'ja'] as const
export type Locale = (typeof LOCALES)[number]

/**
 * Bản `en` là NGUỒN cho mọi từ điển có kiểu; `vi`/`ja` phải cùng hình dạng
 * (`satisfies typeof en`). Mặc định `vi` cho app cá nhân tiếng Việt —
 * KHÔNG đoán theo navigator.language (giữ cùng ngôn ngữ trên mọi máy).
 */
export const DEFAULT_LOCALE: Locale = 'vi'

/** Bản `en` là nguồn; mọi locale phải cùng hình dạng. */
export type Dictionary<T> = Record<Locale, T>
