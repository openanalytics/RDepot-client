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

import { SubmissionEditOptions } from '@/enum/SubmissionEditOptions'
import {
  EntityModelSubmissionDto,
  EntityModelSubmissionDtoStateEnum
} from '@/openapi'
import { useSubmissionStore } from '@/store/options/submission'
import { useSubmissionAuthorizationCheck } from './submissionAuthorities'
import { usePackageDetailsStore } from '@/store/options/packageDetails'

export function useSubmissionActions() {
  async function editSubmission(
    submission?: EntityModelSubmissionDto,
    editOption?: SubmissionEditOptions
  ) {
    const { isAuthorizedToChangeState } =
      useSubmissionAuthorizationCheck()
    if (isAuthorizedToChangeState(submission, editOption)) {
      switch (editOption) {
        case SubmissionEditOptions.Enum.accept: {
          return acceptSubmission(submission)
        }
        case SubmissionEditOptions.Enum.reject: {
          return rejectSubmission(submission)
        }
        case SubmissionEditOptions.Enum.cancel: {
          return cancelSubmission(submission)
        }
        case SubmissionEditOptions.Enum.download: {
          return downloadSubmission(submission)
        }
        default: {
          return
        }
      }
    } else return
  }

  async function acceptSubmission(
    submission?: EntityModelSubmissionDto
  ) {
    return changeSubmissionState(
      EntityModelSubmissionDtoStateEnum.ACCEPTED,
      submission
    )
  }

  async function downloadSubmission(
    submission?: EntityModelSubmissionDto
  ) {
    if (submission && submission.packageBag) {
      const packageDetailsStore = usePackageDetailsStore()
      await packageDetailsStore.getSourceFile(
        submission.packageBag?.id?.toString() || '',
        submission.packageBag?.name || '',
        submission.packageBag?.version || '',
        submission.packageBag?.technology || ''
      )
    }
  }

  async function downloadSubmissions(
    submissions?: EntityModelSubmissionDto[]
  ) {
    submissions?.forEach(
      (submission: EntityModelSubmissionDto) =>
        async () => {
          if (submission && submission.packageBag) {
            const packageDetailsStore =
              usePackageDetailsStore()
            await packageDetailsStore.getSourceFile(
              submission.packageBag?.id?.toString() || '',
              submission.packageBag?.name || '',
              submission.packageBag?.version || '',
              submission.packageBag?.technology || ''
            )
          }
        }
    )
  }

  async function rejectSubmission(
    submission?: EntityModelSubmissionDto
  ) {
    return changeSubmissionState(
      EntityModelSubmissionDtoStateEnum.REJECTED,
      submission
    )
  }

  async function cancelSubmission(
    submission?: EntityModelSubmissionDto
  ) {
    return changeSubmissionState(
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
      return submissionStore.patch(submission, {
        state: state
      })
    }
  }

  return {
    editSubmission,
    acceptSubmission,
    rejectSubmission,
    cancelSubmission,
    downloadSubmission,
    downloadSubmissions
  }
}
