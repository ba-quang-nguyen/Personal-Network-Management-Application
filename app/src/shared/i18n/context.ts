import { createContext } from 'react'
import type { Locale } from './types'

export type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

/** Tách context khỏi provider để Fast Refresh không mất state. */
export const LocaleContext = createContext<LocaleContextValue | null>(null)
