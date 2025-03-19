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
import { useDates } from '@/composable/date'
import event from '@/__tests__/config/mockData/event.json'
import { EntityModelNewsfeedEventDto } from '@/openapi'

beforeEach(async () => {
  setActivePinia(createPinia())
})

describe('date composable', () => {
  it('should return that it is not year and month', () => {
    const { isYearAndMonthDate } = useDates()
    const date = '2024.05.20'
    expect(isYearAndMonthDate(date)).toBeFalsy()
  })

  it('should return that it is year and month', () => {
    const { isYearAndMonthDate } = useDates()
    const date = '2024.05'
    expect(isYearAndMonthDate(date)).toBeTruthy()
  })

  it('should return month and year', () => {
    const { getMonthAndYear } = useDates()
    const date = '2024.05.20'
    expect(getMonthAndYear(date)).toEqual('2024.05')
  })

  it('should return parsed and formatted date in UTC format', () => {
    const { getDate } = useDates()
    expect(
      getDate(
        event.content[0] as EntityModelNewsfeedEventDto
      )
    ).toEqual('2023.12.07')
  })

  it('should return parsed and formatted time in UTC format', () => {
    const { getTime } = useDates()

    expect(
      getTime(
        event.content[0] as EntityModelNewsfeedEventDto
      )
    ).toEqual('23:59')
  })
})
