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

import Keycloak from 'keycloak-js'
import { LoginType } from '@/enum/LoginType'
import { getCurrentInstance } from 'vue'

const options = {
  url: 'http://192.168.49.17:8080/auth',
  realm: 'RDepot',
  clientId: 'oa-rdepot-vue-client',
  responsType: 'code',
  redirectUri: 'http://localhost:3000',
  state: '4dfe4cff-7cc2-446d-8f6a-581dc04eff90',
  login: 'true',
  scope: 'openid',
  onLoad: 'login-required'
}

const keycloak = new Keycloak(options)

export async function updateToken() {
  const app = getCurrentInstance()

  app?.appContext.config.globalProperties.$keycloak
    .updateToken(70)
    .then((refreshed: string) => {
      if (refreshed) {
        console.log('Token refreshed' + refreshed)
      } else {
        console.log(
          'Token not refreshed, valid for ' +
            Math.round(
              keycloak.tokenParsed!.exp! +
                keycloak.timeSkew! -
                new Date().getTime() / 1000
            ) +
            ' seconds'
        )
      }
    })
    .catch(() => {
      console.log('Failed to refresh token')
    })
}

export async function initKeycloak() {
  keycloak
    .init({
      onLoad: 'login-required',
      checkLoginIframe: false
    })
    .then((auth: any) => {
      localStorage.setItem(
        'authorizationType',
        LoginType.enum.KEYCLOAK
      )
      if (!auth) {
        window.location.reload()
      }
      setInterval(() => {
        updateToken()
      }, 6000)
    })
    .catch((e: string) => {
      alert('Login Failure ' + e)
    })
}

export default keycloak
