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

import {
  EntityModelNewsfeedEventDto,
  Link
} from '@/openapi'
import { defineStore } from 'pinia'
import {
  EventsFiltration,
  defaultValues
} from '@/models/Filtration'
import { fetchEventsServices } from '@/services/eventsServices'
import { eventsFiltrationLabels } from '@/maps/Filtration'
import { useDates } from '@/composable/date'

interface State {
  page?: number
  pageSize: number
  totalNumber?: number
  events: EntityModelNewsfeedEventDto[]
  filtration: EventsFiltration
  pending: boolean
  next?: Link
}

export const useEventsStore = defineStore('events_store', {
  state: (): State => {
    return {
      page: 0,
      pageSize: 10,
      totalNumber: 0,
      events: [],
      filtration: defaultValues(EventsFiltration),
      pending: false,
      next: undefined
    }
  },
  getters: {
    isDefaultFiltration: (state) => {
      return (
        JSON.stringify(state.filtration) ===
        JSON.stringify(defaultValues(EventsFiltration))
      )
    },
    eventsGroupedByMonthAndDay(
      state
    ): Map<
      string,
      Map<string, EntityModelNewsfeedEventDto[]>
    > {
      const { getDate, getMonthAndYear } = useDates()

      const mapByMonths = state.events.reduce(
        (entryMap, e) =>
          entryMap.set(
            getMonthAndYear(e.time || '00.00.00'),
            [
              ...(entryMap.get(
                getMonthAndYear(e.time || '00.00.00')
              ) || []),
              e
            ]
          ),
        new Map<string, EntityModelNewsfeedEventDto[]>()
      )

      const mapOfMonthsAndDays: Map<
        string,
        Map<string, EntityModelNewsfeedEventDto[]>
      > = new Map()

      mapByMonths.forEach(
        (value: EntityModelNewsfeedEventDto[], key) => {
          console.log(key)
          console.log(value)
          const monthDividedByDays: Map<
            string,
            EntityModelNewsfeedEventDto[]
          > = value.reduce(
            (entryMap, e) =>
              entryMap.set(getDate(e), [
                ...(entryMap.get(getDate(e)) || []),
                e
              ]),
            new Map<string, EntityModelNewsfeedEventDto[]>()
          )
          mapOfMonthsAndDays.set(key, monthDividedByDays)
        }
      )

      return mapOfMonthsAndDays
    }
  },
  actions: {
    async getPage() {
      if (
        this.next != undefined &&
        this.page != undefined &&
        !this.pending
      ) {
        this.page = this.page + 1
        await this.get()
      }
    },
    async get() {
      this.pending = true
      const [newEvents, pageData, links] =
        await fetchEventsServices(
          this.filtration,
          this.page,
          this.pageSize
        ).finally(() => {
          this.pending = false
        })
      this.page = pageData.page
      this.totalNumber = pageData.totalNumber

      if (links) {
        this.next = undefined
        links.forEach((link) => {
          if (link.rel === 'next') {
            this.next = link
          }
        })
      }

      this.events = this.events.concat(newEvents)
    },
    async setFiltration(payload: EventsFiltration) {
      if (EventsFiltration.safeParse(payload).success) {
        this.filtration = EventsFiltration.parse(payload)
      }
      this.page = 0
      this.events = []
      await this.get()
    },
    clearFiltration() {
      this.filtration = defaultValues(EventsFiltration)
    },
    async clearFiltrationAndFetch() {
      this.clearFiltration()
      await this.get()
    },
    getLabels() {
      return eventsFiltrationLabels
    }
  }
})
