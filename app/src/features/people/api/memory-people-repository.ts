import { makeId } from '@/shared/lib/id'
import { loadMockData, mockStorageKey, saveMockData } from '@/shared/mocks/persistence'

import type { Person } from '../types'
import type { PeopleRepository } from './people-repository'

const STORE_NAME = 'people'

const listeners = new Set<(people: Person[]) => void>()
let people: Person[] = loadMockData<Person[]>(STORE_NAME) ?? []

function snapshot(): Person[] {
  return people.map((p) => ({ ...p }))
}

function notify() {
  const snap = snapshot()
  listeners.forEach((l) => l(snap))
}

function persist() {
  saveMockData(STORE_NAME, people)
}

function emit() {
  notify()
  persist()
}

// Đồng bộ nhiều tab: tab khác ghi → reload + notify (KHÔNG persist lại để tránh vòng lặp).
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === mockStorageKey(STORE_NAME)) {
      people = loadMockData<Person[]>(STORE_NAME) ?? []
      notify()
    }
  })
}

/** Mô phỏng độ trễ mạng để thấy được loading/skeleton. */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const memoryPeopleRepository: PeopleRepository = {
  subscribePeople(_ownerId, onChange) {
    listeners.add(onChange)
    // Lần đầu thêm độ trễ nhỏ (mô phỏng onSnapshot network) để loading state hiện ra.
    void delay(80).then(() => onChange(snapshot()))
    return () => {
      listeners.delete(onChange)
    }
  },

  async createPerson(input, ownerId) {
    const now = new Date().toISOString()
    const person: Person = {
      ...input,
      id: input.id ?? makeId(),
      ownerId,
      active: input.active ?? true,
      createdAt: now,
      updatedAt: now,
    }
    people = [person, ...people]
    emit()
    return person.id
  },

  async updatePerson(personId, input, _ownerId) {
    const idx = people.findIndex((p) => p.id === personId)
    if (idx === -1) throw new Error(`Person not found: ${personId}`)
    const prev = people[idx] as Person
    people[idx] = { ...prev, ...input, id: personId, updatedAt: new Date().toISOString() }
    emit()
  },

  async deletePerson(personId, _ownerId) {
    people = people.filter((p) => p.id !== personId)
    emit()
  },
}
