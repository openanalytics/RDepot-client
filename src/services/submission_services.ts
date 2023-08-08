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

export function fetchSubmissions(
  filtration: SubmissionsFiltration,
  logged_user_id?: number,
  page?: number,
  pageSize?: number,
  showProgress = true
): Promise<validatedData<EntityModelSubmissionDto[]>> {
  if (!isAuthorized('GET', 'submissions')) {
    return new Promise(() => validateRequest)
  }
  const sort = useSortStore()
  let sortBy = sort.getSortBy()
  if (sort.field == 'name') {
    sortBy = ['packageBag,' + sort.direction]
  }
  return openApiRequest<EntityModelSubmissionDto[]>(
    ApiV2SubmissionControllerApiFactory().getAllSubmissions,
    [
      filtration?.state,
      filtration.assignedToMe ? logged_user_id : undefined,
      filtration?.package,
      undefined, // TODO: add technology filtering
      page,
      pageSize,
      sortBy
    ],
    showProgress
  )
}

export function updateSubmission(
  oldSubmission: EntityModelSubmissionDto,
  newSubmission: EntityModelSubmissionDto
): Promise<validatedData<EntityModelSubmissionDto>> {
  if (!isAuthorized('PATCH', 'submissions')) {
    return new Promise(() => false)
  }
  const patch_body = createPatch(
    oldSubmission,
    newSubmission
  )

  return openApiRequest<EntityModelSubmissionDto>(
    RSubmissionControllerApiFactory().updateRSubmission,
    [patch_body, oldSubmission.id!]
  )
}

export function addSubmission(
  repository: string,
  technology: string,
  file: File
): Promise<validatedData<EntityModelSubmissionDto>> {
  if (!isAuthorized('POST', 'submissions')) {
    return new Promise(() => false)
  }
  if (technology === Technologies.enum.R) {
    return openApiRequest<EntityModelSubmissionDto>(
      RSubmissionControllerApiFactory().submitRPacakgeForm,
      [repository, file]
    )
  } else if (technology === Technologies.enum.Python) {
    return openApiRequest<EntityModelSubmissionDto>(
      PythonSubmissionControllerApiFactory()
        .submitPythonPacakgeForm,
      [repository, file]
    )
  } else {
    return new Promise(() => false)
  }
}
