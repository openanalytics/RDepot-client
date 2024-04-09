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

import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { beforeAll, beforeEach } from 'vitest'
import AppVue from '@/App.vue'
import {
  createRouter,
  createWebHistory,
  Router
} from 'vue-router'
import { routes } from '@/plugins/router/routes'
import { createPinia, setActivePinia } from 'pinia'
import { mocks } from '@/__tests__/config/mocks'
import { plugins } from '@/__tests__/config/plugins'
import { ResizeObserver } from '@/__tests__/config/ResizeObserver'
import { useUtilities } from '@/composable/utilities'
import { EntityModelUserDto } from '@/openapi'
import users from '@/__tests__/config/mockData/users.json'
import { useMeStore } from '@/store/me'
import { stringToRole } from '@/enum/UserRoles'

let router: Router
let globalSettigns: any
let wrapper: any
const { deepCopyAny } = useUtilities()

beforeAll(() => {
  setActivePinia(createPinia())
  global.ResizeObserver = ResizeObserver
  const user: EntityModelUserDto = deepCopyAny(
    users.data.content[5]
  )

  const meStore = useMeStore()
  meStore.me = user
  meStore.userRole = stringToRole(user.role || 'admin')
})

beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes: routes
  })
  globalSettigns = {
    mocks: mocks,
    plugins: [...plugins, router]
  }
  wrapper = mount(AppVue, {
    global: globalSettigns
  })
})

describe('App router', () => {
  it('renders login page via router', async () => {
    await getRouterPath('/login')
    findComponentInWrapper(wrapper, 'login')
  })

  it('renders users list via router', async () => {
    await getRouterPath('/users')
    findComponentInWrapper(wrapper, 'users')
  })

  it('renders repositories list via router', async () => {
    await getRouterPath('/repositories')
    findComponentInWrapper(wrapper, 'repositories')
  })

  it('renders repository maintainers list via router', async () => {
    await getRouterPath('/repository-maintainers')
    findComponentInWrapper(wrapper, 'repositoryMaintainers')
  })

  it('renders submissions via router', async () => {
    await getRouterPath('/submissions')
    findComponentInWrapper(wrapper, 'submissions')
  })

  it('renders packages list via router', async () => {
    await getRouterPath('/packages')
    findComponentInWrapper(wrapper, 'packages')
  })

  it('renders packages maintainers list via router', async () => {
    await getRouterPath('/package-maintainers')
    findComponentInWrapper(wrapper, 'packageMaintainers')
  })

  it('renders add package view list via router', async () => {
    await getRouterPath('/add-packages')
    findComponentInWrapper(wrapper, 'addSubmission')
  })

  it('renders events list via router', async () => {
    await getRouterPath('/events')
    findComponentInWrapper(wrapper, 'events')
  })
})

async function getRouterPath(path: string) {
  router.push(path)
  await router.isReady()
}

function findComponentInWrapper(
  wrapper: any,
  name: string
) {
  expect(
    wrapper.findComponent({ name: name }).exists()
  ).toBe(true)
}
