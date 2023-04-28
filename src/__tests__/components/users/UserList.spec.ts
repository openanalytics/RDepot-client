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
import { nextTick } from 'vue'

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
