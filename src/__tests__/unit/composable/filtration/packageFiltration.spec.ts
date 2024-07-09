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
  vi
} from 'vitest'

import { createPinia, setActivePinia } from 'pinia'
import { useSelectStore } from '@/store/selectPagination'
import { useAuthorizationStore } from '@/store/authorization'
import { usePackagesFiltration } from '@/composable/filtration/packagesFiltration'
import { usePackagesStore } from '@/store/packages'

beforeEach(async () => {
  setActivePinia(createPinia())
  const authorizationStore = useAuthorizationStore()
  authorizationStore.me.role = 'admin'
})

describe('package filtration filtration composable', () => {
  it('should trigger reset items during pagination reset', () => {
    const { resetPaginationPackages } =
      usePackagesFiltration()
    const selectStore: any = useSelectStore('packages')
    const spy = vi.spyOn(selectStore, 'resetItems')
    resetPaginationPackages()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should trigger reset pagination during pagination reset', () => {
    const { resetPaginationPackages } =
      usePackagesFiltration()
    const selectStore = useSelectStore('packages')
    const spy = vi.spyOn(selectStore, 'resetPagination')
    resetPaginationPackages()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should load packages', () => {
    const { loadPackagesObjects } = usePackagesFiltration()
    const selectStore = useSelectStore('packages')
    selectStore.items = [{ title: 'title', value: 'value' }]
    const packagesStore = usePackagesStore()
    selectStore.paginationData.totalNumber = 2
    selectStore.paginationData.page = 0
    selectStore.pageSize = 1
    const spy = vi.spyOn(packagesStore, 'fetchPackagesList')
    loadPackagesObjects('Albert Einstein', 'testrepo3')
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should load packages if total number is less then 0', () => {
    const { loadPackagesObjects } = usePackagesFiltration()
    const selectStore = useSelectStore('packages')
    selectStore.items = [{ title: 'title', value: 'value' }]
    const packagesStore = usePackagesStore()
    const spy = vi.spyOn(packagesStore, 'fetchPackagesList')
    loadPackagesObjects('Albert Einstein', 'testrepo3')
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should not load packages if all are fetched', () => {
    const { loadPackagesObjects } = usePackagesFiltration()
    const selectStore = useSelectStore('packages')
    selectStore.items = [{ title: 'title', value: 'value' }]
    const packagesStore = usePackagesStore()
    selectStore.paginationData.totalNumber = 1
    selectStore.paginationData.page = 1
    selectStore.pageSize = 1
    const spy = vi.spyOn(packagesStore, 'fetchPackagesList')
    loadPackagesObjects('Albert Einstein', 'testrepo3')
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should set new filtration if new value is different then the search field', () => {
    const { filtratePackagesObjects } =
      usePackagesFiltration()
    const packagesStore = usePackagesStore()

    packagesStore.filtration.search = 'value'
    filtratePackagesObjects('value2')
    expect(packagesStore.filtration.search).toEqual(
      'value2'
    )
  })
})
