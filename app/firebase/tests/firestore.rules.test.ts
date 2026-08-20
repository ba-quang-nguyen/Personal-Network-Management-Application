import { readFileSync } from 'node:fs'
import path from 'node:path'
import { afterAll, beforeAll, describe, it } from 'vitest'
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing'
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'

/**
 * Test Security Rules trên emulator (chạy qua `npm run test:rules`, cần Java).
 * Phủ các ca BỊ TỪ CHỐI + deny-by-default — không chỉ đường thành công.
 */

const rules = readFileSync(path.resolve(import.meta.dirname, '../firestore.rules'), 'utf8')

type TestEnv = Awaited<ReturnType<typeof initializeTestEnvironment>>

let env: TestEnv

beforeAll(async () => {
  env = await initializeTestEnvironment({
    projectId: 'nm-test',
    firestore: { rules },
  })
})

afterAll(async () => {
  await env.cleanup()
})

describe('firestore.rules (1 người dùng)', () => {
  it('cho phép chủ sở hữu đọc/ghi people của chính mình', async () => {
    const alice = env.authenticatedContext('alice')
    const ref = doc(alice.firestore(), 'users/alice/people/p1')
    await assertSucceeds(setDoc(ref, { name: 'Tanaka' }))
    await assertSucceeds(getDoc(ref))
    await assertSucceeds(deleteDoc(ref))
  })

  it('từ chối người khác đọc/ghi people của alice', async () => {
    const alice = env.authenticatedContext('alice')
    const bob = env.authenticatedContext('bob')
    const ref = doc(alice.firestore(), 'users/alice/people/p1')
    await assertSucceeds(setDoc(ref, { name: 'Tanaka' }))

    const bobRead = doc(bob.firestore(), 'users/alice/people/p1')
    await assertFails(getDoc(bobRead))
    await assertFails(setDoc(bobRead, { name: 'Hack' }))
  })

  it('từ chối truy cập khi chưa đăng nhập', async () => {
    const anon = env.unauthenticatedContext()
    const ref = doc(anon.firestore(), 'users/alice/people/p1')
    await assertFails(getDoc(ref))
  })

  it('deny-by-default: collection ngoài users/{uid} bị từ chối', async () => {
    const alice = env.authenticatedContext('alice')
    const ref = doc(alice.firestore(), 'admins/alice')
    await assertFails(getDoc(ref))
    await assertFails(setDoc(ref, { role: 'admin' }))
  })

  it('không ghi được sang nhánh users của người khác', async () => {
    const alice = env.authenticatedContext('alice')
    const ref = doc(alice.firestore(), 'users/bob/people/x')
    await assertFails(setDoc(ref, { name: 'x' }))
  })
})
