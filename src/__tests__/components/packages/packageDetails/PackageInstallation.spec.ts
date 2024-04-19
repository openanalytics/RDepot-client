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
import RPackage from '@/__tests__/config/mockData/RPackage.json'
import { createPinia, setActivePinia } from 'pinia'
import PackageInstallation from '@/components/packages/packageDetails/PackageInstallation.vue'
import { usePackageDetailsStore } from '@/store/package_details'
import { nextTick } from 'vue'
import { useUtilities } from '@/composable/utilities'

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
  wrapper = mount(PackageInstallation, {
    global: globalConfig
  })
})

describe('Package Installation', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('display code section', () => {
    expect(wrapper.findAll('code')).toHaveLength(1)
  })

  it('display copy icon', () => {
    expect(wrapper.findAll('i')).toHaveLength(1)
  })

  it('display correct installation command Python', () => {
    expect(wrapper.find('#install-command').text()).toBe(
      `pip install --index-url ${pythonPackage.repository?.publicationUri} ${pythonPackage.name}`
    )
  })

  it('display proper info when repository is not published', async () => {
    const packageDetailsStore = usePackageDetailsStore()
    const { deepCopy } = useUtilities()
    const localPackage = deepCopy(RPackage)
    localPackage.repository.published = false
    packageDetailsStore.packageBag = localPackage
    await nextTick(() => {})
    expect(wrapper.text()).toBe(
      'packages.installpackages.noInstallInstruction'
    )
  })

  it('display correct installation command R', async () => {
    const packageDetailsStore = usePackageDetailsStore()
    packageDetailsStore.packageBag = RPackage
    await nextTick(() => {})
    expect(wrapper.find('#install-command').text()).toBe(
      `install.packages("${RPackage.name}", repos = c(rdepot = "${RPackage.repository.publicationUri}", getOption("repos")))`
    )
  })
})
