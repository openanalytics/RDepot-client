import store from '@/store'
import axios, {
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8017/api',
  timeout: 6000
})

function showProgress(active: boolean) {
  store.dispatch('setProgressCircularActive', active)
}

api.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    showProgress(true)
    const multipart = localStorage.getItem('multipart')
    let token = null

    if (token) {
      config.headers!.Authorization = `Token ${token}`
    } else {
      token = localStorage.getItem('vue-token')
      config.headers!.Authorization = `Token ${token}`
    }

    config.headers!.AccessControlAllowOrigin = '*'

    if (multipart == 'true') {
      config.headers!['Content-Type'] =
        'multipart/form-data'
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
