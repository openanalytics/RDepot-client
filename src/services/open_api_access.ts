import { useCommonStore } from '@/store/common'
import { AxiosResponse } from 'axios'

let common_store = useCommonStore()

var isPending = true

export function openApiRequest<T>(callback: Function) {
  turnOnProgress()
  isPending = true
  let promise: Promise<AxiosResponse<T>> = callback()
  promise.then(resolved, rejected)
  return promise
}

function turnOnProgress() {
  // setTimeout(() => {
  // if (isPending) {
  common_store.setProgressCircularActive(true)
  // }
  // }, 250)
}

async function resolved<T>(result: AxiosResponse<T>) {
  isPending = false
  common_store.setProgressCircularActive(false)
  return result
}

function rejected(result: AxiosResponse<any, any>) {
  common_store.setProgressCircularActive(false)
  isPending = false
  throw result
}
