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
import { createPinia, setActivePinia } from 'pinia'
import { usePackagesStore } from '@/store/packages'
import PackagesListVue from '@/components/packages/PackagesList.vue'
import packages from '@/__tests__/config/mockData/packages.json'
import { useAuthorizationStore } from '@/store/authorization'
import me from '@/__tests__/config/mockData/me.json'
import { i18n } from '@/plugins/i18n'
import { usePagination } from '@/store/pagination'
import { nextTick } from 'vue'

let wrapper: any
let authorizationStore: any
let packagesStore: any

const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeAll(() => {
  setActivePinia(createPinia())
  packagesStore = usePackagesStore()
  const pagination = usePagination()
  pagination.page = 0
  pagination.pageSize = 10
  pagination.totalNumber = 23
  authorizationStore = useAuthorizationStore()
  authorizationStore.me = me.data
})

beforeEach(() => {
  wrapper = mount(PackagesListVue, {
    global: globalConfig
  })
  packagesStore.loading = false
  packagesStore.packages = packages.data.content
})

describe('Packages - list', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('displays data-table', async () => {
    const dataTable = wrapper.findComponent('.v-data-table')
    expect(dataTable.exists()).toBeTruthy()
  })

  it('displays one row per each package', async () => {
    const packagesRows = wrapper.findAllComponents('tr')
    expect(packagesRows.length).toEqual(
      packages.data.content.length
    )
  })
  it('displays no data available text', async () => {
    packagesStore.packages = []
    await nextTick()
    expect(wrapper.text()).toContain('No data available')
    expect(wrapper.findAllComponents('tr').length).toEqual(
      1
    )
  })
})

describe('Packages - list headers', () => {
  let headers: any

  beforeAll(() => {
    headers = wrapper.findAllComponents('th')
  })

  it('displays all headers', () => {
    expect(headers.length).toEqual(9)
  })
  it('displays package column', () => {
    const col = headers[0]
    expect(col.text()).toEqual(
      i18n.t('columns.package.name')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })
  it('displays version column', () => {
    const col = headers[1]
    expect(col.text()).toEqual(
      i18n.t('columns.package.version')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })
  it('displays title column', () => {
    const col = headers[2]
    expect(col.text()).toEqual(
      i18n.t('columns.package.title')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeFalsy()
  })
  it('displays maintainer column', () => {
    const col = headers[3]
    expect(col.text()).toEqual(
      i18n.t('columns.package.maintainer')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })
  it('displays repository  column', () => {
    const col = headers[4]
    expect(col.text()).toEqual(
      i18n.t('columns.package.repository')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })
  it('displays technology column', () => {
    const col = headers[5]
    expect(col.text()).toEqual(
      i18n.t('columns.package.technology')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })
  it('displays status column', () => {
    const col = headers[6]
    expect(col.text()).toEqual(
      i18n.t('columns.package.state')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })
  it('displays active column', () => {
    const col = headers[7]
    expect(col.text()).toEqual(
      i18n.t('columns.package.active')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })

  it('displays actions column', () => {
    const col = headers[8]
    expect(col.text()).toEqual(i18n.t('columns.actions'))
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeFalsy()
  })
})

describe('Packages - cells', () => {
  const waitingPackageIndex = 0
  const rejectedPackageIndex = 6
  const cancelledPackageIndex = 9
  const acceptedPackageIndex = 10

  let waitingCells: any
  let rejectedCells: any
  let cancelledCells: any
  let acceptedCells: any

  const packageBag =
    packages.data.content[acceptedPackageIndex]

  beforeAll(() => {
    acceptedCells = wrapper
      .findAllComponents('tr')
      [acceptedPackageIndex].findAllComponents('td')
    waitingCells = wrapper
      .findAllComponents('tr')
      [waitingPackageIndex].findAllComponents('td')
    rejectedCells = wrapper
      .findAllComponents('tr')
      [rejectedPackageIndex].findAllComponents('td')
    cancelledCells = wrapper
      .findAllComponents('tr')
      [cancelledPackageIndex].findAllComponents('td')
  })

  it('displays package name', () => {
    const cell = acceptedCells[0]
    expect(cell.text()).toBe(packageBag.name)
  })
  it('displays version', () => {
    const cell = acceptedCells[1]
    expect(cell.text()).toBe(packageBag.version)
  })
  it('displays title', () => {
    const cell = acceptedCells[2]
    expect(cell.text()).toBe(packageBag.title)
  })
  it('displays maintainer', () => {
    const cell = acceptedCells[3]
    expect(cell.text()).toBe(packageBag.user.name)
  })
  it('displays repository', () => {
    const cell = acceptedCells[4]
    expect(cell.text()).toBe(packageBag.repository.name)
  })
  it('displays technology', () => {
    const cell = acceptedCells[5]
    const chip = cell.findComponent('.v-chip')
    expect(chip.exists()).toBeTruthy()
    expect(chip.text()).toBe(packageBag.technology)
  })
  it('displays status (accepted)', () => {
    const cell = acceptedCells[6]
    const icon = cell.findComponent(
      '.mdi-check-circle-outline'
    )
    expect(icon.exists()).toBeTruthy()
  })
  it('displays status (waiting)', () => {
    const cell = waitingCells[6]
    const icon = cell.findComponent(
      '.mdi-progress-question'
    )
    expect(icon.exists()).toBeTruthy()
  })
  it('displays status (rejected)', () => {
    const cell = rejectedCells[6]
    const icon = cell.findComponent(
      '.mdi-close-circle-outline'
    )
    expect(icon.exists()).toBeTruthy()
  })
  it('displays status (cancelled)', () => {
    const cell = cancelledCells[6]
    const icon = cell.findComponent(
      '.mdi-close-circle-outline'
    )
    expect(icon.exists()).toBeTruthy()
  })
  it('displays active column', () => {
    const checkboxActive = wrapper.find(
      '#checkbox-active-accrued-1-4-testrepo2'
    )
    expect(checkboxActive.element.checked).toEqual(
      packageBag.active
    )
  })

  it('displays actions column', () => {
    expect(wrapper.find('#delete-icon').isVisible()).toBe(
      true
    )
  })
})
