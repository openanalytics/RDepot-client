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

import Keycloak from 'keycloak-js'

const options = {
  url: 'http://192.168.49.17:8080/auth',
  realm: 'RDepot',
  clientId: 'oa-rdepot-app',
  responseType: 'id_token token',
  redirectUri: 'http://localhost:3001',
  state: '-7cc2-446d-8f6a-581dc04eff90',
  login: 'true',
  scope: 'openid',
  onLoad: 'login-required'
}

// const keycloak = new Keycloak(options)

// export async function updateToken() {
//   const app = getCurrentInstance()

//   app?.appContext.config.globalProperties.$keycloak
//     .updateToken(70)
//     .then((refreshed: string) => {
//       if (refreshed) {
//         console.log('Token refreshed' + refreshed)
//       } else {
//         console.log(
//           'Token not refreshed, valid for ' +
//             Math.round(
//               keycloak.tokenParsed!.exp! +
//                 keycloak.timeSkew! -
//                 new Date().getTime() / 1000
//             ) +
//             ' seconds'
//         )
//       }
//     })
//     .catch(() => {
//       console.log('Failed to refresh token')
//     })
// }

export async function initKeycloak() {
  // console.log(LoginType.enum.KEYCLOAK)
  // alert('keycloak  przed then:')
  const keycloak = new Keycloak(options)
  keycloak
    .init({
      // onLoad: 'login-required',
      checkLoginIframe: false,
      pkceMethod: 'S256'
      // enableLogging: true
    })
    .success(function (authenticated: any) {
      alert(
        authenticated
          ? 'authenticated'
          : 'not authenticated'
      )
      // alert(
      //   'keycloak:' + keycloak.token ? keycloak.token : ''
      // )
      // localStorage.setItem(
      //   'token',
      //   keycloak.token ? keycloak.token : 'NONE TOKEN'
      // )
      // localStorage.setItem('auth', auth)
      // if (!auth) {
      //   window.location.reload()
      // }
      // setInterval(() => {
      //   updateToken()
      // }, 6000)
    })
    .catch((e: string) => {
      alert('Login Failure ' + e)
    })
    .finally(() => {})
}

// export default keycloak
