const KEY_PREFIX = 'nm.mock'

/**
 * Tăng MỖI KHI cấu trúc mock đổi, kèm ghi chú đổi gì — dữ liệu cũ bị bỏ, seed lại.
 */
const STORAGE_VERSION = 1

type Envelope<T> = { version: number; data: T }

export function loadMockData<T>(name: string): T | null {
  try {
    const raw = localStorage.getItem(`${KEY_PREFIX}.${name}`)
    if (!raw) return null
    const envelope = JSON.parse(raw) as Envelope<T>
    if (envelope.version !== STORAGE_VERSION) return null // cấu trúc đổi → seed lại
    return envelope.data
  } catch {
    return null // JSON hỏng hoặc localStorage bị chặn — coi như chưa có gì
  }
}

export function saveMockData<T>(name: string, data: T): void {
  try {
    const envelope: Envelope<T> = { version: STORAGE_VERSION, data }
    localStorage.setItem(`${KEY_PREFIX}.${name}`, JSON.stringify(envelope))
  } catch {
    /* ignore */
  }
}

export function clearMockData(name: string): void {
  try {
    localStorage.removeItem(`${KEY_PREFIX}.${name}`)
  } catch {
    /* ignore */
  }
}

export function mockStorageKey(name: string): string {
  return `${KEY_PREFIX}.${name}`
}
