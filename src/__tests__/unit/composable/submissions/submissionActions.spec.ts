/*
 * R Depot
 *
 * Copyright (C) 2012-2024 Open Analytics NV
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

import {
  describe,
  it,
  expect,
  beforeEach,
  vi
} from 'vitest'

import { useSubmissionActions } from '@/composable/submissions/submissionActions'
import { EntityModelSubmissionDto } from '@/openapi'
import { createPinia, setActivePinia } from 'pinia'
import { useSubmissionStore } from '@/store/submission'
import { Technologies } from '@/enum/Technologies'
import { useAuthorizationStore } from '@/store/authorization'
import me from '@/__tests__/config/mockData/me.json'

let submissionsStore: any
let authorizationStore: any

beforeEach(async () => {
  setActivePinia(createPinia())
  submissionsStore = useSubmissionStore()
  authorizationStore = useAuthorizationStore()
  authorizationStore.me = me.data
})

describe('submissionActions', () => {
  it('should not change submission state if submission is not provided', async () => {
    const { acceptSubmission } = useSubmissionActions()
    const spy = vi.spyOn(submissionsStore, 'patch')
    await acceptSubmission()
    expect(spy).toBeCalledTimes(0)
  })

  it('should change submission state to REJECTED', async () => {
    const { rejectSubmission } = useSubmissionActions()
    const spy = vi.spyOn(submissionsStore, 'patch')
    const submission = {
      state: 'WAITING',
      technology: Technologies.Enum.Python
    } as EntityModelSubmissionDto
    await rejectSubmission(submission)
    expect(spy).toBeCalledTimes(1)
  })

  it('should change submission state to ACCEPTED', async () => {
    const { acceptSubmission } = useSubmissionActions()
    const spy = vi.spyOn(submissionsStore, 'patch')
    const submission = {
      state: 'WAITING',
      technology: Technologies.Enum.Python
    } as EntityModelSubmissionDto
    await acceptSubmission(submission)
    expect(spy).toBeCalledTimes(1)
  })

  it('should change submission state to WAITING', async () => {
    const { acceptSubmission } = useSubmissionActions()
    const spy = vi.spyOn(submissionsStore, 'patch')
    const submission = {
      state: 'WAITING',
      technology: Technologies.Enum.Python
    } as EntityModelSubmissionDto
    await acceptSubmission(submission)
    expect(spy).toBeCalledTimes(1)
  })
})
