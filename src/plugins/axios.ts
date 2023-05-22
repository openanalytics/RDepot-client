/*
 *  R Depot
 *
 *  Copyright (C) 2012-2023 Open Analytics NV
 *
 *  ===========================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the Apache License as published by
 *  The Apache Software Foundation, either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  Apache License for more details.
 *
 *  You should have received a copy of the Apache License
 *  along with this program. If not, see <http://www.apache.org/licenses/>
 *
 */

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

function showProgress(active: boolean) {
  const common_store = useCommonStore()
  common_store.setProgressCircularActive(active)
}

api.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    showProgress(true)
    const multipart = localStorage.getItem('multipart')
    let token = null
    config.headers = { ...config.headers } as AxiosHeaders
    if (token) {
      config.headers.set('Authorization', `Token ${token}`)
    } else {
      token = localStorage.getItem('vue-token')
      config.headers.set('Authorization', `Token ${token}`)
    }

    config.headers.set('AccessControlAllowOrigin', '*')

    if (multipart == 'true') {
      config.headers.set(
        'Content-Type',
        'multipart/form-data'
      )
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
