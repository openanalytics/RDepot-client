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

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import { i18n } from '@/plugins/i18n'
import { useSortStore } from '@/store/sort'
import { authService } from '@/plugins/oauth'
import { useAuthorization } from '@/composable/authorization'
import { useUserStore } from '@/store/users'
import getEnv from '@/utils/env'
import { usePagination } from '@/store/pagination'

const DEFAULT_TITLE = i18n.t('common.projectTitle')

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
  const { isUserLoggedIn } = useAuthorization()
  const userStore = useUserStore()

  if (to.fullPath.startsWith('/auth')) {
    handleAuthorization()
    return '/packages'
  } else if (to.fullPath.startsWith('/logout')) {
    handleLogout()
    return '/'
  } else if (to.name != 'login') {
    var user: any = await isUserLoggedIn()

    if (
      !user &&
      !(
        userStore.userToken &&
        getEnv('VITE_LOGIN_SIMPLE') == 'true'
      )
    ) {
      return redirectToLoginPage()
    }
  }

  const pagination = usePagination()
  const sort = useSortStore()
  pagination.resetPage()
  sort.reset()
  document.title = to.meta.title
    ? (to.meta.title as string)
    : DEFAULT_TITLE
})

async function redirectToLoginPage() {
  const { isSimpleAuthAvailable, loginWithOICD } =
    useAuthorization()
  if (isSimpleAuthAvailable()) {
    return '/login'
  } else {
    loginWithOICD()
    return '/packages'
  }
}

function handleAuthorization() {
  if (authService)
    authService
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

async function handleLogout() {
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

export default router
