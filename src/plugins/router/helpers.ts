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
import { useOIDCAuthorization } from '@/composable/auth/oidcAuthorization'
import { usePackagesStore } from '@/store/packages'
import { useAuthorizationStore } from '@/store/authorization'
import { Technologies } from '@/enum/Technologies'
import { usePackageDetailsStore } from '@/store/package_details'
import { usePagination } from '@/store/pagination'
import { useSortStore } from '@/store/sort'
import { useCommonStore } from '@/store/common'
import { useUserStore } from '@/store/users'
import { useConfigStore } from '@/store/config'

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
    repository: [name],
    deleted: false
  })
}

export async function redirectToLoginPage() {
  return '/login'
}

export function resetStoreValues() {
  const pagination = usePagination()
  const sort = useSortStore()
  pagination.resetPage()
  sort.reset()
}

export async function handleAuthorization() {
  await authService
    .handleLoginRedirect()
    .then(async () => {
      window.history.replaceState(
        {},
        window.document.title,
        window.location.origin + window.location.pathname
      )
      const authorizationStore = useAuthorizationStore()
      if (!authorizationStore.me.role) {
        await authorizationStore.postLoginOperations()
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function handleLogout() {
  const { isOIDCAuthAvailable } = useOIDCAuthorization()
  if (isOIDCAuthAvailable()) {
    authService
      .handleLogoutRedirect()
      .then(() => {
        window.history.replaceState(
          {},
          window.document.title,
          window.location.origin + window.location.pathname
        )
        localStorage.removeItem('authorizationStore')
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export function getDefaultFiltration(to: any) {
  const sortStore = useSortStore()
  const commonStore = useCommonStore()
  switch (to.name) {
    case 'repositoryMaintainers':
    case 'packageMaintainers':
      sortStore.setDefaultFields('user.name', 'asc')
      sortStore.resetSort()
      commonStore.activeId = 'user.name'
      break
    case 'packages':
    case 'repositories':
    case 'users':
      sortStore.setDefaultFields('name', 'asc')
      sortStore.resetSort()
      commonStore.activeId = 'name'
      break
    case 'submissions':
      sortStore.setDefaultFields('state', 'desc')
      sortStore.resetSort()
      commonStore.activeId = 'state'
      break
    default:
      break
  }
}

export async function prepareStores(to: any, from: any) {
  switch (to.name) {
    case 'packageDetails':
      await loadPackageDetails(
        Number(to.params.id),
        to.params.technology as Technologies
      )
      break
    case 'repositoryDetails':
      await loadRepositoryDetails(String(to.params.name))
      break
    case 'users':
      useUserStore().clearFiltration()
      break
    case 'packages':
      if (from.name === 'packageMaintainers') {
        usePackagesStore().clearFiltration()
      }
      break
    default:
      break
  }
}

export async function checkAuthorization(to: any) {
  const authorizationStore = useAuthorizationStore()
  authorizationStore.getUserSettings()
  if (to.fullPath.startsWith('/auth')) {
    await handleAuthorization()
    getDefaultFiltration(to)
    return '/packages'
  } else if (to.fullPath.startsWith('/logout')) {
    handleLogout()
    return '/'
  } else if (to.name != 'login') {
    return await authorizeInternalPath(to)
  } else if (to.name == 'login') {
    if (await authorizationStore.isUserLoggedIn()) {
      const configStore = useConfigStore()
      await configStore.fetchConfiguration()
      return '/packages'
    }
  }
}

export async function authorizeInternalPath(to: any) {
  const authorizationStore = useAuthorizationStore()
  if (!(await authorizationStore.isUserLoggedIn())) {
    return redirectToLoginPage()
  }
  if (!authorizationStore.me.role) {
    await authorizationStore.postLoginOperations()
  } else {
    const configStore = useConfigStore()
    await configStore.fetchConfiguration()
  }
  const canRedirect = authorizationStore.checkUserAbility(
    to.name || ' '
  )
  if (!canRedirect) {
    return '/packages'
  }
  return undefined
}
