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

import { Login } from '@/models/users/Login'
import { BASE_PATH } from '@/openapi/base'
import { notify } from '@kyvg/vue3-notification'
import axios from 'axios'

export function useSimpleAuthorization() {
  async function login(payload: Login) {
    logout()
    return await axios
      .post(BASE_PATH + '/login', {
        login: payload.username,
        password: payload.password
      })
      .then((res) => {
        notify({
          text: 'user succesfully logged in!',
          type: 'success'
        })
        localStorage.setItem(
          'simpleAuthToken',
          res.data.data.token
        )
        return res.data.data.token
      })
      .catch((err) => {
        notify({
          text:
            'login procedure failed, please try again (' +
            err +
            ' )',
          type: 'error'
        })
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
