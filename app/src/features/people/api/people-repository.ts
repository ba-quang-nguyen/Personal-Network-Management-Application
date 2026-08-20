import type { CreatePersonInput, Person, UpdatePersonInput } from '../types'

/**
 * Contract cho nhóm dữ liệu "people" — 1 contract + 2 implementation + 1 file chọn.
 * JSDoc là nơi ghi ràng buộc nghiệp vụ mà CẢ HAI implementation phải tuân theo.
 */
export type PeopleRepository = {
  /** Trả hàm unsubscribe — khớp đúng chữ ký `onSnapshot` để bản Firestore không phải bọc thêm. */
  subscribePeople: (ownerId: string, onChange: (people: Person[]) => void) => () => void

  /** Tạo người mới, trả id. PHẢI gắn `ownerId` + `createdAt`/`updatedAt`. */
  createPerson: (input: CreatePersonInput, ownerId: string) => Promise<string>

  /** Cập nhật một phần (không đổi id/ownerId/createdAt). PHẢI bump `updatedAt`. */
  updatePerson: (personId: string, input: UpdatePersonInput, ownerId: string) => Promise<void>

  /** Xoá người. */
  deletePerson: (personId: string, ownerId: string) => Promise<void>
}
