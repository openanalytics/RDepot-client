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

import { useCommonStore } from '@/store/common'
import { AxiosError, AxiosResponse } from 'axios'
import { Link, PageMetadata } from '@/openapi'
import { notify } from '@kyvg/vue3-notification'
import { getHeaders } from './api_config'
import { i18n } from '@/plugins/i18n'
import { ResponseDtoObject } from '@/openapi/models'
import { useLoggedUserStore } from '@/store/logged_user'

export function openApiRequest<T>(
  callback: Function,
  parameters?: any[],
  showProgress = true
): Promise<validatedData<T>> {
  if (showProgress) {
    turnOnProgress()
  }
  console.log(parameters)
  if (parameters) {
    return callback(...parameters, getHeaders()).then(
      resolved,
      rejected
    )
  } else {
    return callback(getHeaders()).then(resolved, rejected)
  }
}

function turnOnProgress() {
  const commonStore = useCommonStore()
  commonStore.setProgressCircularActive(true)
}

async function resolved(
  result: AxiosResponse<ResponseDtoObject>
): Promise<validatedData<any>> {
  const common_store = useCommonStore()
  common_store.setProgressCircularActive(false)
  notify('success')
  const data = result.data.data?.content
    ? result.data.data?.content
    : result.data.data
  return validateRequest(
    data,
    result.data.data?.page,
    result.data.data?.links
  )
}

function rejected(result: AxiosError) {
  const common_store = useCommonStore()
  common_store.setProgressCircularActive(false)
  errorsHandler(result)
  throw result
}

function errorsHandler(error: AxiosError) {
  switch (error.response?.status) {
    case 401: {
      notify({
        title: '401',
        type: 'error',
        text: i18n.t('errors.401')
      })
      break
    }
    case 403: {
      const logged_user_store = useLoggedUserStore()
      logged_user_store.getUserInfo()
      break
    }

    case 422: {
      notify({
        title: '401',
        type: 'error',
        text: i18n.t('errors.422')
      })
      break
    }

    case 500: {
      notify({
        title: '500',
        type: 'error'
      })
      break
    }
  }
}

export interface Pagination {
  totalNumber: number
  page: number
}

export type validatedData<T> = [T, Pagination, Array<Link>]

export function validateRequest<T>(
  content: T,
  paginationData?: PageMetadata,
  links?: Array<Link>
): validatedData<T> {
  return [
    content,
    {
      page: paginationData?.number || 0,
      totalNumber: paginationData?.totalElements || 0
    },
    links || []
  ]
}
