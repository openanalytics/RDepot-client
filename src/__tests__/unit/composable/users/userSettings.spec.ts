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

import {
  describe,
  it,
  expect,
  beforeEach,
  vi
} from 'vitest'

import { createPinia, setActivePinia } from 'pinia'
import { useUserSettings } from '@/composable/user/userSettings'
import { useCommonStore } from '@/store/common'
import { useAuthorizationStore } from '@/store/authorization'
import { i18n } from '@/plugins/i18n'
import { usePagination } from '@/store/pagination'

beforeEach(async () => {
  setActivePinia(createPinia())
})

describe('user settings composable', () => {
  it('should set theme (update the key)', () => {
    const { getUserSettings } = useUserSettings()
    const commonStore = useCommonStore()

    const spy = vi.spyOn(commonStore, 'updateThemeKey')

    getUserSettings()
    expect(spy).toBeCalledTimes(1)
  })

  it('should set pl language', () => {
    const { getUserSettings } = useUserSettings()
    const authorizationStore = useAuthorizationStore()
    authorizationStore.me = {
      userSettings: { language: 'pl-PL' }
    }

    getUserSettings()
    expect(i18n.locale.value).toEqual('pl')
  })

  it('should set en language', () => {
    const { getUserSettings } = useUserSettings()
    const authorizationStore = useAuthorizationStore()
    authorizationStore.me = {
      userSettings: { language: 'en-EN' }
    }

    i18n.locale.value = 'pl'

    getUserSettings()
    expect(i18n.locale.value).toEqual('en')
  })

  it('should set page size', async () => {
    const { getUserSettings } = useUserSettings()
    const { pageSize } = usePagination()
    const authorizationStore = useAuthorizationStore()
    authorizationStore.me = {
      userSettings: { pageSize: 10 }
    }
    getUserSettings()
    expect(pageSize).toEqual(10)
  })
})
