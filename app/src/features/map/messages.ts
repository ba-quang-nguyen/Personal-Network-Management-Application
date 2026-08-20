import type { Dictionary } from '@/shared/i18n'

const en = {
  map_kicker: 'Exploration',
  map_title: 'Network map',
  map_sub:
    'Lenses to explore your network — grouped by location, industry, company or relationship.',
  lens_location: 'Location',
  lens_industry: 'Industry',
  lens_company: 'Company',
  lens_relationship: 'Relationship',
  map_empty: 'No people yet.',
}

const vi = {
  map_kicker: 'Khám phá',
  map_title: 'Bản đồ mạng lưới',
  map_sub: 'Các lăng kính để khám phá mạng lưới — nhóm theo nơi ở, ngành, công ty hoặc quan hệ.',
  lens_location: 'Nơi ở',
  lens_industry: 'Ngành',
  lens_company: 'Công ty',
  lens_relationship: 'Quan hệ',
  map_empty: 'Chưa có ai.',
} satisfies typeof en

const ja = {
  map_kicker: '探索',
  map_title: 'ネットワークマップ',
  map_sub: 'ネットワークを探索するレンズ — 場所・業界・会社・関係でグループ化。',
  lens_location: '場所',
  lens_industry: '業界',
  lens_company: '会社',
  lens_relationship: '関係',
  map_empty: 'まだ誰もいません。',
} satisfies typeof en

export const MAP_MESSAGES: Dictionary<typeof en> = { en, vi, ja }
