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
  beforeAll
} from 'vitest'

import { mount, config } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { ResizeObserver } from '@/__tests__/config/ResizeObserver'
import users from '@/__tests__/config/mockData/users.json'
import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from 'vue'
import { useUserStore } from '@/store/users'
import { i18n } from '@/plugins/i18n'
import { useMeStore } from '@/store/me'
import me from '@/__tests__/config/mockData/me.json'
import UserList from '@/components/users/UserList.vue'

let wrapper: any
let usersStore: any
let meStore: any

const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
beforeAll(() => {
  global.ResizeObserver = ResizeObserver
  config.global.renderStubDefaultSlot = true
  setActivePinia(createPinia())
  usersStore = useUserStore()
  meStore = useMeStore()
  meStore.me = me.data
})

beforeEach(async () => {
  wrapper = mount(UserList, {
    global: globalConfig
  })
  usersStore.users = users.data.content
  usersStore.loading = false
})

describe('User list - user row', () => {
  it('displays data-table', async () => {
    const dataTable = wrapper.findComponent('.v-data-table')
    expect(dataTable.exists()).toBeTruthy()
  })

  it('displays one row per each user', async () => {
    const userRows = wrapper.findAllComponents('tr')
    expect(userRows.length).toEqual(
      users.data.content.length
    )
  })

  it('displays no data available text', async () => {
    usersStore.users = []
    await nextTick()
    expect(wrapper.text()).toContain('No data available')
    expect(wrapper.findAllComponents('tr').length).toEqual(
      1
    )
  })
})

describe('Users - list headers', () => {
  let headers: any
  beforeAll(() => {
    headers = wrapper.findAllComponents('th')
  })

  it('displays all headers', () => {
    expect(headers.length).toEqual(5)
  })

  it('displays username column', () => {
    const col = headers[0]
    expect(col.text()).toEqual(
      i18n.t('columns.users.username')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })

  it('displays user column', () => {
    const col = headers[1]
    expect(col.text()).toEqual(i18n.t('columns.users.name'))
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })

  it('displays email column', () => {
    const col = headers[2]
    expect(col.text()).toEqual(
      i18n.t('columns.users.email')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })

  it('displays active column', () => {
    const col = headers[3]
    expect(col.text()).toEqual(
      i18n.t('columns.users.active')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })
})

describe('Users - cells', () => {
  let cells: any
  const user = users.data.content[0]

  beforeAll(() => {
    cells = wrapper
      .findAllComponents('tr')[0]
      .findAllComponents('td')
  })

  it('displays login', () => {
    const cell = cells[0]
    expect(cell.text()).toBe(user.login)
  })

  it('displays user name', () => {
    const cell = cells[1]
    expect(cell.text()).toBe(user.name)
  })

  it('displays email', () => {
    const cell = cells[2]
    expect(cell.text()).toBe(user.email)
  })

  it('displays active', () => {
    const cell = cells[3]
    const checkboxPublished = cell.find('#checkbox-active')
    expect(checkboxPublished.element.checked).toEqual(
      user.active
    )
  })

  it('display edit action', () => {
    const cell = cells[4]
    expect(cell.find('#pencil-icon').exists()).toBeTruthy()
  })

  it('active field with oneself', async () => {
    meStore.me = user
    await nextTick()
    const checkboxActive = cells[3].find('#checkbox-active')
    expect(checkboxActive.element.checked).toBe(user.active)
    expect(checkboxActive.element.disabled).toBe(
      !user.active
    )
  })
  it('active field with different user', async () => {
    await nextTick()
    const checkboxActive = cells[3].find('#checkbox-active')
    expect(checkboxActive.element.checked).toBe(user.active)
    expect(checkboxActive.element.disabled).toBe(
      !user.active
    )
  })
})
