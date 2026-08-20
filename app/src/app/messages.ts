import type { Dictionary } from '@/shared/i18n'

const en = {
  app_name: 'Network Management',
  tagline: 'Your relationships, remembered and managed.',

  nav_today: 'Today',
  nav_people: 'People',
  nav_care: 'Care',
  nav_ask: 'Ask',
  nav_map: 'Map',
  nav_settings: 'Settings',

  you: 'You',
  you_sub: 'Private memory · offline-first',
  capture_memory: '＋ Capture a memory',

  common_add_person: 'Add person',
  common_add_info: 'Add info',
  common_save: 'Save',
  common_cancel: 'Cancel',
  common_delete: 'Delete',
  common_edit: 'Edit',
  common_back: 'Back',
  common_search: 'Search',
  common_loading: 'Loading…',
  common_confirm: 'Confirm',
  common_close: 'Close',

  auth_login_title: 'Welcome back',
  auth_login_sub: 'Sign in to your private memory.',
  auth_email: 'Email',
  auth_password: 'Password',
  auth_sign_in: 'Sign in',
  auth_sign_out: 'Sign out',
  auth_forgot: 'Forgot password?',
  auth_reset_sent: 'Reset link sent — check your email.',
  auth_reset_title: 'Reset password',
  auth_reset_send: 'Send reset link',
  auth_invalid: 'Invalid email or password.',
  auth_signed_out: 'Signed out.',

  route_not_found: 'Page not found',
  route_error: 'Something went wrong',
  route_back_home: 'Back to Today',
}

const vi = {
  app_name: 'Network Management',
  tagline: 'Các mối quan hệ của bạn — được ghi nhớ và chăm sóc.',

  nav_today: 'Hôm nay',
  nav_people: 'Mọi người',
  nav_care: 'Chăm sóc',
  nav_ask: 'Hỏi',
  nav_map: 'Bản đồ',
  nav_settings: 'Cài đặt',

  you: 'Bạn',
  you_sub: 'Bộ nhớ riêng tư · ưu tiên ngoại tuyến',
  capture_memory: '＋ Ghi lại một kỷ niệm',

  common_add_person: 'Thêm người',
  common_add_info: 'Thêm thông tin',
  common_save: 'Lưu',
  common_cancel: 'Huỷ',
  common_delete: 'Xoá',
  common_edit: 'Sửa',
  common_back: 'Quay lại',
  common_search: 'Tìm kiếm',
  common_loading: 'Đang tải…',
  common_confirm: 'Xác nhận',
  common_close: 'Đóng',

  auth_login_title: 'Chào mừng trở lại',
  auth_login_sub: 'Đăng nhập vào bộ nhớ riêng tư của bạn.',
  auth_email: 'Email',
  auth_password: 'Mật khẩu',
  auth_sign_in: 'Đăng nhập',
  auth_sign_out: 'Đăng xuất',
  auth_forgot: 'Quên mật khẩu?',
  auth_reset_sent: 'Đã gửi link đặt lại — kiểm tra email.',
  auth_reset_title: 'Đặt lại mật khẩu',
  auth_reset_send: 'Gửi link đặt lại',
  auth_invalid: 'Email hoặc mật khẩu không đúng.',
  auth_signed_out: 'Đã đăng xuất.',

  route_not_found: 'Không tìm thấy trang',
  route_error: 'Đã có lỗi xảy ra',
  route_back_home: 'Về Hôm nay',
} satisfies typeof en

const ja = {
  app_name: 'Network Management',
  tagline: 'あなたの人間関係を、記憶し、大切にする。',

  nav_today: '今日',
  nav_people: '人々',
  nav_care: 'ケア',
  nav_ask: '質問',
  nav_map: 'マップ',
  nav_settings: '設定',

  you: 'あなた',
  you_sub: 'プライベート記憶 · オフライン優先',
  capture_memory: '＋ 思い出を記録',

  common_add_person: '人を追加',
  common_add_info: '情報を追加',
  common_save: '保存',
  common_cancel: 'キャンセル',
  common_delete: '削除',
  common_edit: '編集',
  common_back: '戻る',
  common_search: '検索',
  common_loading: '読み込み中…',
  common_confirm: '確認',
  common_close: '閉じる',

  auth_login_title: 'おかえりなさい',
  auth_login_sub: 'プライベートな記憶にサインイン。',
  auth_email: 'メール',
  auth_password: 'パスワード',
  auth_sign_in: 'サインイン',
  auth_sign_out: 'サインアウト',
  auth_forgot: 'パスワードをお忘れですか？',
  auth_reset_sent: 'リセットリンクを送信しました — メールをご確認ください。',
  auth_reset_title: 'パスワードをリセット',
  auth_reset_send: 'リセットリンクを送信',
  auth_invalid: 'メールまたはパスワードが正しくありません。',
  auth_signed_out: 'サインアウトしました。',

  route_not_found: 'ページが見つかりません',
  route_error: '問題が発生しました',
  route_back_home: '今日へ戻る',
} satisfies typeof en

export const APP_MESSAGES: Dictionary<typeof en> = { en, vi, ja }
