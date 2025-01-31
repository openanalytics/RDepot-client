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

import { EntityModelNewsfeedEventDto } from '@/openapi'
import moment, { Moment } from 'moment'

export function useDates() {
  function isYearAndMonthDate(date: string): boolean {
    return date.length == 7
  }

  function getMonthAndYear(date: string): string {
    const newDate: Moment = moment(date)
    return newDate.format('yyyy.MM')
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

  function formatDateTime(date: Date) {
    return [formatDate(date), formatTime(date)].join(' ')
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

  function formatTime(date: Date) {
    return (
      padTo2Digits(date.getHours()) +
      ':' +
      padTo2Digits(date.getMinutes())
    )
  }

  function getTime(
    event: EntityModelNewsfeedEventDto | undefined
  ): string {
    if (event?.time) {
      const date: Date = new Date(event.time)
      const time: string = formatTime(date)
      return time
    } else {
      return ''
    }
  }

  function isBefore(
    oldDate: string | undefined,
    newDate: string | undefined
  ) {
    return moment(oldDate).isBefore(moment(newDate))
  }

  return {
    getTime,
    isYearAndMonthDate,
    getMonthAndYear,
    getDate,
    padTo2Digits,
    formatDate,
    formatDateTime,
    isBefore
  }
}
