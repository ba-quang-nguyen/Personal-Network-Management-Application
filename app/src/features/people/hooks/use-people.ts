import { useCallback, useEffect, useState } from 'react'

import { useAuth } from '@/features/auth/auth-provider'

import { peopleRepository } from '../api'
import type { CreatePersonInput, Person, UpdatePersonInput } from '../types'

export function usePeople() {
  const { user } = useAuth()
  const ownerId = user?.uid ?? 'local-user'

  const [people, setPeople] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const unsubscribe = peopleRepository.subscribePeople(ownerId, (next) => {
      setPeople(next)
      setLoading(false)
    })
    return unsubscribe
  }, [ownerId])

  const createPerson = useCallback(
    (input: CreatePersonInput) => peopleRepository.createPerson(input, ownerId),
    [ownerId],
  )
  const updatePerson = useCallback(
    (personId: string, input: UpdatePersonInput) =>
      peopleRepository.updatePerson(personId, input, ownerId),
    [ownerId],
  )
  const deletePerson = useCallback(
    (personId: string) => peopleRepository.deletePerson(personId, ownerId),
    [ownerId],
  )

  return { people, loading, createPerson, updatePerson, deletePerson }
}
