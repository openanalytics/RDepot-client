/*
 * R Depot
 *
 * Copyright (C) 2012-2023 Open Analytics NV
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
import { createPinia, setActivePinia } from 'pinia'
import PackageVignettes from '@/components/packages/packageDetails/PackageVignettes.vue'
import { usePackageDetailsStore } from '@/store/package_details'

const TITLE_1 = 'sth1'
const TITLE_2 = 'sth2'

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
  packageDetailsStore.vignettes = {
    data: [{ title: TITLE_1 }, { title: TITLE_2 }]
  }
  wrapper = mount(PackageVignettes, {
    global: globalConfig
  })
})

describe('Package Vignettes', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('display both vignettes', async () => {
    console.log(wrapper.html())
    expect(wrapper.text()).toContain(TITLE_1)
    expect(wrapper.text()).toContain(TITLE_2)
  })
})