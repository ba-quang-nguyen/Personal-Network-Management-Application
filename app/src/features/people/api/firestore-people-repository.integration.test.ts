import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

import { getAuthClient } from '@/shared/lib/firebase'
import { isFirebaseConfigured, useEmulator } from '@/shared/lib/firebase-config'

import type { Person } from '../types'
import { firestorePeopleRepository } from './firestore-people-repository'

/**
 * Integration test — chạy `npm run test:firebase` với project THẬT.
 * Bỏ qua (skip) trừ khi đã điền VITE_FIREBASE_* + VITE_TEST_EMAIL/VITE_TEST_PASSWORD
 * vào .env.local (và VITE_USE_EMULATOR != true).
 */
const EMAIL = import.meta.env.VITE_TEST_EMAIL
const PASSWORD = import.meta.env.VITE_TEST_PASSWORD
const canRun = isFirebaseConfigured && !useEmulator && Boolean(EMAIL && PASSWORD)

describe.skipIf(!canRun)('firestorePeopleRepository (real project)', () => {
  let uid = ''

  beforeAll(async () => {
    const cred = await signInWithEmailAndPassword(getAuthClient(), EMAIL!, PASSWORD!)
    uid = cred.user.uid
  })

  afterAll(async () => {
    await signOut(getAuthClient())
  })

  it('CRUD một người qua repository', async () => {
    const id = await firestorePeopleRepository.createPerson(
      { name: 'Integration Test', initials: 'IT' },
      uid,
    )
    expect(id).toBeTruthy()

    let people: Person[] = []
    const unsub = firestorePeopleRepository.subscribePeople(uid, (next) => {
      people = next
    })
    await new Promise((resolve) => setTimeout(resolve, 500))
    unsub()

    expect(people.some((p) => p.id === id)).toBe(true)

    await firestorePeopleRepository.updatePerson(id, { company: 'Test Co' }, uid)
    await firestorePeopleRepository.deletePerson(id, uid)
  })
})
