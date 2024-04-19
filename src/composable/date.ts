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

import { EntityModelNewsfeedEventDto } from '@/openapi'
import { Moment } from 'moment'

export function useDates() {
  function isYearAndMonthDate(date: string): boolean {
    return date.length == 7
  }

  function getMonthAndYear(date: Moment): string {
    return date.format('yyyy.MM')
  }
  function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0')
  }

  function formatDate(date: Date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate())
    ].join('.')
  }

  function getDate(
    event: EntityModelNewsfeedEventDto | undefined
  ) {
    if (event && event.time) {
      const date = new Date(event.time)
      return formatDate(date)
    }
    return 'null'
  }

  return {
    isYearAndMonthDate,
    getMonthAndYear,
    getDate,
    padTo2Digits
  }
}
