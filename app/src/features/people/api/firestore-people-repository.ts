import { collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'

import { getDb } from '@/shared/lib/firebase'

import type { Person } from '../types'
import type { PeopleRepository } from './people-repository'

function peopleCollection(ownerId: string) {
  return collection(getDb(), 'users', ownerId, 'people')
}

export const firestorePeopleRepository: PeopleRepository = {
  subscribePeople(ownerId, onChange) {
    return onSnapshot(
      peopleCollection(ownerId),
      (snap) => {
        const people: Person[] = snap.docs.map((d) => ({
          ...(d.data() as Person),
          id: d.id,
        }))
        onChange(people)
      },
      (error) => console.error('subscribePeople error', error),
    )
  },

  async createPerson(input, ownerId) {
    const col = peopleCollection(ownerId)
    const id = input.id ?? doc(col).id
    const now = new Date().toISOString()
    const person: Person = { ...input, id, ownerId, createdAt: now, updatedAt: now }
    await setDoc(doc(col, id), person)
    return id
  },

  async updatePerson(personId, input, ownerId) {
    const now = new Date().toISOString()
    await updateDoc(doc(peopleCollection(ownerId), personId), {
      ...input,
      updatedAt: now,
    })
  },

  async deletePerson(personId, ownerId) {
    await deleteDoc(doc(peopleCollection(ownerId), personId))
  },
}
