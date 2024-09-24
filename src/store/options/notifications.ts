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
import { useAuthorizationStore } from '@/store/options/authorization'
import { fetchEventsService } from '@/services/eventsServices'
import { defineStore } from 'pinia'
import { useDates } from '@/composable/date'

interface State {
  events: EntityModelNewsfeedEventDto[]
  alreadySeenEvents: EntityModelNewsfeedEventDto[]
}

export const useNotificationStore = defineStore(
  'notificationStore',
  {
    state: (): State => {
      return {
        events: [],
        alreadySeenEvents: []
      }
    },
    getters: {
      newEvents(state) {
        const { isBefore } = useDates()
        const authorizationStore = useAuthorizationStore()
        if (authorizationStore.me.lastLoggedInOn) {
          return state.events.filter(
            (event) =>
              !state.alreadySeenEvents.find(
                (event1) => event1.id == event.id
              ) &&
              isBefore(
                authorizationStore.me.lastLoggedInOn,
                event.time
              )
          )
        }
        return []
      },
      oldEvents(state): EntityModelNewsfeedEventDto[] {
        return state.events.filter(
          (event) => !this.newEvents.includes(event)
        )
      }
    },
    actions: {
      async getEventsNotifications() {
        const [newEvents] = await fetchEventsService(
          {},
          0,
          5,
          false
        )
        this.events = newEvents
      },
      async getNotifications() {
        this.alreadySeenEvents = []
        this.getEventsNotifications()
      }
    },
    persist: true
  }
)
