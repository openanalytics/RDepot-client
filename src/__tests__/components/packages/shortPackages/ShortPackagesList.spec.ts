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
import ShortPackagesListVue from '@/components/packages/shortPackages/ShortPackagesList.vue'
import ShortPackageRowVue from '@/components/packages/shortPackages/ShortPackageRow.vue'
import packages from '@/__tests__/config/mockData/packages.json'
import { usePackagesStore } from '@/store/packages'
import { useUtilities } from '@/composable/utilities'

let wrapper: any
const { deepCopyAny } = useUtilities()

const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeAll(() => {
  global.ResizeObserver = ResizeObserver
  setActivePinia(createPinia())
})

beforeEach(async () => {
  wrapper = mount(ShortPackagesListVue, {
    global: globalConfig
  })
  const package_store = usePackagesStore()
  package_store.packages = deepCopyAny(
    packages.data.content
  )
})

describe('Short Packages - list', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays one row for each package + one for title', async () => {
    const packagesFromWrapper = wrapper.findAllComponents(
      ShortPackageRowVue
    )

    expect(packagesFromWrapper.length).toEqual(
      packages.data.content.length + 1
    )
  })
})
