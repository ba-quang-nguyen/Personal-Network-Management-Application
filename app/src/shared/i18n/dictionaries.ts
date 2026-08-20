import type { Dictionary } from './types'

import { APP_MESSAGES } from '@/app/messages'
import { HOME_MESSAGES } from '@/features/home/messages'
import { PEOPLE_MESSAGES } from '@/features/people/messages'
import { CARE_MESSAGES } from '@/features/care/messages'
import { ASK_MESSAGES } from '@/features/ask/messages'
import { SETTINGS_MESSAGES } from '@/features/settings/messages'
import { MAP_MESSAGES } from '@/features/map/messages'

export type AnyDictionary = Dictionary<Record<string, string>>

function register<T extends Record<string, string>>(
  name: string,
  dictionary: Dictionary<T>,
): { name: string; dictionary: AnyDictionary } {
  return { name, dictionary: dictionary as AnyDictionary }
}

/**
 * Đăng ký mọi từ điển mới vào đây — thiếu bước này thì từ điển mới
 * không được `dictionaries.test.ts` phủ (bắt thiếu khoá / chuỗi rỗng / quên dịch).
 */
export const DICTIONARIES = [
  register('app', APP_MESSAGES),
  register('home', HOME_MESSAGES),
  register('people', PEOPLE_MESSAGES),
  register('care', CARE_MESSAGES),
  register('ask', ASK_MESSAGES),
  register('settings', SETTINGS_MESSAGES),
  register('map', MAP_MESSAGES),
]
