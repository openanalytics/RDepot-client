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

import { Role } from '@/enum/UserRoles'
import { UserSettingsProjection } from '@/openapi/models/user-settings-projection'
import { useLoggedUserStore } from '@/store/logged_user'
import { rest } from 'msw'
import me from '@/__tests__/config/mockData/me.json'
import { setupServer } from 'msw/node'
import { createPinia, setActivePinia } from 'pinia'
import {
  describe,
  expect,
  it,
  beforeEach,
  vi,
  beforeAll,
  afterAll
} from 'vitest'

const server = setupServer(
  rest.get(
    'http://localhost:8017/api/v2/manager/users/me',
    (_, res, ctx) => {
      return res(ctx.json(me))
    }
  )
)

describe('Logged user store tests', () => {
  beforeAll(() => {
    server.listen()
  })

  beforeEach(() => {
    setActivePinia(createPinia())
    server.resetHandlers()
  })

  afterAll(() => {
    server.close
  })

  it('Default state', () => {
    const logged_user_store = useLoggedUserStore()

    expect(logged_user_store.userToken).toBe(
      import.meta.env.VITE_ADMIN_TOKEN
    )
    expect(logged_user_store.userLogin).toBe('einstein')
    expect(logged_user_store.userRole).toBe(Role.enum.admin)
    expect(logged_user_store.userId).toBe(8)
    expect(logged_user_store.me).toEqual({})
  })

  it('Change user', () => {
    const logged_user_store = useLoggedUserStore()

    logged_user_store.change_user(
      import.meta.env.VITE_REPOSITORY_MAINTAINER_TOKEN,
      'tesla',
      Role.enum.repositoryMaintainer,
      5
    )

    expect(logged_user_store.userLogin).toBe('tesla')
    expect(logged_user_store.userRole).toBe(
      Role.enum.repositoryMaintainer
    )
    expect(logged_user_store.userId).toBe(5)
  })

  it('get current settings', () => {
    const logged_user_store = useLoggedUserStore()
    logged_user_store.me = {
      userSettings: {
        language: 'pl',
        pageSize: 2,
        theme: 'light'
      }
    }

    const current_settings =
      logged_user_store.getCurrentSettings()

    expect(current_settings.language).toBe('pl')
    expect(current_settings.pageSize).toBe(2)
    expect(current_settings.theme).toBe('light')
  })

  it('get current settings when settings are empty', () => {
    const logged_user_store = useLoggedUserStore()
    const new_settings: UserSettingsProjection =
      logged_user_store.getCurrentSettings()
    expect(new_settings.language).toBe('en')
    expect(new_settings.pageSize).toBe(10)
    expect(new_settings.theme).toBe('dark')
  })

  it('alert logout if role has changed', () => {
    const logged_user_store = useLoggedUserStore()
    logged_user_store.me.role = 'admin'
    expect(
      logged_user_store.checkRoles('repositorymaintainer')
    ).toBeFalsy()
  })

  it('do not alert logout if role has not changed', () => {
    const logged_user_store = useLoggedUserStore()
    logged_user_store.me.role = 'admin'
    expect(
      logged_user_store.checkRoles('admin')
    ).toBeTruthy()
  })

  it('fetch information about logged in user', async () => {
    const logged_user_store = useLoggedUserStore()
    const data_about_user = me.data

    await logged_user_store.getUserInfo()
    expect(logged_user_store.me).toStrictEqual(
      data_about_user
    )
  })

  it('call logout if user role has changed', async () => {
    const logged_user_store = useLoggedUserStore()
    logged_user_store.me.role = 'packagemaintainer'

    const spy = vi.spyOn(logged_user_store, 'logout')
    await logged_user_store.getUserInfo()
    expect(spy).toBeCalledTimes(1)
  })

  it('logout action should reset the state', async () => {
    const logged_user_store = useLoggedUserStore()
    logged_user_store.me = me.data
    await logged_user_store.logout()
    expect(logged_user_store.me).toEqual({})
  })
})
