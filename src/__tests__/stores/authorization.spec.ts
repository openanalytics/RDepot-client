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

import { UserSettingsProjection } from '@/openapi/models/user-settings-projection'
import { useAuthorizationStore } from '@/store/authorization'
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
import { http, HttpResponse } from 'msw'
import { useMeStore } from '@/store/me'

const server = setupServer(
  http.get(
    'http://localhost:8017/api/v2/manager/users/me',
    () => {
      return HttpResponse.json(me)
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
    const authorizationStore = useAuthorizationStore()

    expect(authorizationStore.userToken).toBe('')
    expect(authorizationStore.userLogin).toBe('')
    expect(authorizationStore.userId).toBe(8)
  })

  it('get current settings', () => {
    const meStore = useMeStore()
    meStore.me = {
      userSettings: {
        language: 'pl',
        pageSize: 2,
        theme: 'light'
      }
    }

    const authorizationStore = useAuthorizationStore()
    const current_settings =
      authorizationStore.getCurrentSettings()

    expect(current_settings.language).toBe('pl')
    expect(current_settings.pageSize).toBe(2)
    expect(current_settings.theme).toBe('light')
  })

  it('get current settings when settings are empty', () => {
    const authorizationStore = useAuthorizationStore()
    const new_settings: UserSettingsProjection =
      authorizationStore.getCurrentSettings()
    expect(new_settings.language).toBe('en')
    expect(new_settings.pageSize).toBe(10)
    expect(new_settings.theme).toBe('dark')
  })

  it('call logout if user role has changed', async () => {
    const authorizationStore = useAuthorizationStore()
    const meStore = useMeStore()
    meStore.me.role = 'packagemaintainer'

    const spy = vi.spyOn(authorizationStore, 'logout')
    await meStore.getUserInfo()
    expect(spy).toBeCalledTimes(1)
  })
})
