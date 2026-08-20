import type { Dictionary } from '@/shared/i18n'

const en = {
  care_kicker: 'Relationship care',
  care_title: 'Who needs attention?',
  care_sub: 'Reasons always shown — birthday, follow-up, missed rhythm, open promises.',
  care_empty: 'Everyone is taken care of.',
  reason_birthday: 'Birthday',
  reason_promise: 'Open promise',
  reason_follow_up: 'Follow-up',
  reason_silence: 'Missed rhythm',
  urgency_high: 'Needs attention',
  urgency_medium: 'Coming up',
  urgency_low: 'Scheduled',
  birthday_in: 'In {days} days',
  silence_days: '{days} days since last contact',
}

const vi = {
  care_kicker: 'Chăm sóc quan hệ',
  care_title: 'Ai đang cần bạn quan tâm?',
  care_sub: 'Luôn hiện lý do — sinh nhật, theo dõi, lỡ nhịp, lời hứa còn treo.',
  care_empty: 'Mọi người đều được chăm sóc chu đáo.',
  reason_birthday: 'Sinh nhật',
  reason_promise: 'Lời hứa còn treo',
  reason_follow_up: 'Theo dõi',
  reason_silence: 'Lỡ nhịp liên lạc',
  urgency_high: 'Cần quan tâm',
  urgency_medium: 'Sắp tới',
  urgency_low: 'Đã lên lịch',
  birthday_in: 'Còn {days} ngày',
  silence_days: '{days} ngày chưa liên lạc',
} satisfies typeof en

const ja = {
  care_kicker: '関係のケア',
  care_title: '誰に気を配るべき？',
  care_sub: '理由を常に表示 — 誕生日、フォローアップ、途切れたリズム、未完了の約束。',
  care_empty: 'みんな大切にされています。',
  reason_birthday: '誕生日',
  reason_promise: '未完了の約束',
  reason_follow_up: 'フォローアップ',
  reason_silence: '連絡リズムの乱れ',
  urgency_high: '要対応',
  urgency_medium: '近日',
  urgency_low: '予定済み',
  birthday_in: 'あと {days} 日',
  silence_days: '最後の連絡から {days} 日',
} satisfies typeof en

export const CARE_MESSAGES: Dictionary<typeof en> = { en, vi, ja }
