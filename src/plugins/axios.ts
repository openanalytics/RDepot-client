import axios, {
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import { useCommonStore } from '@/store/common'

const api = axios.create({
  baseURL: 'http://localhost:8017/api',
  timeout: 6000
})

const common_store = useCommonStore()

function showProgress(active: boolean) {
  common_store.setProgressCircularActive(active)
}

api.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    showProgress(true)
    const multipart = localStorage.getItem('multipart')
    let token = null
    config.headers = { ...config.headers } as AxiosHeaders;
    if (token) {
      config.headers.set('Authorization', `Token ${token}`)
    } else {
      token = localStorage.getItem('vue-token')
      config.headers.set('Authorization', `Token ${token}`)
    }

    config.headers.set('AccessControlAllowOrigin','*')

    if (multipart == 'true') {
      config.headers.set('Content-Type','multipart/form-data')
      localStorage.setItem('multipart', 'false')
    }
    return config
  },
  function (error) {
    showProgress(false)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  function (response: AxiosResponse) {
    showProgress(false)
    return response
  },
  function (error) {
    showProgress(false)
    return Promise.reject(error)
  }
)

export default api
