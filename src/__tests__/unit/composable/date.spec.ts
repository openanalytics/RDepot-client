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
import { useDates } from '@/composable/date'
import events from '@/__tests__/unit/config/mockData/events.json'
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

  it('should replace 1digit number with 2digit string', () => {
    const { padTo2Digits } = useDates()
    const date = 1
    expect(padTo2Digits(date)).toEqual('01')
  })

  it('should return 2digit string', () => {
    const { padTo2Digits } = useDates()
    const date = 11
    expect(padTo2Digits(date)).toEqual('11')
  })

  it('should return events connected date (formatted)', () => {
    const { getDate } = useDates()
    expect(
      getDate(
        events.data
          .content[0] as EntityModelNewsfeedEventDto
      )
    ).toEqual('2024.05.09')
  })

  it('should return events connected time', () => {
    const { getTime } = useDates()

    expect(
      getTime(
        events.data
          .content[0] as EntityModelNewsfeedEventDto
      )
    ).toEqual('16:05')
  })
})
