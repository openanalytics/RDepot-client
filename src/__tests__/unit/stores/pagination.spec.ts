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

import { useCommonStore } from '@/store/common'
import { usePagination } from '@/store/pagination'
import { useSortStore } from '@/store/sort'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

describe('Pagination Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Starting values', () => {
    const paginationStore = usePagination()
    expect(paginationStore.page).toEqual(1)
    expect(paginationStore.fetchPage).toEqual(0)
    expect(paginationStore.pageSize).toEqual(10)
    expect(paginationStore.totalNumber).toEqual(0)
    expect(paginationStore.itemsPerPage).toEqual([
      {
        value: 10,
        title: '10',
        props: { id: 'page-items-10' }
      },
      {
        value: 20,
        title: '20',
        props: { id: 'page-items-20' }
      },
      {
        value: 30,
        title: '30',
        props: { id: 'page-items-30' }
      },
      {
        value: 50,
        title: '50',
        props: { id: 'page-items-50' }
      },
      {
        value: 100,
        title: '100',
        props: { id: 'page-items-100' }
      }
    ])
    expect(paginationStore.howManyPages).toEqual(0)
    expect(paginationStore.totalVisiblePages).toEqual(10)
  })

  it('Set new page', () => {
    const paginationStore = usePagination()
    const commonStore = useCommonStore()
    expect(commonStore.key).toEqual(0)
    paginationStore.newPage(2)
    expect(paginationStore.page).toEqual(2)
    expect(commonStore.key).toEqual(1)
  })

  it('reset page', () => {
    const paginationStore = usePagination()
    const commonStore = useCommonStore()
    expect(commonStore.key).toEqual(0)
    paginationStore.page = 2
    paginationStore.resetPage()
    expect(paginationStore.page).toEqual(1)
    expect(commonStore.key).toEqual(1)
  })

  it('set page size', () => {
    const paginationStore = usePagination()
    const commonStore = useCommonStore()
    expect(commonStore.key).toEqual(0)
    paginationStore.newPageSize(20)
    expect(paginationStore.pageSize).toEqual(20)
    expect(commonStore.key).toEqual(1)
  })

  it('recalculate howManyPages value', async () => {
    const paginationStore = usePagination()
    expect(paginationStore.howManyPages).toEqual(0)
    paginationStore.totalNumber = 21
    paginationStore.pageSize = 5
    await nextTick()
    expect(paginationStore.howManyPages).toEqual(5)
  })

  it('new page without refresh', async () => {
    const paginationStore = usePagination()
    const commonStore = useCommonStore()
    expect(commonStore.key).toEqual(0)
    paginationStore.newPageWithoutRefresh(3)
    expect(paginationStore.page).toEqual(4)
  })

  it('new page size without refresh', async () => {
    const paginationStore = usePagination()
    const commonStore = useCommonStore()
    expect(commonStore.key).toEqual(0)
    paginationStore.newPageSizeWithoutRefresh(3)
    expect(paginationStore.pageSize).toEqual(3)
  })

  it('Reset store', () => {
    const sortStore = useSortStore()
    expect(sortStore.field).toEqual('name')
    expect(sortStore.direction).toEqual('asc')
  })
})
