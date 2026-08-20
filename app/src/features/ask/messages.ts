import type { Dictionary } from '@/shared/i18n'

const en = {
  ask_kicker: 'Search / Ask my network',
  ask_title: 'Ask your network anything.',
  ask_sub: 'No exact names needed — search structured data and memories together.',
  ask_ph: 'Who lives in Yokohama?',
  ask_btn: 'Ask',
  ask_empty: 'No matches. Try a different question.',
  ask_results: '{count} match(es)',
  ask_quick: 'Try asking',
}

const vi = {
  ask_kicker: 'Tìm / Hỏi mạng lưới của bạn',
  ask_title: 'Hỏi mạng lưới của bạn bất cứ điều gì.',
  ask_sub: 'Không cần nhớ đúng tên — tìm dữ liệu có cấu trúc và ký ức cùng lúc.',
  ask_ph: 'Ai sống ở Yokohama?',
  ask_btn: 'Hỏi',
  ask_empty: 'Không có kết quả. Thử câu hỏi khác.',
  ask_results: '{count} kết quả',
  ask_quick: 'Thử hỏi',
} satisfies typeof en

const ja = {
  ask_kicker: '検索 / ネットワークに聞く',
  ask_title: 'ネットワークに何でも聞いてみましょう。',
  ask_sub: '正確な名前は不要 — 構造化データと記憶をまとめて検索。',
  ask_ph: '横浜に住んでいる人は？',
  ask_btn: '聞く',
  ask_empty: '該当なし。別の質問を試してください。',
  ask_results: '{count} 件',
  ask_quick: '試してみる',
} satisfies typeof en

export const ASK_MESSAGES: Dictionary<typeof en> = { en, vi, ja }
