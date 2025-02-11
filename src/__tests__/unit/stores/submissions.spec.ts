/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
 *
 * ===========================================================================
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License as published by
 * The Apache Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache License for more details.
 *
 * You should have received a copy of the Apache License
 * along with this program. If not, see <http://www.apache.org/licenses/>
 *
 */

import { setActivePinia, createPinia } from 'pinia'
import { useSubmissionStore } from '@/store/options/submission'
import {
  describe,
  beforeEach,
  it,
  expect,
  afterAll,
  vi,
  afterEach
} from 'vitest'
import {
  EntityModelRepositoryDto,
  EntityModelSubmissionDtoStateEnum
} from '@/openapi'
import packages from '@/__tests__/config/mockData/packages.json'
import submissions from '@/__tests__/config/mockData/submissions.json'
import { useUtilities } from '@/composable/utilities'
import {
  SubmissionsFiltration,
  defaultValues
} from '@/models/Filtration'
import { Technologies } from '@/enum/Technologies'
import { useAuthorizationStore } from '@/store/options/authorization'
import { server } from '@/__tests__/config/backend/server'
import { failingServer } from '@/__tests__/config/backend/failingServer'

const { deepCopyAny } = useUtilities()
const files = [
  {
    name: 'A3_1.0.0.tar.gz',
    type: 'application/gzip'
  } as File
]

const defaultFiltration = defaultValues(
  SubmissionsFiltration
)

const randomFiltration = {
  state: ['ACCEPTED'],
  assignedToMe: false,
  search: 'accured',
  technologies: [Technologies.enum.Python],
  repository: ['repository1'],
  fromDate: '2019-05-03',
  toDate: '2022-09-20'
} as SubmissionsFiltration

describe('Submissions Store', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    server.listen()
    const authorizationStore = useAuthorizationStore()
    await authorizationStore.getUserInfo()
  })

  afterAll(() => server.close())

  it('Initial store state', () => {
    const submissionStore = useSubmissionStore()

    expect(submissionStore.packages).toStrictEqual([])
    expect(submissionStore.submissions).toStrictEqual([])
    expect(submissionStore.pending).toStrictEqual([])
    expect(submissionStore.repository).toBeUndefined()
    expect(submissionStore.filtration).toStrictEqual(
      defaultFiltration
    )
    expect(submissionStore.totalNumber).toEqual(0)
  })

  it('Clear filtration', () => {
    const submissionStore = useSubmissionStore()
    submissionStore.filtration = randomFiltration

    submissionStore.clearFiltration()

    expect(submissionStore.filtration).toStrictEqual(
      defaultFiltration
    )
  })

  it('Clear filtration and fetch', async () => {
    const submissionStore = useSubmissionStore()
    const spy = vi.spyOn(submissionStore, 'getPage')
    submissionStore.filtration = randomFiltration

    await submissionStore.clearFiltrationAndFetch()

    expect(submissionStore.filtration).toStrictEqual(
      defaultFiltration
    )
    expect(spy).toBeCalled()
    expect(submissionStore.submissions).toStrictEqual(
      submissions.data.content
    )
    expect(submissionStore.totalNumber).toStrictEqual(
      submissions.data.page.totalElements
    )
  })

  it('Set filtration', () => {
    const submissionStore = useSubmissionStore()

    submissionStore.setFiltration(randomFiltration)

    expect(submissionStore.filtration).toStrictEqual(
      randomFiltration
    )
  })

  it('Set packages', () => {
    const submissionStore = useSubmissionStore()

    submissionStore.packages = files

    expect(submissionStore.packages).toStrictEqual(files)
  })

  it('Add package', () => {
    const submissionStore = useSubmissionStore()

    submissionStore.addPackage(files[0])

    expect(submissionStore.packages).toStrictEqual(files)
  })

  it('Add packages', () => {
    const submissionStore = useSubmissionStore()

    submissionStore.addPackages(files)

    expect(submissionStore.packages).toStrictEqual(files)
  })

  it('Set a repository', () => {
    const submissionStore = useSubmissionStore()
    const repository: EntityModelRepositoryDto =
      packages.data.content[0].repository

    submissionStore.setRepository(repository)

    expect(submissionStore.repository).toMatchObject(
      repository
    )
  })

  it('Fetch submissions', async () => {
    const submissionStore = useSubmissionStore()

    await submissionStore.getPage()

    expect(submissionStore.submissions).toStrictEqual(
      submissions.data.content
    )
  })

  it('Get replace default value', () => {
    const submissionStore = useSubmissionStore()
    expect(
      submissionStore.getReplaceForPackage(files[0])
    ).toBeFalsy()
  })

  it('Get generate manual for random R', () => {
    const submissionStore = useSubmissionStore()
    submissionStore.repository = { technology: 'R' }
    expect(
      submissionStore.getGenerateManualForPackage(files[0])
    ).toBeFalsy()
  })

  it('Update submissions', async () => {
    const submissionStore = useSubmissionStore()
    const spy = vi.spyOn(submissionStore, 'getPage')
    const submission = deepCopyAny(
      submissions.data.content[0]
    )

    await submissionStore.patch(submission, {
      state: EntityModelSubmissionDtoStateEnum.CANCELLED
    })

    expect(spy).toBeCalled()
    expect(submissionStore.submissions).toStrictEqual(
      submissions.data.content
    )
  })
})

describe('Testing submissions store with failing backend', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    failingServer.listen()
    const authorizationStore = useAuthorizationStore()
    await authorizationStore.getUserInfo()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => failingServer.close())

  it('Fetch submissions', async () => {
    const submissionStore = useSubmissionStore()

    vi.mock('vue3-toastify')
    await submissionStore.getPage()

    expect(submissionStore.submissions).toStrictEqual([])
    // expect(toast).toBeCalled()
  })

  it('Update submissions', async () => {
    const submissionStore = useSubmissionStore()
    // const spy = vi.spyOn(
    //   submissionStore,
    //   'fetchSubmissions'
    // )
    const submission = deepCopyAny(
      submissions.data.content[0]
    )

    await submissionStore.patch(submission, {
      state: EntityModelSubmissionDtoStateEnum.CANCELLED
    })

    // expect(spy).toBeCalledTimes(1)
    // TODO update tests in submissions when the backed error handling will be completed and updated on fronted
    // expect(spyToast).toBeCalled()
    expect(submissionStore.submissions).toStrictEqual([])
  })
})
