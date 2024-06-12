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
import * as helper from '@/plugins/router/helpers'
import getEnv from '@/utils/env'

const DEFAULT_TITLE = i18n.t('common.projectTitle')

const router = createRouter({
  history: createWebHistory(getEnv('VITE_URL_PREFIX')),
  routes
})

router.beforeEach(async (to) => {
  const path = await helper.checkAuthorization(to)
  if (path !== undefined) return path
  helper.resetStoreValues()
  document.title = to.meta.title
    ? (to.meta.title as string)
    : DEFAULT_TITLE
  helper.getDefaultFiltration(to)
})

router.beforeResolve(async (to, from) => {
  await helper.prepareStores(to, from)
  return true
})

export default router
