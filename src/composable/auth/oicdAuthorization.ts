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

import { authService } from '@/plugins/oauth'

export function useOICDAuthorization() {
  async function login() {
    await authService.login()
  }

  async function logout() {
    await authService.logout()
  }

  function isOICDAuthAvailable() {
    return Boolean(
      JSON.parse(import.meta.env.VITE_LOGIN_OIDC)
    )
  }

  async function isUserLoggedInOICD() {
    return Boolean(
      isOICDAuthAvailable() && (await authService.getUser())
    )
  }

  return {
    login,
    logout,
    isUserLoggedInOICD,
    isOICDAuthAvailable
  }
}
