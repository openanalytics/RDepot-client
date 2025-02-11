/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
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
import pythonPackage2 from '@/__tests__/config/mockData/pythonPackage2.json'
import RPackage from '@/__tests__/config/mockData/RPackage.json'
import RPackage2 from '@/__tests__/config/mockData/RPackage2.json'
import RBinaryPackage from '@/__tests__/config/mockData/RBinaryPackage.json'
import RBinaryPackage2 from '@/__tests__/config/mockData/RBinaryPackage2.json'
import { createPinia, setActivePinia } from 'pinia'
import PackageInstallation from '@/components/packages/packageDetails/PackageInstallation.vue'
import { usePackageDetailsStore } from '@/store/options/packageDetails'
import { nextTick } from 'vue'
import { useUtilities } from '@/composable/utilities'
import { PACKAGE_INSTALLATION_COMMAND_ID } from '@/__tests__/end-to-end/helpers/elementsIds'

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
    expect(
      wrapper
        .find(`#${PACKAGE_INSTALLATION_COMMAND_ID}`)
        .text()
    ).toBe(
      `pip install --index-url ${pythonPackage.repository?.publicationUri} ${pythonPackage.name}`
    )
  })

  it('display correct installation command Python with authentication', async () => {
    packageDetailsStore = usePackageDetailsStore()
    packageDetailsStore.packageBag = pythonPackage2
    await nextTick(() => {})
    expect(
      wrapper
        .find(`#${PACKAGE_INSTALLATION_COMMAND_ID}`)
        .text()
    ).toBe(
      `crane pip install --index-url ${pythonPackage2.repository?.publicationUri} ${pythonPackage2.name}`
    )
  })

  it('display proper info when repository is not published', async () => {
    const packageDetailsStore = usePackageDetailsStore()
    const { deepCopy } = useUtilities()
    const localPackage = deepCopy(RPackage)
    localPackage.repository.published = false
    packageDetailsStore.packageBag = localPackage
    await nextTick(() => {})
    expect(wrapper.text()).toContain(
      'packageDetails.installation.noInstallInstruction'
    )
  })

  it('display correct installation command R no authentication', async () => {
    const packageDetailsStore = usePackageDetailsStore()
    packageDetailsStore.packageBag = RPackage
    const pkg = RPackage
    await nextTick(() => {})
    expect(
      wrapper
        .find(`#${PACKAGE_INSTALLATION_COMMAND_ID}`)
        .text()
    ).toBe(
      `install.packages("${pkg.name}", repos = c("rdepot_${pkg.repository.name}" = "${pkg.repository.publicationUri}", getOption("repos")))`
    )
  })

  it('display correct installation command R with authentication', async () => {
    const packageDetailsStore = usePackageDetailsStore()
    packageDetailsStore.packageBag = RPackage2
    const pkg = RPackage2
    await nextTick(() => {})
    expect(
      wrapper
        .find(`#${PACKAGE_INSTALLATION_COMMAND_ID}`)
        .text()
    ).toBe(
      `install.packages("${pkg.name}", repos = c("rdepot_${pkg.repository.name}" = "${pkg.repository.publicationUri}", getOption("repos")))`
    )
  })

  it('display correct installation command binary R no authentication', async () => {
    const packageDetailsStore = usePackageDetailsStore()
    packageDetailsStore.packageBag = RBinaryPackage
    const pkg = RBinaryPackage
    await nextTick(() => {})
    expect(
      wrapper
        .find(`#${PACKAGE_INSTALLATION_COMMAND_ID}`)
        .text()
    ).toBe(
      `install.packages("${pkg.name}", repos = c("rdepot_${pkg.repository.name}_binary" = "${pkg.repository.publicationUri}/linux/${pkg.distribution}", "rdepot_${pkg.repository.name}_source" = "${pkg.repository.publicationUri}", getOption("repos")), headers = c("User-Agent" = getOption("HTTPUserAgent")))`
    )
  })

  it('display correct installation command binary R with authentication', async () => {
    const packageDetailsStore = usePackageDetailsStore()
    packageDetailsStore.packageBag = RBinaryPackage2
    const pkg = RBinaryPackage2
    await nextTick(() => {})
    expect(
      wrapper
        .find(`#${PACKAGE_INSTALLATION_COMMAND_ID}`)
        .text()
    ).toBe(
      `install.packages("${pkg.name}", repos = c("rdepot_${pkg.repository.name}_binary" = "${pkg.repository.publicationUri}/linux/${pkg.distribution}", "rdepot_${pkg.repository.name}_source" = "${pkg.repository.publicationUri}", getOption("repos")), headers = c("User-Agent" = getOption("HTTPUserAgent")))`
    )
  })
})
