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

import { SubmissionsFiltration } from '@/models/Filtration'
import {
  ApiV2SubmissionControllerApiFactory,
  EntityModelSubmissionDto,
  RPublicConfigurationDto,
  PythonSubmissionControllerApiFactory,
  RConfigControllerApiFactory,
  RSubmissionControllerApiFactory
} from '@/openapi'
import {
  openApiRequest,
  validatedData,
  validateRequest
} from './openApiAccess'
import { createPatch } from 'rfc6902'
import { isAuthorized } from '@/plugins/casl'
import { Technologies } from '@/enum/Technologies'
import { getConfiguration } from './apiConfig'

type ValidatedSubmissions = Promise<
  validatedData<EntityModelSubmissionDto[]>
>

type ValidatedSubmission = Promise<
  validatedData<EntityModelSubmissionDto>
>

type ValidatedRConfiguration = Promise<
  validatedData<RPublicConfigurationDto>
>

export async function fetchSubmissionsService(
  filtration: SubmissionsFiltration,
  page?: number,
  pageSize?: number,
  sort?: string[],
  showProgress = false
): ValidatedSubmissions {
  if (!isAuthorized('GET', 'submissions')) {
    return new Promise(() => validateRequest([]))
  }
  return openApiRequest<EntityModelSubmissionDto[]>(
    ApiV2SubmissionControllerApiFactory().getAllSubmissions,
    [
      page,
      pageSize,
      sort,
      filtration?.state,
      filtration?.technologies,
      filtration?.repository,
      filtration?.fromDate,
      filtration?.toDate,
      filtration?.search
    ],
    showProgress
  ).catch(() => {
    return validateRequest([])
  })
}

export async function updateSubmission(
  oldSubmission: EntityModelSubmissionDto,
  newSubmission: EntityModelSubmissionDto
): ValidatedSubmission {
  if (!isAuthorized('PATCH', 'submissions')) {
    return new Promise(() => false)
  }

  const patch_body = createPatch(
    oldSubmission,
    newSubmission
  )
  if (oldSubmission.technology === Technologies.enum.R) {
    return openApiRequest<EntityModelSubmissionDto>(
      RSubmissionControllerApiFactory().updateRSubmission,
      [patch_body, oldSubmission.id!]
    ).catch(() => {
      return validateRequest({})
    })
  } else if (
    oldSubmission.technology === Technologies.enum.Python
  ) {
    return openApiRequest<EntityModelSubmissionDto>(
      PythonSubmissionControllerApiFactory()
        .updatePythonSubmission,
      [patch_body, oldSubmission.id!]
    ).catch(() => {
      return validateRequest({})
    })
  } else {
    // Should never happen expect if a new technology is added
    throw {
      name: 'NotImplemetedError',
      message:
        'Updating of "' +
        oldSubmission.technology +
        '" not implemented!'
    }
  }
}

export async function addRSubmission(
  repository: string,
  file: File,
  generateManual?: boolean,
  replace?: boolean,
  binary?: boolean,
  rVersion?: string,
  architecture?: string,
  distribution?: string,
  note?: string
): ValidatedSubmission {
  if (!isAuthorized('POST', 'submissions')) {
    return new Promise(() => false)
  }

  const submissionApi = RSubmissionControllerApiFactory(
    await getConfiguration()
  ).submitRPackageForm

  return openApiRequest<EntityModelSubmissionDto>(
    submissionApi,
    [
      repository,
      file,
      generateManual,
      replace,
      binary,
      rVersion,
      architecture,
      distribution,
      note
    ],
    false,
    undefined,
    undefined,
    undefined,
    false
  )
}

export async function addPythonSubmission(
  repository: string,
  file: File,
  replace?: boolean,
  binary?: boolean,
  note?: string
): ValidatedSubmission {
  if (!isAuthorized('POST', 'submissions')) {
    return new Promise(() => false)
  }
  const submissionApi =
    PythonSubmissionControllerApiFactory(
      await getConfiguration()
    ).submitPythonPackageForm

  return openApiRequest<EntityModelSubmissionDto>(
    submissionApi,
    [repository, file, replace, binary, note],
    false,
    undefined,
    undefined,
    undefined,
    false
  )
}

export function fetchSubmission(
  id: number
): ValidatedSubmission {
  if (!isAuthorized('GET', 'submissions')) {
    return new Promise(() => {})
  }

  return openApiRequest<EntityModelSubmissionDto>(
    ApiV2SubmissionControllerApiFactory().getSubmissionById,
    [id]
  ).catch(() => {
    return validateRequest({})
  })
}

export function getRConfigurationService(): ValidatedRConfiguration {
  if (!isAuthorized('GET', 'submissions')) {
    return new Promise(() => {})
  }
  return openApiRequest<RPublicConfigurationDto>(
    RConfigControllerApiFactory().getRPublicConfig
  )
}
