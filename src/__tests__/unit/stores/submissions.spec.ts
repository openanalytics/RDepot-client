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

import { createPinia, setActivePinia } from 'pinia'
import { useSubmissionStore } from '@/store/options/submission'
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'
import { EntityModelSubmissionDtoStateEnum } from '@/openapi'
import submissions from '@/__tests__/config/mockData/submissions.json'
import { useUtilities } from '@/composable/utilities'
import {
  defaultValues,
  SubmissionsFiltration
} from '@/models/Filtration'
import { useAuthorizationStore } from '@/store/options/authorization'
import { server } from '@/__tests__/config/backend/server'
import { failingServer } from '@/__tests__/config/backend/failingServer'

const { deepCopyAny } = useUtilities()

const defaultFiltration = defaultValues(
  SubmissionsFiltration
)

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

    expect(submissionStore.submissions).toStrictEqual([])
    expect(submissionStore.pending).toStrictEqual([])
    expect(submissionStore.filtration).toStrictEqual(
      defaultFiltration
    )
    expect(submissionStore.totalNumber).toEqual(0)
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
