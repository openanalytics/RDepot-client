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

import { authService } from '@/plugins/oauth'
import { useSimpleAuthorization } from '@/composable/auth/simpleAuthorization'
import { useOICDAuthorization } from '@/composable/auth/oicdAuthorization'
import { usePackagesStore } from '@/store/packages'
import { useAuthorizationStore } from '@/store/authorization'
import { Technologies } from '@/enum/Technologies'
import { usePackageDetailsStore } from '@/store/package_details'

export async function loadPackageDetails(
  id: number,
  technology: Technologies
) {
  const packageDetailsStore = usePackageDetailsStore()
  return packageDetailsStore.fetchPackage(id, technology)
}

export async function loadRepositoryDetails(name: string) {
  const packageStore = usePackagesStore()
  return packageStore.fetchPackages({
    repository: name,
    deleted: false
  })
}

export async function redirectToLoginPage() {
  const { isSimpleAuthAvailable } = useSimpleAuthorization()
  const authorizationStore = useAuthorizationStore()
  if (isSimpleAuthAvailable()) {
    return '/login'
  } else {
    authorizationStore.login()
    return '/packages'
  }
}

export async function handleAuthorization() {
  await authService
    .handleLoginRedirect()
    .then(() => {
      window.history.replaceState(
        {},
        window.document.title,
        window.location.origin + window.location.pathname
      )
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function handleLogout() {
  const { isOICDAuthAvailable } = useOICDAuthorization()
  if (isOICDAuthAvailable()) {
    authService
      .handleLogoutRedirect()
      .then(() => {
        window.history.replaceState(
          {},
          window.document.title,
          window.location.origin + window.location.pathname
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
