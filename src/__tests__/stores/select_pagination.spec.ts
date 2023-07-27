/*
 * R Depot
 *
 * Copyright (C) 2012-2023 Open Analytics NV
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
    const select_pagination = useSelectStore('packages')
    expect(select_pagination.items).toEqual([])
    expect(select_pagination.pending).toEqual(false)
    expect(select_pagination.paginationData).toEqual({
      page: 0,
      totalNumber: -1
    })
  })

  it('Set pending', () => {
    const select_pagination = useSelectStore('packages')
    select_pagination.pending = true
    expect(select_pagination.pending).toEqual(true)
  })

  it('Add new items - display only unique values', () => {
    const select_pagination = useSelectStore('packages')
    select_pagination.addItems(['item1', 'item2', 'item3'])
    select_pagination.addItems(['item4', 'item2', 'item3'])
    expect(select_pagination.items).toEqual([
      'item1',
      'item2',
      'item3',
      'item4'
    ])
  })

  it('Reset items', () => {
    const select_pagination = useSelectStore('packages')
    select_pagination.addItems(['item1', 'item2', 'item3'])
    expect(select_pagination.items).toEqual([
      'item1',
      'item2',
      'item3'
    ])
    select_pagination.resetItems()
    expect(select_pagination.items).toEqual([])
  })

  it('Set pagination data which should change the fetched status', () => {
    const select_pagination = useSelectStore('packages')
    select_pagination.paginationData = {
      page: 2,
      totalNumber: 3
    }
    select_pagination.addItems(['item1', 'item2', 'item3'])
    expect(select_pagination.ifAllFetched).toEqual(true)
  })
})
