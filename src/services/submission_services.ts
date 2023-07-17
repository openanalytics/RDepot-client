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
  ResponseDtoEntityModelSubmissionDto,
  ResponseDtoPagedModelEntityModelSubmissionDto,
  RSubmissionControllerApiFactory
} from '@/openapi'
import { AxiosResponse } from 'axios'
import { getConfiguration } from './api_config'
import {
  openApiRequest,
  validatedData,
  validateRequest
} from './open_api_access'
import { notify } from '@kyvg/vue3-notification'
import { createPatch } from 'rfc6902'
import { useSortStore } from '@/store/sort'
import { isAuthorized } from '@/plugins/casl'
import { Technologies } from '@/enum/Technologies'
import { z } from 'zod'

export function fetchSubmissions(
  filtration: SubmissionsFiltration,
  logged_user_id: number,
  page?: number,
  pageSize?: number
): Promise<validatedData<EntityModelSubmissionDto>> {
  if (!isAuthorized('GET', 'submissions')) {
    return new Promise(() => validateRequest())
  }
  const submission_api =
    ApiV2SubmissionControllerApiFactory(getConfiguration())
  const sort = useSortStore()
  if (sort.field == 'name') {
    sort.setField('packageBag')
  }
  return openApiRequest<ResponseDtoPagedModelEntityModelSubmissionDto>(
    submission_api.getAllSubmissions,
    [
      filtration.state,
      filtration.assignedToMe ? logged_user_id : undefined,
      filtration.package,
      undefined, // TODO: add technology filtering
      page,
      pageSize,
      sort.getSortBy()
    ]
  ).then(
    (res) =>
      validateRequest(
        res.data.data?.content,
        res.data.data?.page
      ),
    (msg) => {
      notify({ text: msg, type: 'error' })
      return validateRequest()
    }
  )
}

export function updateSubmission(
  oldSubmission: EntityModelSubmissionDto,
  newSubmission: EntityModelSubmissionDto,
  textNotification?: string
): Promise<boolean> {
  if (!isAuthorized('PATCH', 'submissions')) {
    return new Promise(() => false)
  }

  const patch_body = createPatch(
    oldSubmission,
    newSubmission
  )
  let request: Promise<AxiosResponse<any>>
  if (oldSubmission.technology === Technologies.enum.R) {
    const r_submission_api =
      RSubmissionControllerApiFactory(getConfiguration())

    request = openApiRequest<AxiosResponse<any>>(() =>
      r_submission_api.updateRSubmission(
        patch_body,
        oldSubmission.id!
      )
    )
  } else if (
    oldSubmission.technology === Technologies.enum.Python
  ) {
    const python_submission_api =
      PythonSubmissionControllerApiFactory(
        getConfiguration()
      )

    request = openApiRequest<AxiosResponse<any>>(() =>
      python_submission_api.updatePythonSubmission(
        patch_body,
        oldSubmission.id!
      )
    )
  } else {
    // Should never happen expect if a new technology is added
    request = z.NEVER
    throw {
      name: 'NotImplemetedError',
      message:
        "Updating of '" +
        oldSubmission.technology +
        "' not implemented!"
    }
  }
  return request.then(
    () => {
      notify({
        type: 'success',
        text: textNotification
      })
      return true
    },
    (msg) => {
      notify({
        type: 'error',
        text: msg
      })
      return false
    }
  )
}

export function addSubmission(
  repository: string,
  technology: string,
  file: File
): Promise<boolean> {
  if (!isAuthorized('POST', 'submissions')) {
    return new Promise(() => false)
  }

  let submission_api

  if (technology === Technologies.enum.R) {
    submission_api = RSubmissionControllerApiFactory(
      getConfiguration()
    ).submitRPacakgeForm
  } else if (technology === Technologies.enum.Python) {
    submission_api = PythonSubmissionControllerApiFactory(
      getConfiguration()
    ).submitPythonPackageForm
  } else {
    return new Promise(() => false)
  }

  return openApiRequest<AxiosResponse<any>>(
    submission_api,
    [repository, file]
  ).then(
    () => {
      return true
    },
    (msg) => {
      notify({
        type: 'error',
        text: msg
      })
      return false
    }
  )
}

export function fetchSubmission(
  id: number
): Promise<EntityModelSubmissionDto> {
  if (!isAuthorized('GET', 'submissions')) {
    return new Promise(() => {})
  }

  const submission_api =
    ApiV2SubmissionControllerApiFactory(getConfiguration())

  return openApiRequest<ResponseDtoEntityModelSubmissionDto>(
    submission_api.getSubmissionById,
    [id]
  ).then(
    (res) => {
      return res.data.data || {}
    },
    (msg) => {
      notify({
        type: 'error',
        text: msg
      })
      return {}
    }
  )
}
