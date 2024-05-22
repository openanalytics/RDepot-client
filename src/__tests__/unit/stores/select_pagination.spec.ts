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

import { useSelectStore } from '@/store/select_pagination'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Select Pagination Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Starting values', () => {
    const selectPaginationStore = useSelectStore('packages')
    expect(selectPaginationStore.items).toEqual([])
    expect(selectPaginationStore.pending).toEqual(false)
    expect(selectPaginationStore.paginationData).toEqual({
      page: 0,
      totalNumber: -1
    })
  })

  it('Set pending', () => {
    const selectPaginationStore = useSelectStore('packages')
    selectPaginationStore.pending = true
    expect(selectPaginationStore.pending).toEqual(true)
  })

  it('Add new items - display only unique values', () => {
    const selectPaginationStore = useSelectStore('packages')
    selectPaginationStore.addItems([
      'item1',
      'item2',
      'item3'
    ])
    selectPaginationStore.addItems([
      'item4',
      'item2',
      'item3'
    ])
    expect(selectPaginationStore.items).toEqual([
      'item1',
      'item2',
      'item3',
      'item4'
    ])
  })

  it('Reset items', () => {
    const selectPaginationStore = useSelectStore('packages')
    selectPaginationStore.addItems([
      'item1',
      'item2',
      'item3'
    ])
    expect(selectPaginationStore.items).toEqual([
      'item1',
      'item2',
      'item3'
    ])
    selectPaginationStore.resetItems()
    expect(selectPaginationStore.items).toEqual([])
  })

  it('Set pagination data which should change the fetched status', () => {
    const selectPaginationStore = useSelectStore('packages')
    selectPaginationStore.paginationData = {
      page: 2,
      totalNumber: 3
    }
    selectPaginationStore.addItems([
      'item1',
      'item2',
      'item3'
    ])
    expect(selectPaginationStore.ifAllFetched).toEqual(true)
  })
})
