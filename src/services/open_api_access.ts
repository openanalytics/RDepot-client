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
import { AxiosResponse } from 'axios'
import { Link, PageMetadata } from '@/openapi'

export function openApiRequest<T>(
  callback: Function,
  parameters?: any[],
  showProgress = true
): Promise<AxiosResponse<T>> {
  if (showProgress) {
    turnOnProgress()
  }
  if (parameters) {
    return callback(...parameters).then(resolved, rejected)
  } else {
    return callback().then(resolved, rejected)
  }
}

function turnOnProgress() {
  const common_store = useCommonStore()
  common_store.setProgressCircularActive(true)
}

async function resolved<T>(result: AxiosResponse<T>) {
  const common_store = useCommonStore()
  common_store.setProgressCircularActive(false)
  return result
}

function rejected(result: AxiosResponse<any, any>) {
  const common_store = useCommonStore()
  common_store.setProgressCircularActive(false)
  throw result
}

export interface Pagination {
  totalNumber: number
  page: number
}

export type validatedData<T> = [
  T[],
  Pagination,
  Array<Link>
]

export function validateRequest<T>(
  content?: T[],
  paginationData?: PageMetadata,
  links?: Array<Link>
): validatedData<T> {
  return [
    content || [],
    {
      page: paginationData?.number || 0,
      totalNumber: paginationData?.totalElements || 0
    },
    links || []
  ]
}
