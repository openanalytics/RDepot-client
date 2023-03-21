import { defineStore } from 'pinia'

interface State {
  drawer: boolean
  progressCircularActive: boolean
  progress: boolean
  overlayText: string
  overlayModel: boolean
  overlayOpacity: number
  overlayComponent: number
  key: number
}

export const useCommonStore = defineStore('common_store', {
  state: (): State => {
    return {
      drawer: true,
      progressCircularActive: false,
      progress: false,
      overlayText: '',
      overlayOpacity: 0.8,
      overlayModel: false,
      overlayComponent: 0,
      key: 0
    }
  },
  actions: {
    setProgressCircularActive(payload: boolean) {
      this.progressCircularActive = payload
    },
    setDrawer(payload: boolean) {
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
    },
    updateKey() {
      this.key += 1
      if (this.key > 100) {
        this.key = 0
      }
    }
  }
})
