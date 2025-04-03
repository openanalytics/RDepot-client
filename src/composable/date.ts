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
import moment from 'moment'

export function useDates() {
  function isYearAndMonthDate(date: string): boolean {
    return date.length == 7
  }

  function getMonthAndYear(date: string): string {
    return moment(date).format('yyyy.MM')
  }

  function formatTime(date: Date) {
    return moment(date).format('HH:mm')
  }

  function formatDate(date: Date) {
    return moment(date).format('yyyy.MM.DD')
  }

  function formatDateTime(date: Date) {
    return [formatDate(date), formatTime(date)].join(' ')
  }

  function getDate(
    event: EntityModelNewsfeedEventDto | undefined,
    keepLocalTime: boolean = false
  ) {
    if (event && event.time) {
      const date = moment(event.time).utc(keepLocalTime)
      return date.format('YYYY.MM.DD')
    }
    return 'null'
  }

  function getTime(
    event: EntityModelNewsfeedEventDto | undefined,
    keepLocalTime: boolean = false
  ): string {
    if (event?.time) {
      const date = moment(event.time).utc(keepLocalTime)
      return date.format('HH:mm')
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
    formatDate,
    formatDateTime,
    isBefore
  }
}
