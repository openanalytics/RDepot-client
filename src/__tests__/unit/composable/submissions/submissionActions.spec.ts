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

import { createPinia, setActivePinia } from 'pinia'
import {
  EntityModelSubmissionDto,
  EntityModelSubmissionDtoStateEnum
} from '@/openapi'
import { useSubmissionStore } from '@/store/submission'
import { useSubmissionActions } from '@/composable/submissions/submissionActions'
import submissions from '@/__tests__/unit/config/mockData/submissions.json'
import { useMeStore } from '@/store/me'

let submissionStore: any
let submission: EntityModelSubmissionDto

beforeEach(async () => {
  setActivePinia(createPinia())
  submissionStore = useSubmissionStore()
  submission = submissions.data
    .content[0] as EntityModelSubmissionDto
  const meStore = useMeStore()
  meStore.me.role = 'admin'
})

describe('submission actions composable', () => {
  it('should accept submission', () => {
    const { acceptSubmission } = useSubmissionActions()
    const spy = vi.spyOn(
      submissionStore,
      'updateSubmission'
    )
    acceptSubmission(submission)
    expect(spy).toBeCalledWith(submission, {
      state: EntityModelSubmissionDtoStateEnum.ACCEPTED
    })
  })

  it('should reject submission', () => {
    const { rejectSubmission } = useSubmissionActions()
    const spy = vi.spyOn(
      submissionStore,
      'updateSubmission'
    )
    rejectSubmission(submission)
    expect(spy).toBeCalledWith(submission, {
      state: EntityModelSubmissionDtoStateEnum.REJECTED
    })
  })

  it('should cancel submission', () => {
    const { cancelSubmission } = useSubmissionActions()
    const spy = vi.spyOn(
      submissionStore,
      'updateSubmission'
    )
    cancelSubmission(submission)
    expect(spy).toBeCalledWith(submission, {
      state: EntityModelSubmissionDtoStateEnum.CANCELLED
    })
  })
})
