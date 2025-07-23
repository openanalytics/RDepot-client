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

import { useCommonStore } from '@/store/options/common'
import { AxiosError, AxiosResponse } from 'axios'
import { Link, PageMetadata } from '@/openapi'
import { getHeaders } from './apiConfig'
import { ResponseDtoObject } from '@/openapi/models'
import { useAuthorizationStore } from '@/store/options/authorization'
import { useBlob } from '@/composable/blob'
import { useToast } from '@/composable/toasts'
import { i18n } from '@/plugins/i18n'
import { BackendError } from '@/models/errors/BackendError'
import router from '@/plugins/router'

export async function openApiRequest<T>(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  callback: Function,
  parameters?: any[],
  showProgress = false,
  blob = false,
  open = false,
  fileName = '',
  ifToast = true
): Promise<validatedData<T>> {
  if (showProgress) {
    turnOnProgress()
  }
  if (parameters) {
    if (blob) {
      return callback(...parameters, await getHeaders(blob))
        .then((result: AxiosResponse<Blob>) => {
          resolvedBlob(result, open, fileName)
        })
        .catch((error: AxiosError) => rejected(error))
    } else {
      return callback(...parameters, await getHeaders())
        .then((result: AxiosResponse<ResponseDtoObject>) =>
          resolved(result, ifToast)
        )
        .catch((error: AxiosError) => rejected(error))
    }
  } else {
    return callback(await getHeaders()).then(
      resolved,
      rejected
    )
  }
}

function turnOnProgress() {
  const commonStore = useCommonStore()
  commonStore.progressCircularActive = true
}

async function resolvedBlob(
  result: AxiosResponse<Blob>,
  open = false,
  fileName = ''
): Promise<validatedData<any>> {
  const blob = useBlob()
  switch (result.data.type) {
    case 'application/pdf':
      // for manual
      if (open === true) {
        blob.openBlob(result.data, 'pdf')
      } else {
        blob.downloadBlob(
          result.data,
          '.pdf',
          result.config.url,
          fileName
        )
      }
      break
    case 'text/html':
      // for *html vignette
      if (open === true) {
        blob.openBlob(result.data, 'html')
      } else {
        blob.downloadBlob(
          result.data,
          '.html',
          result.config.url
        )
      }
      break
    case 'application/gzip':
      // for source files
      blob.downloadBlob(
        result.data,
        '.tar.gz',
        result.config.url
      )
      break
    default:
      break
  }
  const commonStore = useCommonStore()
  commonStore.progressCircularActive = false
  return validateRequest([])
}

async function resolved(
  result: AxiosResponse<ResponseDtoObject>,
  ifToast = true
): Promise<validatedData<any>> {
  const commonStore = useCommonStore()
  commonStore.progressCircularActive = false
  if (ifToast) {
    const toasts = useToast()
    toasts.notifyAPISuccess(result)
  }
  const data = result.data.data?.content
    ? result.data.data?.content
    : result.data.data
  return validateRequest(
    data,
    result.data.data?.page,
    result.data.data?.links,
    result.data.status,
    result.data.messageCode
  )
}

async function rejected(
  result: AxiosError<BackendError | any>
) {
  const commonStore = useCommonStore()
  commonStore.progressCircularActive = false
  await errorsHandler(result)
  throw result
}

async function errorsHandler(
  error: AxiosError<BackendError | any>
) {
  const toasts = useToast()
  if (!error.response?.status) {
    toasts.error(i18n.t('errors.405'))
    const authorizationStore = useAuthorizationStore()
    authorizationStore.logout()
  } else {
    switch (error.response?.status) {
      case 304: {
        const authorizationStore = useAuthorizationStore()
        if (!(await authorizationStore.isUserLoggedIn())) {
          authorizationStore.logout()
        }
        break
      }
      case 401: {
        toasts.error(i18n.t('messages.errors.401'))
        const authorizationStore = useAuthorizationStore()
        authorizationStore.logout()
        break
      }
      case 403: {
        const authorizationStore = useAuthorizationStore()
        await authorizationStore.getUserInfo()
        break
      }
      case 404: {
        router.push({ name: 'pageNotFound' })
        break
      }
      case 405: {
        toasts.error(i18n.t('messages.errors.405'))
        const authorizationStore = useAuthorizationStore()
        authorizationStore.logout()
        break
      }
      case 422: {
        let errorMessage = error.response.data.message
        if (error.response.data.data[0]) {
          const newMessage = i18n.t(
            `backend.${error.response.data.data[0]}`
          )
          if (newMessage) {
            errorMessage = newMessage
          }
        }
        toasts.error(
          i18n.t('messages.errors.422') +
            '\n' +
            errorMessage
        )
        break
      }

      case 500: {
        if (error.response?.data) {
          toasts.error500(error)
        }
        break
      }
    }
  }
}

export interface Pagination {
  totalNumber: number
  page: number
  totalPages: number
}

export type validatedData<T> = [
  T,
  Pagination,
  Array<Link>,
  string,
  string
]

export function validateRequest<T>(
  content: T,
  paginationData?: PageMetadata,
  links?: Array<Link>,
  status?: string,
  messageCode?: string
): validatedData<T> {
  return [
    content,
    {
      page: paginationData?.number || 0,
      totalNumber: paginationData?.totalElements || 0,
      totalPages: paginationData?.totalPages || 0
    },
    links || [],
    status || 'undefined',
    messageCode || 'undefined'
  ]
}
