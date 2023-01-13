import { defineStore } from 'pinia'

interface State {
  drawer: boolean
  progressCircularActive: boolean
}

export const useCommonStore = defineStore('common_store', {
  state: (): State => {
    return {
     drawer: false,
     progressCircularActive: false
    }
  },
  actions: {
    async setProgressCircularActive(
      payload: boolean
    ) {
      this.progressCircularActive = payload
    },
    async setDrawer(payload: boolean) {
      this.drawer = payload
    }
  }
  }
)