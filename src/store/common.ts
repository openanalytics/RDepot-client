import { defineStore } from 'pinia'

interface State {
  drawer: boolean
  progressCircularActive: boolean
  overlayText: string
  overlayModel: boolean
  overlayOpacity: number
  overlayComponent: number
}

export const useCommonStore = defineStore('common_store', {
  state: (): State => {
    return {
      drawer: true,
      progressCircularActive: false,
      overlayText: '',
      overlayOpacity: 0.8,
      overlayModel: false,
      overlayComponent: 0
    }
  },
  actions: {
    async setProgressCircularActive(payload: boolean) {
      this.progressCircularActive = payload
    },
    async setDrawer(payload: boolean) {
      this.drawer = payload
    },
    setOverlayText(payload: string) {
      this.overlayText = payload
    },
    setOverlayModel(payload: boolean) {
      this.overlayModel = payload
    },
    setOverlayOpacity(payload: number) {
      this.overlayOpacity = payload
    },
    setOverlayComponent(payload: number) {
      this.overlayComponent = payload
    }
  }
})
