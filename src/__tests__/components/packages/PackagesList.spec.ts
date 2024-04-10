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
import { usePackagesStore } from '@/store/packages'
import PackagesListVue from '@/components/packages/PackagesList.vue'
import PackageRowVue from '@/components/packages/PackageRow.vue'
import packages from '@/__tests__/config/mockData/packages.json'
import { useMeStore } from '@/store/me'
import me from '@/__tests__/config/mockData/me.json'

let wrapper: any
let meStore: any
let packagesStore: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeAll(() => {
  global.ResizeObserver = ResizeObserver
  setActivePinia(createPinia())
  packagesStore = usePackagesStore()
  meStore = useMeStore()
  meStore.me = me.data
})

beforeEach(async () => {
  wrapper = mount(PackagesListVue, {
    global: globalConfig
  })

  packagesStore.packages = packages.data.content
})

describe('Packages - list', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays one row for each package + one for title', async () => {
    const packagesFromWrapper =
      wrapper.findAllComponents(PackageRowVue)

    expect(packagesFromWrapper.length).toEqual(
      packages.data.content.length + 1
    )
  })
})
