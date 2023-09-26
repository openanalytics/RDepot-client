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

import {
  EntityModelSubmissionDto,
  EntityModelSubmissionDtoStateEnum
} from '@/openapi'
import { useSubmissionStore } from '@/store/submission'

export function useSubmissionActions() {
  async function acceptSubmission(
    submission?: EntityModelSubmissionDto
  ) {
    changeSubmissionState(
      EntityModelSubmissionDtoStateEnum.ACCEPTED,
      submission
    )
  }

  async function rejectSubmission(
    submission?: EntityModelSubmissionDto
  ) {
    changeSubmissionState(
      EntityModelSubmissionDtoStateEnum.REJECTED,
      submission
    )
  }

  async function cancelSubmission(
    submission?: EntityModelSubmissionDto
  ) {
    changeSubmissionState(
      EntityModelSubmissionDtoStateEnum.CANCELLED,
      submission
    )
  }

  async function changeSubmissionState(
    state: EntityModelSubmissionDtoStateEnum,
    submission?: EntityModelSubmissionDto
  ) {
    const submissionStore = useSubmissionStore()
    if (submission) {
      await submissionStore.updateSubmission(submission, {
        state: state
      })
    }
  }

  return {
    acceptSubmission,
    rejectSubmission,
    cancelSubmission
  }
}
