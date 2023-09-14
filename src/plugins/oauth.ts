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

import { User, UserManager } from 'oidc-client-ts'
import {
  fireUserLoggedInEvent,
  fireUserLoggedOutEvent
} from './eventsBus'

/**
 * Config for the oidc client.
 */
const settings = {
  authority: import.meta.env.VITE_KEYCLOAK_REALM_URI,
  client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_KEYCLOAK_REDIRECT_URI,
  post_logout_redirect_uri: import.meta.env
    .VITE_KEYCLOAK_POST_LOGOUT_REDIRECT_URI,
  response_type: import.meta.env
    .VITE_KEYCLOAK_REPOSNSE_TYPE,
  scope: import.meta.env.VITE_KEYCLOAK_SCOPE,
  automaticSilentRenew: true
}

const userManager = new UserManager(settings)

export class AuthService {
  login(): Promise<void> {
    return userManager.signinRedirect()
  }

  logout(): Promise<void> {
    return userManager.signoutRedirect()
  }

  getUser(): Promise<User | null> {
    return userManager.getUser()
  }

  handleLoginRedirect() {
    return userManager.signinRedirectCallback()
  }

  handleLogoutRedirect() {
    return userManager.signoutRedirectCallback()
  }

  isUserLoggedIn() {
    return new Promise<boolean>((resolve, reject) => {
      userManager
        .getUser()
        .then((user: User | null) => {
          if (user === null) {
            resolve(false)
          }
          resolve(true)
        })
        .catch((error) => reject(error))
    })
  }

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

userManager.events.addUserLoaded(() => {
  fireUserLoggedInEvent()
})

userManager.events.addUserSignedOut(() => {
  fireUserLoggedOutEvent()
})

userManager.events.addAccessTokenExpired(() => {
  fireUserLoggedOutEvent()
})

export const authService = new AuthService()
