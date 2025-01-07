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

import { describe, it, expect, beforeEach } from 'vitest'

import { createPinia, setActivePinia } from 'pinia'
import { useUtilities } from '@/composable/utilities'

beforeEach(async () => {
  setActivePinia(createPinia())
})

describe('utilities composable', () => {
  it('should deep copy an object', () => {
    const { deepCopy } = useUtilities()
    const a = {
      name: 'name',
      lastName: 'lastName',
      birthDate: {
        month: 12,
        day: 30,
        year: 1980
      }
    }
    const b = deepCopy(a)
    b.birthDate.day = 20
    b.name = 'name2'

    expect(a.name).toEqual('name')
    expect(a.birthDate.day).toEqual(30)

    expect(b.name).toEqual('name2')
    expect(b.lastName).toEqual('lastName')
    expect(b.birthDate.month).toEqual(12)
    expect(b.birthDate.year).toEqual(1980)
    expect(b.birthDate.day).toEqual(20)

    a.lastName = 'lastName2'
    expect(a.lastName).toEqual('lastName2')
    expect(b.lastName).toEqual('lastName')

    expect(typeof b).toEqual('object')
  })

  it('should deep copy an object with any type', () => {
    const { deepCopyAny } = useUtilities()
    const a = { value: 'one two three' }
    const b = deepCopyAny(a)

    expect(b.value).toEqual('one two three')
    b.value = 'four five six'

    expect(a.value).toEqual('one two three')
    expect(b.value).toEqual('four five six')
  })

  it('should return non escaped text in code section', () => {
    const { renderer } = useUtilities()
    const result = renderer.code('&<>"\'', undefined, true)

    expect(
      result.replaceAll(' ', '').replaceAll('\n', '')
    ).toContain('<code>&<>"\'</code>')
  })

  it('should return escaped text in code section', () => {
    const { renderer } = useUtilities()
    const result = renderer.code('&<>"\'', undefined, false)
    expect(
      result.replaceAll(' ', '').replaceAll('\n', '')
    ).toContain('<code>&amp;&lt;&gt;&quot;&#39;</code>')
  })
})
