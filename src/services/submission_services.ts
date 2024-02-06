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

import { SubmissionsFiltration } from '@/models/Filtration'
import {
  ApiV2SubmissionControllerApiFactory,
  EntityModelSubmissionDto,
  PythonSubmissionControllerApiFactory,
  RSubmissionControllerApiFactory
} from '@/openapi'
import {
  openApiRequest,
  validatedData,
  validateRequest
} from './open_api_access'
import { createPatch } from 'rfc6902'
import { useSortStore } from '@/store/sort'
import { isAuthorized } from '@/plugins/casl'
import { Technologies } from '@/enum/Technologies'
import { getConfiguration } from './api_config'

type ValidatedSumbissions = Promise<
  validatedData<EntityModelSubmissionDto[]>
>

type ValidatedSumbission = Promise<
  validatedData<EntityModelSubmissionDto>
>

export async function fetchSubmissions(
  filtration: SubmissionsFiltration,
  logged_user_id?: number,
  page?: number,
  pageSize?: number,
  showProgress = true
): ValidatedSumbissions {
  if (!isAuthorized('GET', 'submissions')) {
    return new Promise(() => validateRequest([]))
  }
  const sort = useSortStore()
  let sortBy = sort.getSortBy()
  if (sort.field == 'name') {
    sortBy = ['packageBag,' + sort.direction]
  }
  return openApiRequest<EntityModelSubmissionDto[]>(
    ApiV2SubmissionControllerApiFactory().getAllSubmissions,
    [
      page,
      pageSize,
      sortBy,
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
): ValidatedSumbission {
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

export async function addSubmission(
  repository: string,
  technology: string,
  file: File,
  generateManual?: boolean
): ValidatedSumbission {
  if (!isAuthorized('POST', 'submissions')) {
    return new Promise(() => false)
  }

  let submissionApi

  if (technology === Technologies.enum.R) {
    submissionApi = RSubmissionControllerApiFactory(
      await getConfiguration()
    ).submitRPacakgeForm
  } else if (technology === Technologies.enum.Python) {
    submissionApi = PythonSubmissionControllerApiFactory(
      await getConfiguration()
    ).submitPythonPackageForm
  } else {
    return new Promise(() => false)
  }

  return openApiRequest<EntityModelSubmissionDto>(
    submissionApi,
    [repository, file, generateManual, false],
    false
  ).catch(() => {
    return validateRequest({})
  })
}

export function fetchSubmission(
  id: number
): ValidatedSumbission {
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
