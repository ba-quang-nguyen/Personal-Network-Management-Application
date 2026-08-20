import type { Person } from '@/features/people/types'

export type BackupEnvelope = {
  version: number
  exportedAt: string
  people: Person[]
}

export const BACKUP_VERSION = 1

/** Xuất toàn bộ người thành JSON (định dạng ổn định cho import). */
export function serializePeople(people: Person[]): string {
  const envelope: BackupEnvelope = {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    people,
  }
  return JSON.stringify(envelope, null, 2)
}

/**
 * Parse file backup → danh sách người.
 * Chấp nhận cả định dạng envelope `{people: []}` lẫn mảng trực tiếp.
 */
export function parsePeopleJson(raw: string): Person[] {
  const data: unknown = JSON.parse(raw)
  if (Array.isArray(data)) return data as Person[]
  if (data && typeof data === 'object' && Array.isArray((data as BackupEnvelope).people)) {
    return (data as BackupEnvelope).people
  }
  throw new Error('Invalid backup file')
}
