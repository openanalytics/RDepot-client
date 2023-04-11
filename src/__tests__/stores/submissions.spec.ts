import { setActivePinia, createPinia } from 'pinia'
import { useSubmissionStore } from '@/store/submission'
import { describe, beforeEach, it, expect } from 'vitest'
import {
  EntityModelRepositoryDto,
  EntityModelSubmissionDtoStateEnum
} from '@/openapi'
import packages from '@/__tests__/config/mockData/packages.json'

var files = [
  {
    name: 'A3_1.0.0.tar.gz',
    type: 'application/gzip'
  } as File
]

describe('Submissions Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Testing submission filtration clear', () => {
    const submission_store = useSubmissionStore()
    const submissions_filtration =
      submission_store.filtration
    expect(submissions_filtration.state).toBe(undefined)
    expect(submissions_filtration.assignedToMe).toBe(
      undefined
    )

    submissions_filtration.assignedToMe = true
    submissions_filtration.state =
      EntityModelSubmissionDtoStateEnum.ACCEPTED
    submission_store.setFiltration(submissions_filtration)
  })

  it('Set a repository', () => {
    const submission_store = useSubmissionStore()
    const repository: EntityModelRepositoryDto =
      packages.data.content[0].repository
    expect(submission_store.repository).toBeUndefined()
    submission_store.setRepository(repository)
    expect(submission_store.repository).toMatchObject(
      repository
    )
  })

  it('Add packages', () => {
    const submission_store = useSubmissionStore()
    expect(submission_store.packages.length).toBe(0)
    submission_store.addPackages(files)
    expect(submission_store.packages.length).toBe(
      files.length
    )
  })
})
