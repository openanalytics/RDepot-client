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

import { describe, it, expect, beforeEach } from 'vitest'

import { createPinia, setActivePinia } from 'pinia'
import { useSort } from '@/composable/sort'
import { Sort } from '@/models/DataTableOptions'

const defaultSort: Sort[] = [{ key: 'user', order: 'asc' }]
const newSort: Sort[] = [{ key: 'name', order: 'desc' }]
let sortBy: Sort[]

beforeEach(async () => {
  setActivePinia(createPinia())
  sortBy = defaultSort
})

describe('sort composable', () => {
  it('should return default sort value', () => {
    const { getSort } = useSort()
    sortBy = getSort([], defaultSort)
    expect(sortBy).toEqual(defaultSort)
  })

  it('should return new sort value', () => {
    const { getSort } = useSort()
    sortBy = getSort(newSort, defaultSort)
    expect(sortBy).toEqual(newSort)
  })
})
