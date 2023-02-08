import { EntityModelNewsfeedEventDto } from '@/openapi'
import events from '@/tmpLists/events.json'
import eventsNext from '@/tmpLists/eventsNext.json'
import { defineStore } from 'pinia'

interface State {
  page: number
  events: EntityModelNewsfeedEventDto[]
}

export const useEventsStore = defineStore('events_store', {
  state: (): State => {
    return {
      page: 1,
      events: JSON.parse(JSON.stringify(events.events))
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
    }
  }
})
