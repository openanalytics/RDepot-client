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

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import { i18n } from '@/plugins/i18n'
import { usePaginationStore } from '@/store/pagination'
import { useSortStore } from '@/store/sort'
import { useLoggedUserStore } from '@/store/logged_user'
import { nameToActionAndSubject } from '@/plugins/casl'
import { authService } from '@/plugins/oauth'
const DEFAULT_TITLE = i18n.t('common.projectTitle')

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if (to.fullPath.startsWith('/auth')) {
    handleAuthorization()
    return '/'
  } else if (to.fullPath.startsWith('/logout')) {
    handleLogout()
    return '/'
  }

  const logged_user = useLoggedUserStore()
  const pagination = usePaginationStore()
  const sort = useSortStore()
  pagination.setPage(0)
  sort.reset()
  document.title = to.meta.title
    ? (to.meta.title as string)
    : DEFAULT_TITLE
  return logged_user.ability.can(
    ...nameToActionAndSubject(to.name)
  )
    ? true
    : '/' // redirect to home page
})

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
