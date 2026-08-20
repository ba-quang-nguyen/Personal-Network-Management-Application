import { useContext } from 'react'
import type { Locale as DateFnsLocale } from 'date-fns'
import { enUS, vi, ja } from 'date-fns/locale'

import { LocaleContext } from './context'
import type { Dictionary, Locale } from './types'

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}

export function useMessages<T>(dictionary: Dictionary<T>): T {
  const { locale } = useLocale()
  return dictionary[locale]
}

const DATE_FNS_LOCALE: Record<Locale, DateFnsLocale> = { en: enUS, vi, ja }

export function useDateFnsLocale(): DateFnsLocale {
  return DATE_FNS_LOCALE[useLocale().locale]
}
