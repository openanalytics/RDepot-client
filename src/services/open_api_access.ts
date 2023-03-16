import { useCommonStore } from '@/store/common'
import { AxiosResponse } from 'axios'

let common_store = useCommonStore()

export async function openApiRequest<T>(
  callback: Function
) {
  common_store.setProgressCircularActive(true)
  let promise: Promise<AxiosResponse<T>> = callback()
  promise.then(resolved, rejected)
  common_store.setProgressCircularActive(false)
  return promise
}

function resolved<T>(result: AxiosResponse<T>) {
  return result.data
}

function rejected(result: AxiosResponse<any, any>) {
  alert(result)
}
