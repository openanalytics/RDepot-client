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
import UserRow from '@/components/users/UserRow.vue'
import EditIcon from '@/components/common/action_icons/EditIcon.vue'
import users from '@/__tests__/config/mockData/users.json'
import { EntityModelUserDto } from '@/openapi'
import { createPinia, setActivePinia } from 'pinia'
import { roleToString } from '@/enum/UserRoles'
import { useUtilities } from '@/composable/utilities'
import { nextTick } from 'vue'
import { useMeStore } from '@/store/me'

let wrapper: any
const { deepCopyAny } = useUtilities()
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
beforeAll(() => {
  global.ResizeObserver = ResizeObserver
  config.global.renderStubDefaultSlot = true
  setActivePinia(createPinia())
})

describe('User list - user row', () => {
  const user: EntityModelUserDto = deepCopyAny(
    users.data.content[5]
  )
  beforeEach(async () => {
    wrapper = mount(UserRow, {
      global: globalConfig,
      props: {
        title: false,
        user: user
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('name field', () => {
    const field = wrapper.find('#user-name')
    expect(field.text()).toBe(user.name)
  })

  it('email field', () => {
    const field = wrapper.find('#user-email')
    expect(field.text()).toBe(user.email)
  })

  it('username field', () => {
    const field = wrapper.find('#user-username')
    expect(field.text()).toBe(user.login)
  })

  it('role field', () => {
    const field = wrapper.find('#user-role')
    expect(field.text()).toBe(
      roleToString.parse(user.roleId! - 1)
    )
  })

  it('active field with oneself', async () => {
    const meStore = useMeStore()
    meStore.me = user
    await nextTick()
    const checkboxActive = wrapper.find('#checkbox-active')
    console.log(checkboxActive.html())
    expect(checkboxActive.element.checked).toBe(user.active)
    expect(checkboxActive.element.disabled).toBe(true)
  })
  it('active field with different user', async () => {
    const meStore = useMeStore()
    meStore.me = users.data.content[0]
    await nextTick()
    const checkboxActive = wrapper.find('#checkbox-active')
    console.log(checkboxActive.html())
    expect(checkboxActive.element.checked).toBe(user.active)
    expect(checkboxActive.element.disabled).toBe(true)
  })

  it('edit button exists', () => {
    expect(
      wrapper.findAllComponents(EditIcon).length
    ).toEqual(1)
  })
})

describe('User - user row (empty)', () => {
  beforeEach(async () => {
    wrapper = mount(UserRow, {
      global: globalConfig,
      props: {
        title: false
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('name field', () => {
    const field = wrapper.find('#user-name')
    expect(field.text()).toBe('')
  })

  it('email field', () => {
    const field = wrapper.find('#user-email')
    expect(field.text()).toBe('')
  })

  it('username field', () => {
    const field = wrapper.find('#user-username')
    expect(field.text()).toBe('')
  })

  it('role field', () => {
    const field = wrapper.find('#user-role')
    expect(field.text()).toBe('user')
  })

  it('active field', () => {
    const checkboxActive = wrapper.find('#checkbox-active')
    expect(checkboxActive.exists()).toBe(false)
  })

  it('edit button exists', () => {
    expect(wrapper.find('#pencil-icon').exists()).toBe(
      false
    )
  })
})

describe('User - user row (title)', () => {
  beforeEach(async () => {
    wrapper = mount(UserRow, {
      global: globalConfig,
      props: {
        title: true
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('name field', () => {
    const field = wrapper.find('#user-name')
    expect(field.text()).toBe('Columns.users.name')
  })

  it('email field', () => {
    const field = wrapper.find('#user-email')
    expect(field.text()).toBe('Columns.users.email')
  })

  it('username field', () => {
    const field = wrapper.find('#user-username')
    expect(field.text()).toBe('Columns.users.username')
  })

  it('role field', () => {
    const field = wrapper.find('#user-role')
    expect(field.text()).toBe('Columns.users.role')
  })

  it('edit button exists', () => {
    expect(wrapper.find('#pencil-icon').exists()).toBe(
      false
    )
  })

  it('active title', () => {
    const field = wrapper.find('#user-active')
    const checkbox = wrapper.find('#checkbox-active')
    expect(field.text()).toBe('Columns.users.active')
    expect(checkbox.exists()).toBe(false)
  })

  it('actions title', () => {
    const field = wrapper.find('#user-actions')
    expect(field.text()).toBe('Columns.actions')
  })

  it('edit button should not exists', () => {
    expect(wrapper.find('#pencil-icon').exists()).toBe(
      false
    )
  })
})
