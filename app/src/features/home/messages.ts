import type { Dictionary } from '@/shared/i18n'

const en = {
  home_kicker: 'Today',
  home_title: 'Today',
  home_sub: 'Meet → Capture → Remember → Retrieve → Reconnect.',
  home_care: 'Needs attention',
  home_upcoming: 'Upcoming',
  home_recent: 'Recently contacted',
  home_dates: 'Upcoming dates',
  home_empty_care: 'Everyone is taken care of.',
  home_no_people: 'No one yet — add your first person to get started.',
}

const vi = {
  home_kicker: 'Hôm nay',
  home_title: 'Hôm nay',
  home_sub: 'Gặp → Ghi lại → Nhớ → Tìm lại → Kết nối lại.',
  home_care: 'Cần quan tâm',
  home_upcoming: 'Sắp tới',
  home_recent: 'Liên lạc gần đây',
  home_dates: 'Ngày sắp tới',
  home_empty_care: 'Mọi người đều được chăm sóc chu đáo.',
  home_no_people: 'Chưa có ai — thêm người đầu tiên để bắt đầu.',
} satisfies typeof en

const ja = {
  home_kicker: '今日',
  home_title: '今日',
  home_sub: '会う → 記録 → 記憶 → 取り出す → 再びつながる。',
  home_care: '要対応',
  home_upcoming: '今後の予定',
  home_recent: '最近の連絡',
  home_dates: '今後の日付',
  home_empty_care: 'みんな大切にされています。',
  home_no_people: 'まだ誰もいません — 最初の人を追加しましょう。',
} satisfies typeof en

export const HOME_MESSAGES: Dictionary<typeof en> = { en, vi, ja }
