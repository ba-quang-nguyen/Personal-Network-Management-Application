/** Sinh id duy nhất (ưu tiên crypto.randomUUID, fallback cho môi trường cũ). */
export function makeId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}
