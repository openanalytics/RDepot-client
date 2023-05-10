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
import users from '@/__tests__/config/mockData/users.json'
import { EntityModelUserDto } from '@/openapi'
import { createPinia, setActivePinia } from 'pinia'
import { roleToString } from '@/enum/UserRoles'
import { useUtilities } from '@/composable/utilities'

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
    users.data.content[4]
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

  it('active field', () => {
    const checkbox_active = wrapper.find('#checkbox-active')
    expect(checkbox_active.element.checked).toBe(
      user.active
    )
    expect(checkbox_active.element.disabled).toBe(true)
  })

  it('edit button exists', () => {
    expect(wrapper.find('#pencil-icon').exists()).toBe(true)
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
    const checkbox_active = wrapper.find('#checkbox-active')
    expect(checkbox_active.exists()).toBe(false)
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
    expect(field.text()).toBe('Columns.name')
  })

  it('email field', () => {
    const field = wrapper.find('#user-email')
    expect(field.text()).toBe('Columns.email')
  })

  it('username field', () => {
    const field = wrapper.find('#user-username')
    expect(field.text()).toBe('Columns.username')
  })

  it('role field', () => {
    const field = wrapper.find('#user-role')
    expect(field.text()).toBe('Columns.role')
  })

  it('edit button exists', () => {
    expect(wrapper.find('#pencil-icon').exists()).toBe(
      false
    )
  })

  it('active title', () => {
    const field = wrapper.find('#user-active')
    const checkbox = wrapper.find('#checkbox-active')
    expect(field.text()).toBe('Columns.active')
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
