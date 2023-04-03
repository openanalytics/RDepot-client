import { useCommonStore } from '@/store/common'
import { AxiosResponse } from 'axios'

var isPending = true

export function openApiRequest<T>(
  callback: Function,
  parameters?: any[]
): Promise<AxiosResponse<T>> {
  turnOnProgress()
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
