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

import {
  describe,
  it,
  expect,
  beforeEach,
  vi
} from 'vitest'

import { createPinia, setActivePinia } from 'pinia'
import { useSelectStore } from '@/store/setup/selectPagination'
import { useAuthorizationStore } from '@/store/options/authorization'
import { useRepositoryMaintainersFiltration } from '@/composable/filtration/repositoryMaintainersFiltration'
import { useRepositoryMaintainersStore } from '@/store/options/repositoryMaintainers'

beforeEach(async () => {
  setActivePinia(createPinia())
  const authorizationStore = useAuthorizationStore()
  authorizationStore.me.role = 'admin'
})

describe('repository maintainer filtration composable', () => {
  it('should trigger reset items during pagination reset', () => {
    const { resetPaginationMaintainers } =
      useRepositoryMaintainersFiltration()
    const selectStore: any = useSelectStore(
      'repositoryMaintainers'
    )
    const spy = vi.spyOn(selectStore, 'resetItems')
    resetPaginationMaintainers()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should trigger reset pagination during pagination reset', () => {
    const { resetPaginationMaintainers } =
      useRepositoryMaintainersFiltration()
    const selectStore = useSelectStore(
      'repositoryMaintainers'
    )
    const spy = vi.spyOn(selectStore, 'resetPagination')
    resetPaginationMaintainers()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should load maintainers', () => {
    const { loadMaintainers } =
      useRepositoryMaintainersFiltration()
    const selectStore = useSelectStore(
      'repositoryMaintainers'
    )
    selectStore.items = [{ title: 'title', value: 'value' }]
    const repositoryMaintainerStore =
      useRepositoryMaintainersStore()
    selectStore.paginationData.totalNumber = 2
    selectStore.paginationData.page = 0
    selectStore.paginationData.totalPages = 2
    selectStore.pageSize = 1
    const spy = vi.spyOn(
      repositoryMaintainerStore,
      'getList'
    )
    loadMaintainers()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should load maintainers if total number is less then 0', () => {
    const { loadMaintainers } =
      useRepositoryMaintainersFiltration()
    const selectStore = useSelectStore(
      'repositoryMaintainers'
    )
    selectStore.items = [{ title: 'title', value: 'value' }]
    const repositoryMaintainerStore =
      useRepositoryMaintainersStore()
    const spy = vi.spyOn(
      repositoryMaintainerStore,
      'getList'
    )
    loadMaintainers()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should not load maintainers if all are fetched', () => {
    const { loadMaintainers } =
      useRepositoryMaintainersFiltration()
    const selectStore = useSelectStore(
      'repositoryMaintainers'
    )
    selectStore.items = [{ title: 'title', value: 'value' }]
    const repositoryMaintainerStore =
      useRepositoryMaintainersStore()
    selectStore.paginationData.totalNumber = 1
    selectStore.paginationData.page = 1
    selectStore.pageSize = 1
    const spy = vi.spyOn(
      repositoryMaintainerStore,
      'getList'
    )
    loadMaintainers()
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should clear filtration if value equals to undefined', () => {
    const { filtrateMaintainers } =
      useRepositoryMaintainersFiltration()
    const repositoryMaintainerStore =
      useRepositoryMaintainersStore()
    const spy = vi.spyOn(
      repositoryMaintainerStore,
      'clearFiltration'
    )
    filtrateMaintainers(undefined)
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should not set new filtration if value equals to undefined', () => {
    const { filtrateMaintainers } =
      useRepositoryMaintainersFiltration()
    const repositoryMaintainerStore =
      useRepositoryMaintainersStore()
    const spy = vi.spyOn(
      repositoryMaintainerStore,
      'setFiltrationBy'
    )
    filtrateMaintainers(undefined)
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should set new filtration if new value is different then the search field', () => {
    const { filtrateMaintainers } =
      useRepositoryMaintainersFiltration()
    const repositoryMaintainerStore =
      useRepositoryMaintainersStore()
    repositoryMaintainerStore.filtration.search = 'value'
    const spy = vi.spyOn(
      repositoryMaintainerStore,
      'setFiltrationBy'
    )
    filtrateMaintainers('value2')
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should not set new filtration if new value equals to search field', () => {
    const { filtrateMaintainers } =
      useRepositoryMaintainersFiltration()
    const repositoryMaintainerStore =
      useRepositoryMaintainersStore()

    repositoryMaintainerStore.filtration.search = 'value'
    const spy = vi.spyOn(
      repositoryMaintainerStore,
      'setFiltrationBy'
    )
    filtrateMaintainers('value')
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should not clear filtration if new value is provided', () => {
    const { filtrateMaintainers } =
      useRepositoryMaintainersFiltration()
    const repositoryMaintainerStore =
      useRepositoryMaintainersStore()
    repositoryMaintainerStore.filtration.search = 'value'
    const spy = vi.spyOn(
      repositoryMaintainerStore,
      'clearFiltration'
    )
    filtrateMaintainers('value')
    expect(spy).toHaveBeenCalledTimes(0)
  })
})
