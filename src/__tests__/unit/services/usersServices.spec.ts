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

import { createPinia, setActivePinia } from 'pinia'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'
import { openApiRequest } from '@/services/openApiAccess'
import {
  activateUserService,
  deactivateUserService,
  deleteUserService,
  updateUser
} from '@/services/usersServices'

vi.mock('@/services/openApiAccess', () => ({
  openApiRequest: vi.fn(() => Promise.resolve(true)),
  validateRequest: vi.fn()
}))

describe.each([
  {
    name: 'activateUserService',
    service: activateUserService,
    permission: 'user.activate',
    opposite: 'user.deactivate',
    active: true
  },
  {
    name: 'deactivateUserService',
    service: deactivateUserService,
    permission: 'user.deactivate',
    opposite: 'user.activate',
    active: false
  }
])('$name', ({ service, permission, opposite, active }) => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('patches only the active flag', async () => {
    await service({
      id: 1,
      login: 'user',
      active: !active,
      permissions: [permission]
    })

    expect(openApiRequest).toHaveBeenCalledOnce()
    const [callback, parameters] =
      vi.mocked(openApiRequest).mock.calls[0]
    expect(callback.name).toBe('patchUser')
    expect(parameters).toEqual([
      1,
      [{ op: 'replace', path: '/active', value: active }]
    ])
  })

  it.each([
    ['with only user.edit', ['user.edit']],
    [`with only ${opposite}`, [opposite]],
    ['without permissions', undefined]
  ])('does not change it %s', async (_, permissions) => {
    service({ id: 1, permissions })
    await new Promise((resolve) => setTimeout(resolve))

    expect(openApiRequest).not.toHaveBeenCalled()
  })
})

describe('updateUser', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('sends the edit form changes with user.edit', async () => {
    await updateUser(
      { id: 1, roleId: 1, permissions: ['user.edit'] },
      { id: 1, roleId: 4, permissions: ['user.edit'] }
    )

    expect(openApiRequest).toHaveBeenCalledOnce()
    const [callback, parameters] =
      vi.mocked(openApiRequest).mock.calls[0]
    expect(callback.name).toBe('patchUser')
    expect(parameters).toEqual([
      1,
      [{ op: 'replace', path: '/roleId', value: 4 }]
    ])
  })

  it.each([
    ['with only user.delete.soft', ['user.delete.soft']],
    ['with only user.deactivate', ['user.deactivate']],
    ['without permissions', undefined]
  ])('does not call the API %s', async (_, permissions) => {
    updateUser(
      { id: 1, roleId: 1, permissions },
      { id: 1, roleId: 4, permissions }
    )
    await new Promise((resolve) => setTimeout(resolve))

    expect(openApiRequest).not.toHaveBeenCalled()
  })
})

describe('deleteUserService', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('soft-deletes with user.delete.soft', async () => {
    await deleteUserService({
      id: 1,
      permissions: ['user.delete.soft']
    })

    expect(openApiRequest).toHaveBeenCalledOnce()
    const [callback, parameters] =
      vi.mocked(openApiRequest).mock.calls[0]
    expect(callback.name).toBe('patchUser')
    expect(parameters).toEqual([
      1,
      [{ op: 'replace', path: '/deleted', value: true }]
    ])
  })

  it.each([
    ['with only user.edit', ['user.edit']],
    ['without permissions', undefined]
  ])('does not call the API %s', async (_, permissions) => {
    deleteUserService({ id: 1, permissions })
    await new Promise((resolve) => setTimeout(resolve))

    expect(openApiRequest).not.toHaveBeenCalled()
  })
})
