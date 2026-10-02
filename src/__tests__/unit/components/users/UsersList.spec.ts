/*
 * R Depot
 *
 * Copyright (C) 2012-2026 Open Analytics NV
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

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { createPinia, setActivePinia } from 'pinia'
import UsersList from '@/components/users/UsersList.vue'
import { useUserStore } from '@/store/options/users'
import { useAuthorizationStore } from '@/store/options/authorization'

const users = [
  {
    id: 2,
    login: 'active',
    name: 'Active User',
    email: 'active@example.com',
    role: 'user',
    active: true
  },
  {
    id: 3,
    login: 'inactive',
    name: 'Inactive User',
    email: 'inactive@example.com',
    role: 'user',
    active: false
  }
]

async function mountList(
  permissions: string[][],
  meId = 1
) {
  const authorizationStore = useAuthorizationStore()
  authorizationStore.me = { id: meId }
  authorizationStore.userRole = 3
  const userStore = useUserStore()
  vi.spyOn(userStore, 'getRoles').mockResolvedValue()
  vi.spyOn(userStore, 'getPage').mockResolvedValue(
    {} as any
  )
  userStore.users = users.map((user, index) => ({
    ...user,
    permissions: permissions[index]
  })) as any
  userStore.totalNumber = users.length
  const wrapper = mount(UsersList as any, {
    global: { plugins: plugins }
  })
  await new Promise((resolve) => setTimeout(resolve, 50))
  return wrapper
}

async function toggleAll(
  wrapper: Awaited<ReturnType<typeof mountList>>
) {
  const userStore = useUserStore()
  const activate = vi
    .spyOn(userStore, 'activate')
    .mockResolvedValue()
  const deactivate = vi
    .spyOn(userStore, 'deactivate')
    .mockResolvedValue()

  const inputs = wrapper.findAll('input#checkbox-active')
  expect(inputs.length).toBe(users.length)
  for (const [index, input] of inputs.entries()) {
    await input.setValue(!users[index].active)
  }
  return { activate, deactivate }
}

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('UsersList', () => {
  it('activates and deactivates with the matching permission', async () => {
    const wrapper = await mountList([
      ['user.deactivate'],
      ['user.activate']
    ])

    const { activate, deactivate } =
      await toggleAll(wrapper)

    expect(deactivate).toHaveBeenCalledOnce()
    expect(deactivate.mock.calls[0][0].id).toBe(users[0].id)
    expect(activate).toHaveBeenCalledOnce()
    expect(activate.mock.calls[0][0].id).toBe(users[1].id)
  })

  it.each([
    ['user.edit', [['user.edit'], ['user.edit']]],
    [
      'the opposite permission',
      [['user.activate'], ['user.deactivate']]
    ]
  ])(
    'does not toggle with only %s',
    async (_, permissions) => {
      const wrapper = await mountList(permissions)

      const { activate, deactivate } =
        await toggleAll(wrapper)

      expect(activate).not.toHaveBeenCalled()
      expect(deactivate).not.toHaveBeenCalled()
    }
  )

  it.each([
    ['toggles', ['user.deactivate'], 1],
    ['does not toggle', [], 0]
  ])(
    '%s the own row based only on its permissions',
    async (_, ownPermissions, calls) => {
      const wrapper = await mountList(
        [ownPermissions, []],
        users[0].id
      )

      const { deactivate } = await toggleAll(wrapper)

      expect(deactivate).toHaveBeenCalledTimes(calls)
    }
  )
})
