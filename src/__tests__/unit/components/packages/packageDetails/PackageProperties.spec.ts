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
import { plugins } from '@/__tests__/unit/config/plugins'
import { mocks } from '@/__tests__/unit/config/mocks'
import { ResizeObserver } from '@/__tests__/unit/config/ResizeObserver'
import pythonPackage from '@/__tests__/unit/config/mockData/pythonPackage.json'
import { createPinia, setActivePinia } from 'pinia'
import PackageProperties from '@/components/packages/packageDetails/PackageProperties.vue'
import PackageRProperties from '@/components/packages/packageDetails/PackageRProperties.vue'
import PackagePythonProperties from '@/components/packages/packageDetails/PackagePythonProperties.vue'
import { usePackageDetailsStore } from '@/store/package_details'
import { nextTick } from 'process'

let wrapper: any
let packageDetailsStore: any

const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
beforeAll(() => {
  global.ResizeObserver = ResizeObserver
  config.global.renderStubDefaultSlot = true
  setActivePinia(createPinia())
  packageDetailsStore = usePackageDetailsStore()
  packageDetailsStore.packageBag = pythonPackage
  wrapper = mount(PackageProperties, {
    global: globalConfig
  })
})

describe('Package Properties (Python)', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('display python properties', async () => {
    expect(
      wrapper.findAllComponents(PackagePythonProperties)
    ).toHaveLength(1)
  })

  it('not display r properties', async () => {
    expect(
      wrapper.findAllComponents(PackageRProperties)
    ).toHaveLength(0)
  })
})

describe('Package Properties (R)', async () => {
  it('display r properties', async () => {
    packageDetailsStore.packageBag.technology = 'R'
    await nextTick(() => {})
    expect(
      wrapper.findAllComponents(PackageRProperties)
    ).toHaveLength(1)
  })

  it('not display python properties', async () => {
    packageDetailsStore.packageBag.technology = 'R'
    await nextTick(() => {})
    expect(
      wrapper.findAllComponents(PackagePythonProperties)
    ).toHaveLength(0)
  })
})
