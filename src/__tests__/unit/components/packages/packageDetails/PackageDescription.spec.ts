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
import { ResizeObserver } from '@/__tests__/config/ResizeObserver'
import pythonPackage from '@/__tests__/config/mockData/pythonPackage.json'
import { createPinia, setActivePinia } from 'pinia'
import PackageDescription from '@/components/packages/packageDetails/PackageDescription.vue'
import { usePackageDetailsStore } from '@/store/package_details'
import MarkdownDescription from '@/components/common/markdown/MarkdownDescription.vue'
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
  wrapper = mount(PackageDescription, {
    global: globalConfig
  })
})

describe('Package Description (Python)', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('display markdown description', async () => {
    expect(
      wrapper.findAllComponents(MarkdownDescription)
    ).toHaveLength(1)
  })

  it('not display pure description', async () => {
    expect(wrapper.text()).not.toContain(
      packageDetailsStore.packageBag?.description
    )
  })
})

describe('Package Description (R)', async () => {
  it('not display markdown description', async () => {
    packageDetailsStore.packageBag.technology = 'R'
    await nextTick(() => {})
    expect(
      wrapper.findAllComponents(MarkdownDescription)
    ).toHaveLength(0)
  })

  it('display pure description', async () => {
    packageDetailsStore.packageBag.technology = 'R'
    await nextTick(() => {})
    expect(wrapper.text()).toContain(
      packageDetailsStore.packageBag?.description.slice(
        0,
        100
      )
    )
  })
})
