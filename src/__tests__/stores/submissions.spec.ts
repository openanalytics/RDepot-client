/*
 * R Depot
 *
 * Copyright (C) 2012-2023 Open Analytics NV
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
import { useSubmissionStore } from '@/store/submission'
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
import me from '@/__tests__/config/mockData/me.json'
import { setupServer } from 'msw/node'
import { useUtilities } from '@/composable/utilities'
import {
  SubmissionsFiltration,
  defaultValues
} from '@/models/Filtration'
import { usePagination } from '@/store/pagination'
import { Technologies } from '@/enum/Technologies'
import { http, HttpResponse } from 'msw'

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

const server = setupServer(
  http.get(
    'http://localhost:8017/api/v2/manager/submissions',
    () => {
      return HttpResponse.json(submissions)
    }
  ),
  http.patch(
    'http://localhost:8017/api/v2/manager/r/submissions/:submission_id',
    ({ params }) => {
      const { submission_id } = params
      return HttpResponse.json({
        data: submissions.data.content.find(
          (elem) => elem.id.toString() === submission_id
        )
      })
    }
  )
)

describe('Submissions Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    server.listen()
  })

  afterAll(() => server.close())

  it('Initial store state', () => {
    const submissionStore = useSubmissionStore()

    expect(submissionStore.packages).toStrictEqual([])
    expect(submissionStore.submissions).toStrictEqual([])
    expect(submissionStore.repository).toBeUndefined()
    expect(submissionStore.filtration).toStrictEqual(
      defaultFiltration
    )
  })

  it('Clear filtration', () => {
    const submissionStore = useSubmissionStore()
    const pagination = usePagination()
    submissionStore.filtration = randomFiltration
    pagination.page = 2

    submissionStore.clearFiltration()

    expect(pagination.page).toBe(1)
    expect(submissionStore.filtration).toStrictEqual(
      defaultFiltration
    )
  })

  it('Clear filtration and fetch', async () => {
    const submissionStore = useSubmissionStore()
    const pagination = usePagination()
    const spy = vi.spyOn(
      submissionStore,
      'fetchSubmissions'
    )
    submissionStore.filtration = randomFiltration
    pagination.page = 2

    await submissionStore.clearFiltrationAndFetch()

    expect(pagination.page).toBe(1)
    expect(submissionStore.filtration).toStrictEqual(
      defaultFiltration
    )
    expect(spy).toBeCalled()
    expect(submissionStore.submissions).toStrictEqual(
      submissions.data.content
    )
  })

  it('Set filtration', () => {
    const submissionStore = useSubmissionStore()
    const pagination = usePagination()
    pagination.page = 2

    submissionStore.setFiltration(randomFiltration)

    expect(pagination.page).toBe(1)
    expect(submissionStore.filtration).toStrictEqual(
      randomFiltration
    )
  })

  it('Set packages', () => {
    const submissionStore = useSubmissionStore()

    submissionStore.setPackages(files)

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

    await submissionStore.fetchSubmissions()

    expect(submissionStore.submissions).toStrictEqual(
      submissions.data.content
    )
  })

  it('Get generate manual for Python', () => {
    const submissionStore = useSubmissionStore()
    submissionStore.repository = { technology: 'Python' }
    expect(
      submissionStore.getGenerateManualForPackage(files[0])
    ).toBeTruthy()
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
    const spy = vi.spyOn(
      submissionStore,
      'fetchSubmissions'
    )
    const submission = deepCopyAny(
      submissions.data.content[0]
    )

    await submissionStore.updateSubmission(submission, {
      state: EntityModelSubmissionDtoStateEnum.CANCELLED
    })

    expect(spy).toBeCalled()
    expect(submissionStore.submissions).toStrictEqual(
      submissions.data.content
    )
  })
})

const failingServer = setupServer(
  http.get(
    'http://localhost:8017/api/v2/manager/submissions',
    () => {
      return new HttpResponse(null, {
        status: 403
      })
    }
  ),
  http.patch(
    'http://localhost:8017/api/v2/manager/r/submissions/:submission_id',
    () => {
      return new HttpResponse(null, {
        status: 403
      })
    }
  ),
  http.get(
    'http://localhost:8017/api/v2/manager/users/me',
    () => {
      return HttpResponse.json(me)
    }
  )
)

describe('Testing submissions store with failing backend', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    failingServer.listen()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => failingServer.close())

  it('Fetch submissions', async () => {
    const submissionStore = useSubmissionStore()

    vi.mock('vue3-toastify')
    const notify = await import('vue3-toastify')

    await submissionStore.fetchSubmissions()

    expect(submissionStore.submissions).toStrictEqual([])
    // expect(notify).toBeCalled()
  })

  it('Update submissions', async () => {
    const submissionStore = useSubmissionStore()
    const spy = vi.spyOn(
      submissionStore,
      'fetchSubmissions'
    )

    vi.mock('vue3-toastify')
    const notify = await import('vue3-toastify')

    const submission = deepCopyAny(
      submissions.data.content[0]
    )

    await submissionStore.updateSubmission(submission, {
      state: EntityModelSubmissionDtoStateEnum.CANCELLED
    })

    expect(spy).toBeCalledTimes(1)
    // expect(wrapper.text()).toContain('')
    expect(submissionStore.submissions).toStrictEqual([])
  })
})
