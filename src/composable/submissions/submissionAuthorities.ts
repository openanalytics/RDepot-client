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

import { SubmissionEditOptions } from '@/enum/SubmissionEditOptions'
import {
  EntityModelSubmissionDto,
  EntityModelSubmissionDtoStateEnum
} from '@/openapi'
import { useAuthorizationStore } from '@/store/options/authorization'
import { useUserAuthorities } from '../authorities/userAuthorities'
import { EditSubmissionWarnings } from '@/store/options/submission'

export function useSubmissionAuthorizationCheck() {
  function canChangeState(
    submission?: EntityModelSubmissionDto,
    editOption?: SubmissionEditOptions
  ) {
    return (
      isAuthorizedToChangeState(submission, editOption) &&
      isStateMutableField(submission)
    )
  }

  function isAuthorizedToChangeState(
    submission?: EntityModelSubmissionDto,
    editOption?: SubmissionEditOptions
  ) {
    switch (editOption) {
      case SubmissionEditOptions.Enum.accept: {
        return isAuthorizedToAcceptAndReject(submission)
      }
      case SubmissionEditOptions.Enum.reject: {
        return isAuthorizedToAcceptAndReject(submission)
      }
      case SubmissionEditOptions.Enum.cancel: {
        return isAuthorizedToCancel(submission)
      }
      case SubmissionEditOptions.Enum.download: {
        return (
          isAuthorizedToDownload(submission) ||
          submission?.state ===
            EntityModelSubmissionDtoStateEnum.ACCEPTED
        )
      }
      default: {
        return
      }
    }
  }

  function isStateMutableField(
    submission?: EntityModelSubmissionDto
  ) {
    return (
      submission?.state ==
      EntityModelSubmissionDtoStateEnum.WAITING
    )
  }

  function isAuthorizedToCancel(
    submission?: EntityModelSubmissionDto
  ) {
    const authorizationStore = useAuthorizationStore()
    const { canPatch } = useUserAuthorities()
    return (
      authorizationStore.me?.id ==
        submission?.submitter?.id &&
      canPatch(submission?.links, 'state')
    )
  }

  function isAuthorizedToDownload(
    submission?: EntityModelSubmissionDto
  ) {
    const { canPatch } = useUserAuthorities()
    return canPatch(submission?.links, 'state')
  }

  function isAuthorizedToAcceptAndReject(
    submission?: EntityModelSubmissionDto
  ) {
    const authorizationStore = useAuthorizationStore()
    const { canPatch } = useUserAuthorities()
    return (
      authorizationStore.me?.id !=
        submission?.submitter?.id &&
      canPatch(submission?.links, 'state')
    )
  }

  function getNotMutableState(
    submissions: EntityModelSubmissionDto[]
  ) {
    return submissions.filter(
      (submission) => !isStateMutableField(submission)
    )
  }

  function getNotToDownloadSubmissions(
    submissions: EntityModelSubmissionDto[]
  ) {
    return submissions.filter(
      (submission) =>
        submission.state !=
          EntityModelSubmissionDtoStateEnum.ACCEPTED &&
        submission.state !=
          EntityModelSubmissionDtoStateEnum.WAITING
    )
  }

  function getNotAuthorizedToModifyAndHasMutableState(
    submissions: EntityModelSubmissionDto[],
    editOption?: SubmissionEditOptions
  ) {
    return submissions.filter(
      (submission) =>
        !isAuthorizedToChangeState(
          submission,
          editOption
        ) && isStateMutableField(submission)
    )
  }

  function getSubmissionsWarnings(
    submissions: EntityModelSubmissionDto[],
    editOption?: SubmissionEditOptions
  ): EditSubmissionWarnings {
    return {
      notAuthorizedToEditAndMutableState:
        getNotAuthorizedToModifyAndHasMutableState(
          submissions,
          editOption
        ),
      notMutableState:
        editOption == SubmissionEditOptions.enum.download
          ? getNotToDownloadSubmissions(submissions)
          : getNotMutableState(submissions)
    }
  }
  return {
    canChangeState,
    isStateMutableField,
    getSubmissionsWarnings,
    isAuthorizedToChangeState
  }
}
