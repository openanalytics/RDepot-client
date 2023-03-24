import { EntityModelNewsfeedEventDto } from '@/openapi'
import { defineStore } from 'pinia'
import { EventsFiltration } from '@/models/Filtration'
import { fetchEventsServices } from '@/services/events_services'
import { notify } from '@kyvg/vue3-notification'

interface State {
  page?: number
  pageSize: number
  totalNumber?: number
  events?: EntityModelNewsfeedEventDto[]
  filtration: EventsFiltration
}

export const useEventsStore = defineStore('events_store', {
  state: (): State => {
    return {
      page: 0,
      pageSize: 10,
      totalNumber: 0,
      events: [],
      filtration: {
        eventType: undefined,
        resourceId: undefined,
        resourceType: undefined,
        technology: undefined,
        userId: undefined
      }
    }
  },
  actions: {
    async fetchEvents() {
      fetchEventsServices(
        this.filtration,
        this.page,
        this.pageSize
      ).then(
        (res) => {
          this.page = res.data.data?.page?.number
          this.totalNumber =
            res.data.data?.page?.totalElements
          if (
            this.events != undefined &&
            res.data.data?.content
          ) {
            this.events = this.events.concat(
              res.data.data?.content
            )
          } else {
            this.events = res.data.data?.content
          }
        },
        (msg) => {
          this.events = []
          this.page = 0
          notify({ text: msg, type: 'error' })
        }
      )
    },
    async fetchNextPageEvents() {
      if (this.page != undefined) {
        this.page = this.page + 1
        this.fetchEvents()
      }
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
      this.filtration.eventType = ''
      this.filtration.resourceId = undefined
      this.filtration.resourceType = ''
      this.filtration.technology = ''
      this.filtration.userId = undefined
    },
    async clearFiltrationAndFetch() {
      this.clearFiltration()
      this.fetchEvents()
    }
  }
})
