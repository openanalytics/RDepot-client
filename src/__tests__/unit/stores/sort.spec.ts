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

import { useSortStore } from '@/store/sort'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Sort Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Starting values', () => {
    const sortStore = useSortStore()
    expect(sortStore.field).toEqual('name')
    expect(sortStore.direction).toEqual('asc')
  })

  it('Set new field', () => {
    const sortStore = useSortStore()
    sortStore.setField('user')
    expect(sortStore.field).toEqual('user')
    expect(sortStore.direction).toEqual('asc')
  })

  it('Set the same field', () => {
    const sortStore = useSortStore()
    sortStore.setField('name')
    expect(sortStore.field).toEqual('name')
    expect(sortStore.direction).toEqual('desc')
  })

  it('Reset store', () => {
    const sortStore = useSortStore()
    expect(sortStore.field).toEqual('name')
    expect(sortStore.direction).toEqual('asc')
  })
})
