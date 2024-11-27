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
import { useUsersFiltration } from '@/composable/filtration/usersFiltration'
import { useUserStore } from '@/store/options/users'

beforeEach(async () => {
  setActivePinia(createPinia())
  const authorizationStore = useAuthorizationStore()
  authorizationStore.me.role = 'admin'
})

describe('user filtration filtration composable', () => {
  it('should trigger reset items during pagination reset', () => {
    const { resetPaginationUsers } = useUsersFiltration()
    const selectStore: any = useSelectStore('user')
    const spy = vi.spyOn(selectStore, 'resetItems')
    resetPaginationUsers()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should trigger reset pagination during pagination reset', () => {
    const { resetPaginationUsers } = useUsersFiltration()
    const selectStore = useSelectStore('user')
    const spy = vi.spyOn(selectStore, 'resetPagination')
    resetPaginationUsers()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should load user objects', () => {
    const { loadUsersObjects } = useUsersFiltration()
    const selectStore = useSelectStore('user')
    selectStore.items = [{ title: 'title', value: 'value' }]
    const userStore = useUserStore()
    selectStore.paginationData.totalNumber = 2
    selectStore.paginationData.page = 0
    selectStore.paginationData.totalPages = 2
    selectStore.pageSize = 1
    const spy = vi.spyOn(userStore, 'getList')
    loadUsersObjects()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should load user objects if total number is less then 0', () => {
    const { loadUsersObjects } = useUsersFiltration()
    const selectStore = useSelectStore('user')
    selectStore.items = [{ title: 'title', value: 'value' }]
    const userStore = useUserStore()
    const spy = vi.spyOn(userStore, 'getList')
    loadUsersObjects()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should not load user objects if all are fetched', () => {
    const { loadUsersObjects } = useUsersFiltration()
    const selectStore = useSelectStore('user')
    selectStore.items = [{ title: 'title', value: 'value' }]
    const userStore = useUserStore()
    selectStore.paginationData.totalNumber = 1
    selectStore.paginationData.page = 1
    selectStore.pageSize = 1
    const spy = vi.spyOn(userStore, 'getList')
    loadUsersObjects()
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should load users', () => {
    const { loadUsers } = useUsersFiltration()
    const selectStore = useSelectStore('user')
    selectStore.items = [{ title: 'title', value: 'value' }]
    const userStore = useUserStore()
    selectStore.paginationData.totalNumber = 2
    selectStore.paginationData.page = 0
    selectStore.paginationData.totalPages = 2
    selectStore.pageSize = 1
    const spy = vi.spyOn(userStore, 'getList')
    loadUsers()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should load users if total number is less then 0', () => {
    const { loadUsers } = useUsersFiltration()
    const selectStore = useSelectStore('user')
    selectStore.items = [{ title: 'title', value: 'value' }]
    const userStore = useUserStore()
    const spy = vi.spyOn(userStore, 'getList')
    loadUsers()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should not load users if all are fetched', () => {
    const { loadUsers } = useUsersFiltration()
    const selectStore = useSelectStore('user')
    selectStore.items = [{ title: 'title', value: 'value' }]
    const userStore = useUserStore()
    selectStore.paginationData.totalNumber = 1
    selectStore.paginationData.page = 1
    selectStore.pageSize = 1
    const spy = vi.spyOn(userStore, 'getList')
    loadUsers()
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should clear filtration if value equals to undefined', () => {
    const { filtrateUsers } = useUsersFiltration()
    const userStore = useUserStore()
    const spy = vi.spyOn(userStore, 'clearFiltration')
    filtrateUsers(undefined)
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should not set new filtration if value equals to undefined', () => {
    const { filtrateUsers } = useUsersFiltration()
    const userStore = useUserStore()
    const spy = vi.spyOn(userStore, 'setFiltrationBy')
    filtrateUsers(undefined)
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should set new filtration if new value is different then the search field', () => {
    const { filtrateUsers } = useUsersFiltration()
    const userStore = useUserStore()
    userStore.filtration.search = 'value'
    const spy = vi.spyOn(userStore, 'setFiltrationBy')
    filtrateUsers('value2')
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should not set new filtration if new value equals to search field', () => {
    const { filtrateUsers } = useUsersFiltration()
    const userStore = useUserStore()
    userStore.filtration.search = 'value'
    const spy = vi.spyOn(userStore, 'setFiltrationBy')
    filtrateUsers('value')
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should not clear filtration if new value is provided', () => {
    const { filtrateUsers } = useUsersFiltration()
    const userStore = useUserStore()
    userStore.filtration.search = 'value'
    const spy = vi.spyOn(userStore, 'clearFiltration')
    filtrateUsers('value')
    expect(spy).toHaveBeenCalledTimes(0)
  })
})
