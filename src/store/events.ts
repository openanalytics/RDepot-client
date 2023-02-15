import { EntityModelNewsfeedEventDto } from '@/openapi'
import events from '@/tmpLists/events.json'
import eventsNext from '@/tmpLists/eventsNext.json'
import { defineStore } from 'pinia'
import { EventsFiltration } from '@/models/Filtration'

interface State {
  page: number
  events: EntityModelNewsfeedEventDto[]
  filtration: EventsFiltration
}

export const useEventsStore = defineStore('events_store', {
  state: (): State => {
    return {
      page: 1,
      events: JSON.parse(JSON.stringify(events.events)),
      filtration: {
        eventType: {
          label: 'Event Type',
          requestName: 'eventType',
          value: ''
        },
        resourceId: {
          label: 'Resource Id',
          requestName: 'resourceId',
          value: undefined
        },
        resourceType: {
          label: 'Resource Type',
          requestName: 'resourceType',
          value: ''
        },
        technology: {
          label: 'Technology',
          requestName: 'technology',
          value: ''
        },
        userId: {
          label: 'User Id',
          requestName: 'userId',
          value: undefined
        }
      }
    }
  },
  actions: {
    async fetchEvents() {
      this.events = JSON.parse(
        JSON.stringify(events.events)
      )
    },
    async fetchNextPageEvents() {
      this.page = this.page + 1
      this.events = this.events.concat(
        JSON.parse(JSON.stringify(eventsNext.events))
      )
    },
    async setPage(payload: number) {
      this.page = payload
      this.fetchEvents()
    },
    async setFiltration(payload: EventsFiltration) {
      this.filtration = payload
      this.page = 1
      this.fetchEvents()
    },
    clearFiltration() {
      this.filtration.eventType.value = ''
      this.filtration.resourceId.value = undefined
      this.filtration.resourceType.value = ''
      this.filtration.technology.value = ''
      this.filtration.userId.value = undefined
    },
    async clearFiltrationAndFetch() {
      this.clearFiltration()
      this.fetchEvents()
    }
  }
})
