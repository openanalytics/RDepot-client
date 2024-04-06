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
import * as helper from '@/plugins/router/helpers'
import { Technologies } from '@/enum/Technologies'
import getEnv from '@/utils/env'

const DEFAULT_TITLE = i18n.t('common.projectTitle')

const router = createRouter({
  history: createWebHistory(getEnv('VITE_URL_PREFIX')),
  routes
})

router.beforeEach(async (to) => {
  const authorizationStore = useAuthorizationStore()

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
    helper.hideSidebar(false)
    authorizationStore.getUserInfo()
  }
  helper.resetStoreValues()
  document.title = to.meta.title
    ? (to.meta.title as string)
    : DEFAULT_TITLE
  helper.getDefaultFiltration(to)
})

router.beforeResolve(async (to) => {
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
    default:
      break
  }
  return true
})

export default router
