import { defineStore } from 'pinia'
import { useCommonStore } from './common'

interface State {
  field: string
  direction: string
}

export const useSortStore = defineStore('sort_store', {
  state: (): State => {
    return {
      field: 'name',
      direction: 'asc'
    }
  },
  actions: {
    async setField(payload?: string) {
      if (payload) {
        if (this.field == payload) {
          this.direction =
            this.direction == 'asc' ? 'desc' : 'asc'
        } else {
          this.direction = 'asc'
        }
        this.field = payload
      }
      this.updateKey()
    },
    reset() {
      this.field = 'name'
      this.direction = 'asc'
    },
    updateKey() {
      const common_store = useCommonStore()
      common_store.updateKey()
    },
    getSortBy() {
      return this.field + ',' + this.direction
    }
  }
})
