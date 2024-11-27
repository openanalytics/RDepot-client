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
import { useSelectStore } from '@/store/setup/selectPagination'
import { useAuthorizationStore } from '@/store/options/authorization'
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'
import { useRepositoryStore } from '@/store/options/repositories'

beforeEach(async () => {
  setActivePinia(createPinia())
  const authorizationStore = useAuthorizationStore()
  authorizationStore.me.role = 'admin'
})

describe('repositories filtration composable', () => {
  it('should trigger reset items during pagination reset', () => {
    const { resetRepositoriesPagination } =
      useRepositoriesFiltration()
    const selectStore: any = useSelectStore('repositories')
    const spy = vi.spyOn(selectStore, 'resetItems')
    resetRepositoriesPagination()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should trigger reset pagination during pagination reset', () => {
    const { resetRepositoriesPagination } =
      useRepositoriesFiltration()
    const selectStore = useSelectStore('repositories')
    const spy = vi.spyOn(selectStore, 'resetPagination')
    resetRepositoriesPagination()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should load repositories', () => {
    const { loadRepositories } = useRepositoriesFiltration()
    const selectStore = useSelectStore('repositories')
    selectStore.items = [{ title: 'title', value: 'value' }]
    const repositoriesStore = useRepositoryStore()
    selectStore.paginationData.totalNumber = 2
    selectStore.paginationData.page = 0
    selectStore.paginationData.totalPages = 2
    selectStore.pageSize = 1
    const spy = vi.spyOn(repositoriesStore, 'getList')
    loadRepositories()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should load repositories if total number is less then 0', () => {
    const { loadRepositories } = useRepositoriesFiltration()
    const selectStore = useSelectStore('repositories')
    selectStore.items = [{ title: 'title', value: 'value' }]
    const repositoriesStore = useRepositoryStore()
    const spy = vi.spyOn(repositoriesStore, 'getList')
    loadRepositories()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should not load repositories if all are fetched', () => {
    const { loadRepositories } = useRepositoriesFiltration()
    const selectStore = useSelectStore('repositories')
    selectStore.items = [{ title: 'title', value: 'value' }]
    const repositoriesStore = useRepositoryStore()
    selectStore.paginationData.totalNumber = 1
    selectStore.paginationData.page = 1
    selectStore.pageSize = 1
    const spy = vi.spyOn(repositoriesStore, 'getList')
    loadRepositories()
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should load repositories objects', () => {
    const { loadRepositoriesObjects } =
      useRepositoriesFiltration()
    const selectStore = useSelectStore('repositories')
    selectStore.items = [{ title: 'title', value: 'value' }]
    const repositoriesStore = useRepositoryStore()
    selectStore.paginationData.totalNumber = 2
    selectStore.paginationData.page = 0
    selectStore.paginationData.totalPages = 2
    selectStore.pageSize = 1
    const spy = vi.spyOn(repositoriesStore, 'getList')
    loadRepositoriesObjects()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should load repositories objects if total number is less then 0', () => {
    const { loadRepositoriesObjects } =
      useRepositoriesFiltration()
    const selectStore = useSelectStore('repositories')
    selectStore.items = [{ title: 'title', value: 'value' }]
    const repositoriesStore = useRepositoryStore()
    const spy = vi.spyOn(repositoriesStore, 'getList')
    loadRepositoriesObjects()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should not load repositories objects if all are fetched', () => {
    const { loadRepositoriesObjects } =
      useRepositoriesFiltration()
    const selectStore = useSelectStore('repositories')
    selectStore.items = [{ title: 'title', value: 'value' }]
    const repositoriesStore = useRepositoryStore()
    selectStore.paginationData.totalNumber = 1
    selectStore.paginationData.page = 1
    selectStore.pageSize = 1
    const spy = vi.spyOn(repositoriesStore, 'getList')
    loadRepositoriesObjects()
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should clear filtration if value equals to undefined', () => {
    const { filtrateRepositoriesObjects } =
      useRepositoriesFiltration()
    const repositoriesStore = useRepositoryStore()
    const spy = vi.spyOn(
      repositoriesStore,
      'clearFiltration'
    )
    filtrateRepositoriesObjects(undefined)
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should not set new filtration if value equals to undefined', () => {
    const { filtrateRepositoriesObjects } =
      useRepositoriesFiltration()
    const repositoriesStore = useRepositoryStore()
    const spy = vi.spyOn(
      repositoriesStore,
      'setFiltrationBy'
    )
    filtrateRepositoriesObjects(undefined)
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should set new filtration if new value is different then the name field', () => {
    const { filtrateRepositoriesObjects } =
      useRepositoriesFiltration()
    const repositoriesStore = useRepositoryStore()
    const spy = vi.spyOn(
      repositoriesStore,
      'setFiltrationBy'
    )
    repositoriesStore.filtration.name = 'value'
    filtrateRepositoriesObjects('value2')
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should not set new filtration if new value equals to name field', () => {
    const { filtrateRepositoriesObjects } =
      useRepositoriesFiltration()
    const repositoriesStore = useRepositoryStore()
    const spy = vi.spyOn(
      repositoriesStore,
      'setFiltrationBy'
    )
    repositoriesStore.filtration.name = 'value'
    filtrateRepositoriesObjects('value')
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should not clear filtration if new value is provided', () => {
    const { filtrateRepositoriesObjects } =
      useRepositoriesFiltration()
    const repositoriesStore = useRepositoryStore()
    const spy = vi.spyOn(
      repositoriesStore,
      'setFiltrationBy'
    )
    repositoriesStore.filtration.name = 'value'
    filtrateRepositoriesObjects('value')
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should not update filtration if new value is undefined', () => {
    const { filtrateRepositories } =
      useRepositoriesFiltration()
    const repositoriesStore = useRepositoryStore()
    const spy = vi.spyOn(
      repositoriesStore,
      'setFiltrationBy'
    )
    filtrateRepositories(undefined)
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should not update filtration if new value is undefined', () => {
    const { filtrateRepositories } =
      useRepositoriesFiltration()
    const repositoriesStore = useRepositoryStore()
    const spy = vi.spyOn(
      repositoriesStore,
      'setFiltrationBy'
    )
    repositoriesStore.filtration.name = 'value'
    filtrateRepositories('value')
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should update filtration if new value is defined and different than the name', () => {
    const { filtrateRepositories } =
      useRepositoriesFiltration()
    const repositoriesStore = useRepositoryStore()
    const spy = vi.spyOn(
      repositoriesStore,
      'setFiltrationBy'
    )
    repositoriesStore.filtration.name = 'value'
    filtrateRepositories('value2')
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
