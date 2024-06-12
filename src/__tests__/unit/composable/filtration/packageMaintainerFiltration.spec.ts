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
import { useSelectStore } from '@/store/select_pagination'
import { usePackageMaintainersFiltration } from '@/composable/filtration/packageMaintainersFiltration'
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import { useAuthorizationStore } from '@/store/authorization'

beforeEach(async () => {
  setActivePinia(createPinia())
  const authorizationStore = useAuthorizationStore()
  authorizationStore.me.role = 'admin'
})

describe('package maintainer filtration composable', () => {
  it('should trigger reset items during pagination reset', () => {
    const { resetPaginationMaintainers } =
      usePackageMaintainersFiltration()
    const selectStore: any = useSelectStore(
      'packageMaintainers'
    )
    const spy = vi.spyOn(selectStore, 'resetItems')
    resetPaginationMaintainers()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should trigger reset pagination during pagination reset', () => {
    const { resetPaginationMaintainers } =
      usePackageMaintainersFiltration()
    const selectStore = useSelectStore('packageMaintainers')
    const spy = vi.spyOn(selectStore, 'resetPagination')
    resetPaginationMaintainers()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should load maintainers', () => {
    const { loadMaintainers } =
      usePackageMaintainersFiltration()
    const selectStore = useSelectStore('packageMaintainers')
    selectStore.items = [{ title: 'title', value: 'value' }]
    const packageMaintainerStore =
      usePackageMaintainersStore()
    selectStore.paginationData.totalNumber = 2
    selectStore.paginationData.page = 1
    selectStore.pageSize = 1
    const spy = vi.spyOn(
      packageMaintainerStore,
      'fetchMaintainersList'
    )
    loadMaintainers()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should load maintainers if total number is less then 0', () => {
    const { loadMaintainers } =
      usePackageMaintainersFiltration()
    const selectStore = useSelectStore('packageMaintainers')
    selectStore.items = [{ title: 'title', value: 'value' }]
    const packageMaintainerStore =
      usePackageMaintainersStore()
    const spy = vi.spyOn(
      packageMaintainerStore,
      'fetchMaintainersList'
    )
    loadMaintainers()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should not load maintainers if all are fetched', () => {
    const { loadMaintainers } =
      usePackageMaintainersFiltration()
    const selectStore = useSelectStore('packageMaintainers')
    selectStore.items = [{ title: 'title', value: 'value' }]
    const packageMaintainerStore =
      usePackageMaintainersStore()
    selectStore.paginationData.totalNumber = 1
    selectStore.paginationData.page = 1
    selectStore.pageSize = 1
    const spy = vi.spyOn(
      packageMaintainerStore,
      'fetchMaintainersList'
    )
    loadMaintainers()
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should clear filtration if value equals to undefined', () => {
    const { filtrateMaintainers } =
      usePackageMaintainersFiltration()
    const packageMaintainerStore =
      usePackageMaintainersStore()
    const spy = vi.spyOn(
      packageMaintainerStore,
      'clearFiltration'
    )
    filtrateMaintainers(undefined)
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should not set new filtration if value equals to undefined', () => {
    const { filtrateMaintainers } =
      usePackageMaintainersFiltration()
    const packageMaintainerStore =
      usePackageMaintainersStore()
    const spy = vi.spyOn(
      packageMaintainerStore,
      'setFiltrationByName'
    )
    filtrateMaintainers(undefined)
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should set new filtration if new value is different then the search field', () => {
    const { filtrateMaintainers } =
      usePackageMaintainersFiltration()
    const packageMaintainerStore =
      usePackageMaintainersStore()

    packageMaintainerStore.filtration.search = 'value'
    const spy = vi.spyOn(
      packageMaintainerStore,
      'setFiltrationByName'
    )
    filtrateMaintainers('value2')
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should not set new filtration if new value equals to search field', () => {
    const { filtrateMaintainers } =
      usePackageMaintainersFiltration()
    const packageMaintainerStore =
      usePackageMaintainersStore()

    packageMaintainerStore.filtration.search = 'value'
    const spy = vi.spyOn(
      packageMaintainerStore,
      'setFiltrationByName'
    )
    filtrateMaintainers('value')
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should not clear filtration if new value is provided', () => {
    const { filtrateMaintainers } =
      usePackageMaintainersFiltration()
    const packageMaintainerStore =
      usePackageMaintainersStore()

    packageMaintainerStore.filtration.search = 'value'
    const spy = vi.spyOn(
      packageMaintainerStore,
      'clearFiltration'
    )
    filtrateMaintainers('value')
    expect(spy).toHaveBeenCalledTimes(0)
  })
})
