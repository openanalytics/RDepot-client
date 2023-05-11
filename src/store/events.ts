import {
  EntityModelNewsfeedEventDto,
  Link
} from '@/openapi'
import { defineStore } from 'pinia'
import {
  EventsFiltration,
  defaultValues
} from '@/models/Filtration'
import { fetchEventsServices } from '@/services/events_services'

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
  actions: {
    async fetchEvents() {
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
    async fetchNextPageEvents() {
      if (
        this.next != undefined &&
        this.page != undefined &&
        !this.pending
      ) {
        this.page = this.page + 1
        await this.fetchEvents()
      }
    },
    async setFiltration(payload: EventsFiltration) {
      if (EventsFiltration.safeParse(payload).success) {
        this.filtration = EventsFiltration.parse(payload)
      }
      this.page = 0
      this.events = []
      await this.fetchEvents()
    },
    clearFiltration() {
      this.filtration = defaultValues(EventsFiltration)
    },
    async clearFiltrationAndFetch() {
      this.clearFiltration()
      await this.fetchEvents()
    }
  }
})
