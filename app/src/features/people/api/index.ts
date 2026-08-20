import { isFirebaseConfigured } from '@/shared/lib/firebase-config'

import { firestorePeopleRepository } from './firestore-people-repository'
import { memoryPeopleRepository } from './memory-people-repository'
import type { PeopleRepository } from './people-repository'

/** Cả seam gói trong vài dòng: có Firebase → Firestore, trống → in-memory. */
export const peopleRepository: PeopleRepository = isFirebaseConfigured
  ? firestorePeopleRepository
  : memoryPeopleRepository

export type { PeopleRepository } from './people-repository'
