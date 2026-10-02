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
  deactivateToken,
  deleteToken,
  editToken
} from '@/services/settingsServices'

vi.mock('@/services/openApiAccess', () => ({
  openApiRequest: vi.fn(() => Promise.resolve(true)),
  validateRequest: vi.fn()
}))

beforeEach(() => {
  setActivePinia(createPinia())
})

afterEach(() => {
  vi.clearAllMocks()
})

describe.each([
  {
    name: 'editToken',
    permission: 'accessToken.edit',
    others: [
      'accessToken.deactivate',
      'accessToken.delete.hard'
    ],
    call: (permissions?: string[]) =>
      editToken(
        { id: 1, name: 'old', permissions },
        { id: 1, name: 'new', permissions }
      ),
    endpoint: 'patchAccessToken',
    parameters: [
      1,
      [{ op: 'replace', path: '/name', value: 'new' }]
    ]
  },
  {
    name: 'deactivateToken',
    permission: 'accessToken.deactivate',
    others: ['accessToken.edit', 'accessToken.delete.hard'],
    call: (permissions?: string[]) =>
      deactivateToken({ id: 1, active: true, permissions }),
    endpoint: 'patchAccessToken',
    parameters: [
      1,
      [{ op: 'replace', path: '/active', value: false }]
    ]
  },
  {
    name: 'deleteToken',
    permission: 'accessToken.delete.hard',
    others: ['accessToken.edit', 'accessToken.deactivate'],
    call: (permissions?: string[]) =>
      deleteToken({ id: 1, permissions }),
    endpoint: 'deleteAccessToken',
    parameters: [1]
  }
])(
  '$name',
  ({ permission, others, call, endpoint, parameters }) => {
    it(`calls the API with ${permission}`, async () => {
      await call([permission])

      expect(openApiRequest).toHaveBeenCalledOnce()
      const [callback, sent] =
        vi.mocked(openApiRequest).mock.calls[0]
      expect(callback.name).toBe(endpoint)
      expect(sent).toEqual(parameters)
    })

    it.each([
      ['with only the other permissions', others],
      ['without permissions', undefined]
    ])(
      'does not call the API %s',
      async (_, permissions) => {
        call(permissions)
        await new Promise((resolve) => setTimeout(resolve))

        expect(openApiRequest).not.toHaveBeenCalled()
      }
    )
  }
)
