import { describe, expect, it } from 'vitest'

import { DICTIONARIES } from './dictionaries'
import { LOCALES } from './types'

describe.each(DICTIONARIES.map((d) => [d.name, d.dictionary] as const))(
  'dictionary %s',
  (_name, dictionary) => {
    const english = Object.keys(dictionary.en)

    it.each(LOCALES)('locale %s has the same keys as en', (locale) => {
      expect(Object.keys(dictionary[locale]).sort()).toEqual([...english].sort())
    })

    it.each(LOCALES)('locale %s has no empty strings', (locale) => {
      for (const [key, value] of Object.entries(dictionary[locale])) {
        expect(value, `${locale}.${key}`).not.toBe('')
      }
    })

    it.each(['vi', 'ja'] as const)('locale %s is actually translated', (locale) => {
      const translated = dictionary[locale] as Record<string, string>
      let identical = 0
      for (const [key, value] of Object.entries(dictionary.en)) {
        if (translated[key] === value) identical += 1
      }
      // Ngưỡng 30%: vài chuỗi trùng là đúng (tên app, chữ viết tắt),
      // nhưng quá nửa trùng nghĩa là ai đó copy bản en rồi quên dịch.
      expect(identical / english.length).toBeLessThan(0.3)
    })
  },
)
