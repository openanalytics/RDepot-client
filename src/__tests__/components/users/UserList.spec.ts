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

import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll
} from 'vitest'

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { ResizeObserver } from '@/__tests__/config/ResizeObserver'
import { createPinia, setActivePinia } from 'pinia'
import UserList from '@/components/users/UserList.vue'
import UserRow from '@/components/users/UserRow.vue'
import users from '@/__tests__/config/mockData/users.json'
import { useUserStore } from '@/store/users'

let wrapper: any
let user_store: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
beforeAll(() => {
  global.ResizeObserver = ResizeObserver
  setActivePinia(createPinia())
  user_store = useUserStore()
})

beforeEach(async () => {
  wrapper = mount(UserList, {
    global: globalConfig
  })
  user_store.userList = users.data.content
})

describe('User - list', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays one row for each user + one for title', async () => {
    const usersFromWrapper =
      wrapper.findAllComponents(UserRow)

    expect(usersFromWrapper.length).toBe(
      users.data.content.length + 1
    )
  })
})
