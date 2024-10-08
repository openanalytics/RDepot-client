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

import { describe, it, expect, beforeAll } from 'vitest'

import { mount, config } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import pythonPackage from '@/__tests__/config/mockData/pythonPackage.json'
import { createPinia, setActivePinia } from 'pinia'
import PackageManual from '@/components/packages/packageDetails/PackageManual.vue'
import { usePackageDetailsStore } from '@/store/options/packageDetails'
import { nextTick } from 'process'

let wrapper: any
let packageDetailsStore: any

const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
beforeAll(() => {
  config.global.renderStubDefaultSlot = true
  setActivePinia(createPinia())
  packageDetailsStore = usePackageDetailsStore()
  packageDetailsStore.packageBag = pythonPackage
  wrapper = mount(PackageManual, {
    global: globalConfig
  })
})

describe('Package Manual (Python)', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('not display manual', async () => {
    expect(wrapper.findAll('button')).toHaveLength(0)
  })
})

describe('Package Manual (R)', async () => {
  it('display manual', async () => {
    packageDetailsStore.packageBag.technology = 'R'
    await nextTick(() => {})
    expect(wrapper.findAll('button')).toHaveLength(1)
  })
})
