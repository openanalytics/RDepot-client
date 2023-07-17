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

import {
  User,
  UserManager,
  WebStorageStateStore
} from 'oidc-client-ts'
import {
  fireUserLoggedInEvent,
  fireUserLoggedOutEvent
} from './eventsBus'

/**
 * Config for the oidc client.
 */
const settings = {
  userStore: new WebStorageStateStore({
    store: window.localStorage
  }),
  authority: 'http://192.168.49.17:8080/auth/realms/RDepot',
  client_id: 'oa-rdepot-app',
  redirect_uri: 'http://localhost:3001/auth',
  post_logout_redirect_uri: 'http://localhost:3001/logout',
  response_type: 'code',
  scope: 'openid',
  filterProtocolClaims: true
}

const userManager = new UserManager(settings)

export class AuthService {
  getUserManager() {
    console.log(userManager)
  }

  login() {
    userManager
      .signinRedirect()
      .catch((error) => console.log(error))
  }

  logout() {
    userManager
      .signoutRedirect()
      .then(() => console.log('User logged out'))
      .catch((error) => console.log(error))
  }

  handleLoginRedirect() {
    return userManager.signinRedirectCallback()
  }

  handleLogoutRedirect() {
    userManager.signinRedirectCallback()
  }

  isUserLoggedIn() {
    return new Promise<boolean>((resolve, reject) => {
      userManager
        .getUser()
        .then((user: User | null) => {
          // console.log(user)
          if (user === null) {
            resolve(false)
          }
          resolve(true)
        })
        .catch((error) => reject(error))
    })
  }

  // getProfile() {
  //   return new Promise<Profile | null>(
  //     (resolve, reject) => {
  //       userManager
  //         .getUser()
  //         .then((user: User | null) => {
  //           if (user === null) {
  //             resolve(null)
  //           } else {
  //             resolve(user.profile)
  //           }
  //         })
  //         .catch((error) => reject(error))
  //     }
  //   )
  // }

  getAccessToken() {
    return new Promise<string>((resolve, reject) => {
      userManager
        .getUser()
        .then((user: User | null) => {
          if (user != null) {
            resolve(user.access_token)
          }
        })
        .catch((error) => reject(error))
    })
  }
}

userManager.events.addUserLoaded((user) => {
  fireUserLoggedInEvent()
})

userManager.events.addUserSignedOut(() =>
  fireUserLoggedOutEvent()
)

export const authService = new AuthService()
