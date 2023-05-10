import { useCommonStore } from '@/store/common'
import { AxiosResponse } from 'axios'
import { Link, PageMetadata } from '@/openapi'

var isPending = true

export function openApiRequest<T>(
  callback: Function,
  parameters?: any[],
  showProgress: boolean = true
): Promise<AxiosResponse<T>> {
  if (showProgress) {
    turnOnProgress()
  }
  isPending = true
  if (parameters) {
    return callback(...parameters).then(resolved, rejected)
  } else {
    return callback().then(resolved, rejected)
  }
}

function turnOnProgress() {
  let common_store = useCommonStore()
  common_store.setProgressCircularActive(true)
}

async function resolved<T>(result: AxiosResponse<T>) {
  isPending = false
  let common_store = useCommonStore()
  common_store.setProgressCircularActive(false)
  return result
}

function rejected(result: AxiosResponse<any, any>) {
  let common_store = useCommonStore()
  common_store.setProgressCircularActive(false)
  isPending = false
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
