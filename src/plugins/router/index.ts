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

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/plugins/router/routes'
import { i18n } from '@/plugins/i18n'
import { useAuthorizationStore } from '@/store/authorization'
import { useMeStore } from '@/store/me'
import * as helper from '@/plugins/router/helpers'
import { Technologies } from '@/enum/Technologies'
import getEnv from '@/utils/env'
import { useUserStore } from '@/store/users'
import { usePackagesStore } from '@/store/packages'

const DEFAULT_TITLE = i18n.t('common.projectTitle')

const router = createRouter({
  history: createWebHistory(getEnv('VITE_URL_PREFIX')),
  routes
})

router.beforeEach(async (to) => {
  const authorizationStore = useAuthorizationStore()
  authorizationStore.getUserSettings()
  if (to.fullPath.startsWith('/auth')) {
    await helper.handleAuthorization()
    helper.hideSidebar(false)
    helper.getDefaultFiltration(to)
    return '/packages'
  } else if (to.fullPath.startsWith('/logout')) {
    helper.handleLogout()
    helper.hideSidebar(true)
    return '/'
  } else if (to.name != 'login') {
    if (!(await authorizationStore.isUserLoggedIn())) {
      helper.hideSidebar(true)
      return helper.redirectToLoginPage()
    }
    const meStore = useMeStore()
    if (!meStore.me.role) {
      await authorizationStore.postLoginOperations()
    }
    const canRedirect = authorizationStore.checkUserAbility(
      to.name || ' '
    )
    if (!canRedirect) {
      return '/packages'
    }
    helper.hideSidebar(false)
  } else if (to.name == 'login') {
    if (await authorizationStore.isUserLoggedIn()) {
      helper.hideSidebar(false)
      return '/packages'
    }
    helper.hideSidebar(true)
  }
  helper.resetStoreValues()
  document.title = to.meta.title
    ? (to.meta.title as string)
    : DEFAULT_TITLE
  helper.getDefaultFiltration(to)
})

router.beforeResolve(async (to, from) => {
  switch (to.name) {
    case 'packageDetails':
      await helper.loadPackageDetails(
        Number(to.params.id),
        to.params.technology as Technologies
      )
      break
    case 'repositoryDetails':
      await helper.loadRepositoryDetails(
        String(to.params.name)
      )
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
  return true
})

export default router
