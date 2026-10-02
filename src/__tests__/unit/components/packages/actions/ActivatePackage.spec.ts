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
import ActivatePackage from '@/components/packages/actions/ActivatePackage.vue'
import { usePackagesStore } from '@/store/options/packages'

function mountCheckbox(
  active: boolean,
  permissions: string[]
) {
  return mount(ActivatePackage as any, {
    global: { plugins: plugins },
    props: {
      item: {
        id: 1,
        name: 'accrued',
        version: '1.4',
        technology: 'R',
        repository: { name: 'testrepo1' },
        active,
        deleted: false,
        permissions
      }
    }
  })
}

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('ActivatePackage', () => {
  it.each([
    [true, 'package.deactivate', 'deactivate'],
    [false, 'package.activate', 'activate']
  ] as const)(
    'toggles when active=%s and the user has %s',
    async (active, permission, action) => {
      const packagesStore = usePackagesStore()
      const activate = vi
        .spyOn(packagesStore, 'activate')
        .mockResolvedValue()
      const deactivate = vi
        .spyOn(packagesStore, 'deactivate')
        .mockResolvedValue()
      const wrapper = mountCheckbox(active, [permission])

      await wrapper.find('input').setValue(!active)
      const [called, notCalled] =
        action === 'activate'
          ? [activate, deactivate]
          : [deactivate, activate]
      expect(called).toHaveBeenCalledOnce()
      expect(called.mock.calls[0][0].active).toBe(!active)
      expect(notCalled).not.toHaveBeenCalled()
    }
  )

  it.each([
    [true, 'package.activate'],
    [false, 'package.deactivate']
  ])(
    'does not toggle when active=%s and the user only has %s',
    async (active, permission) => {
      const packagesStore = usePackagesStore()
      const activate = vi
        .spyOn(packagesStore, 'activate')
        .mockResolvedValue()
      const deactivate = vi
        .spyOn(packagesStore, 'deactivate')
        .mockResolvedValue()
      const wrapper = mountCheckbox(active, [permission])

      await wrapper.find('input').setValue(!active)
      expect(activate).not.toHaveBeenCalled()
      expect(deactivate).not.toHaveBeenCalled()
    }
  )
})
