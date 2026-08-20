/** Domain model cho feature people — port từ prototype (js/data.js §9). */

export type Strength = 'close' | 'important' | 'normal' | 'weak'

export const STRENGTHS: { id: Strength; label: string; color: string }[] = [
  { id: 'close', label: 'Close', color: '#E0452C' },
  { id: 'important', label: 'Important', color: '#B45F06' },
  { id: 'normal', label: 'Normal', color: '#3E7BB6' },
  { id: 'weak', label: 'Weak', color: '#8D867C' },
]

export type Meeting = {
  id: string
  date: string // "YYYY-MM-DD" hoặc chuỗi hiển thị
  type: string // Meeting | Call | Coffee | Event | Drinks | Video call
  title: string
  summary: string
  tags: string[]
}

export type Memory = {
  id: string
  when: string
  text: string
}

export type FollowUpKind = 'meeting' | 'action' | 'reconnect' | 'birthday' | 'message'

export type FollowUp = {
  id: string
  when: string // "Open" | "YYYY-MM-DD" | "Overdue · N months"
  what: string
  kind: FollowUpKind
}

export type DateEntry = {
  id: string
  label: string
  when: string
  icon: 'cake' | 'hand' | 'cal'
}

export type Photo = {
  id: string
  src: string
  note: string
}

export type FirstMet = {
  date: string
  place: string
  how: string
}

export type LastContact = {
  type: string
  when: string
  place: string
  summary: string
  tags: string[]
}

export type Person = {
  id: string
  name: string
  nameJa?: string
  nickname?: string
  initials: string
  gender?: string
  birthday?: string
  nationality?: string
  languages?: string[]
  currentCity?: string
  area?: string
  hometown?: string
  country?: string
  email?: string
  phone?: string
  company?: string
  department?: string
  title?: string
  industry?: string
  profession?: string
  expertise?: string[]
  previousCompanies?: string[]
  careerHistory?: string[]
  skills?: string[]
  businessTopics?: string[]
  spouse?: string
  children?: string
  familyNotes?: string
  hobbies?: string[]
  sports?: string[]
  favoriteFood?: string
  favoriteDrink?: string
  restaurants?: string
  schools?: string
  pets?: string
  travelInterests?: string[]
  relationshipType?: string
  strength?: Strength
  frequency?: string
  firstMet?: FirstMet
  introducedBy?: string
  helpGiven?: string[]
  helpReceived?: string[]
  promises?: string[]
  role?: string
  since?: string
  location?: string
  color?: string
  interests?: string[]
  dates?: DateEntry[]
  last?: LastContact
  followUp?: FollowUp
  meetings?: Meeting[]
  memories?: Memory[]
  raw?: string
  connections?: string[]
  mutual?: string[]
  circles?: string[]
  tags?: string[]
  lastContactDays?: number
  metCount?: number
  about?: string
  active?: boolean
  photo?: string
  photos?: Photo[]
  ownerId?: string
  /** ISO 8601 string (đơn giản, tránh Timestamp↔Date khi đọc/ghi Firestore). */
  createdAt?: string
  updatedAt?: string
}

export type Circle = {
  id: string
  name: string
  color: string
  memberIds: string[]
  ownerId?: string
  createdAt?: string
  updatedAt?: string
}

export type CreatePersonInput = Omit<Person, 'id' | 'ownerId' | 'createdAt' | 'updatedAt'> & {
  id?: string
}

export type UpdatePersonInput = Partial<Omit<Person, 'id' | 'ownerId' | 'createdAt' | 'updatedAt'>>
