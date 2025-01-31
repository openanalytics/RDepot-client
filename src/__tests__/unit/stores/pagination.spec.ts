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

import { useOATable } from '@/store/setup/oatable'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Pagination Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Starting values', () => {
    const oaTableStore = useOATable()
    expect(oaTableStore.pageSize).toEqual(10)
    expect(oaTableStore.itemsPerPage).toEqual([
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
  })

  it('set page size', () => {
    const oaTableStore = useOATable()
    oaTableStore.setPageSize(30)
    expect(oaTableStore.pageSize).toEqual(30)
  })
})
