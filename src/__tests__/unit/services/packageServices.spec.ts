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
import { Technologies } from '@/enum/Technologies'
import { openApiRequest } from '@/services/openApiAccess'
import {
  activatePackageService,
  deactivatePackageService
} from '@/services/packageServices'

vi.mock('@/services/openApiAccess', () => ({
  openApiRequest: vi.fn(() => Promise.resolve(true)),
  validateRequest: vi.fn()
}))

describe.each([
  {
    name: 'activatePackageService',
    service: activatePackageService,
    permission: 'package.activate',
    opposite: 'package.deactivate',
    active: true
  },
  {
    name: 'deactivatePackageService',
    service: deactivatePackageService,
    permission: 'package.deactivate',
    opposite: 'package.activate',
    active: false
  }
])('$name', ({ service, permission, opposite, active }) => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it.each([
    [Technologies.enum.R, 'updatePackage'],
    [Technologies.enum.Python, 'updatePythonPackage']
  ])(
    'patches only the active flag of %s package',
    async (technology, endpoint) => {
      await service({
        id: 1,
        name: 'accrued',
        technology,
        active: !active,
        permissions: [permission]
      })

      expect(openApiRequest).toHaveBeenCalledOnce()
      const [callback, parameters] =
        vi.mocked(openApiRequest).mock.calls[0]
      expect(callback.name).toBe(endpoint)
      expect(parameters).toEqual([
        1,
        [{ op: 'replace', path: '/active', value: active }]
      ])
    }
  )

  it.each([
    ['with only package.edit', ['package.edit']],
    [`with only ${opposite}`, [opposite]],
    ['without permissions', undefined]
  ])('does not change it %s', async (_, permissions) => {
    service({
      id: 1,
      technology: Technologies.enum.R,
      permissions
    })
    await new Promise((resolve) => setTimeout(resolve))

    expect(openApiRequest).not.toHaveBeenCalled()
  })
})
