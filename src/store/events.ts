import {
  EntityModelNewsfeedEventDto,
  Link
} from '@/openapi'
import { defineStore } from 'pinia'
import { EventsFiltration } from '@/models/Filtration'
import { fetchEventsServices } from '@/services/events_services'
import { useObjectActions } from '@/composable/objectActions'
import { notify } from '@kyvg/vue3-notification'

interface State {
  page?: number
  pageSize: number
  totalNumber?: number
  events?: EntityModelNewsfeedEventDto[]
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
      filtration: {
        eventType: undefined,
        resourceId: undefined,
        resourceType: undefined,
        technology: undefined,
        userId: undefined
      },
      pending: false,
      next: undefined
    }
  },
  actions: {
    async fetchEvents() {
      this.pending = true
      return fetchEventsServices(
        this.filtration,
        this.page,
        this.pageSize
      )
        .then(
          (res) => {
            this.page = res.data.data?.page?.number
            this.totalNumber =
              res.data.data?.page?.totalElements

            if (res.data.data?.links != undefined) {
              this.next = undefined
              res.data.data?.links.forEach((link) => {
                if (link.rel === 'next') {
                  this.next = link
                }
              })
            }

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
        .finally(() => {
          this.pending = false
        })
    },
    async fetchNextPageEvents() {
      if (
        this.next != undefined &&
        this.page != undefined &&
        !this.pending
      ) {
        this.page = this.page + 1
        return this.fetchEvents()
      }
    },
    async setPage(payload: number) {
      this.page = payload
      this.fetchEvents()
    },
    async setFiltration(payload: EventsFiltration) {
      this.filtration = payload
      this.page = 0
      this.events = []
      this.fetchEvents()
    },
    clearFiltration() {
      const { setAllFields } = useObjectActions()
      setAllFields(this.filtration, undefined)
    },
    async clearFiltrationAndFetch() {
      const { setAllFields } = useObjectActions()
      setAllFields(this.filtration, undefined)
      this.fetchEvents()
    }
  }
})
