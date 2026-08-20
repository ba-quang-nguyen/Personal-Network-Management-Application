/** Luật cache cho service worker — KHÔNG bao giờ cache host Firebase/Google API. */

const FIREBASE_HOST_SUFFIXES = [
  'firebaseapp.com',
  'googleapis.com',
  'gstatic.com',
  'firebaseio.com',
  'google.com',
  'google-analytics.com',
]

/**
 * Trả `false` cho host Firebase/Google (dữ liệu realtime đi qua SDK, không được cache)
 * và cho reserved path `__/` của Firebase.
 */
export function shouldCache(url: string): boolean {
  try {
    const u = new URL(url, 'http://localhost')
    const host = u.hostname
    if (FIREBASE_HOST_SUFFIXES.some((h) => host === h || host.endsWith(`.${h}`))) {
      return false
    }
    if (u.pathname.startsWith('/__/')) return false
    return true
  } catch {
    return false
  }
}
