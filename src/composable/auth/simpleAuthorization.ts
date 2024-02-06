/*
 * R Depot
 *
 * Copyright (C) 2012-2024 Open Analytics NV
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

import { Login } from '@/models/users/Login'
import { BASE_PATH } from '@/openapi/base'
import axios from 'axios'
import { useToast } from '@/composable/toasts'
import { i18n } from '@/plugins/i18n'

export function useSimpleAuthorization() {
  const toasts = useToast()
  async function login(payload: Login) {
    logout()
    return await axios
      .post(BASE_PATH + '/login', {
        login: payload.username,
        password: payload.password
      })
      .then((res) => {
        localStorage.setItem(
          'simpleAuthToken',
          res.data.data.token
        )
        toasts.success(i18n.t('authorization.success'))
        return res.data.data.token
      })
      .catch((err) => {
        toasts.error(i18n.t('authorization.error', [err]))
        return ''
      })
  }

  function logout() {
    localStorage.removeItem('simpleAuthToken')
  }

  function isSimpleAuthAvailable() {
    return Boolean(
      JSON.parse(import.meta.env.VITE_LOGIN_SIMPLE)
    )
  }

  function getTokenFromLocalStorage() {
    return localStorage.getItem('simpleAuthToken') || ''
  }

  return {
    login,
    logout,
    isSimpleAuthAvailable,
    getTokenFromLocalStorage
  }
}
