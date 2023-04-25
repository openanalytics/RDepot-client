import { OverlayEnum } from '@/enum/Overlay'
import { defineStore } from 'pinia'

interface State {
  drawer: boolean
  progressCircularActive: boolean
  progress: boolean
  totalVisiblePages: number
  overlayText: string
  overlayModel: boolean
  overlayOpacity: number
  overlayComponent: OverlayEnum
  key: number
}

export const useCommonStore = defineStore('common_store', {
  state: (): State => {
    return {
      drawer: true,
      progressCircularActive: false,
      progress: false,
      totalVisiblePages: 10,
      overlayText: '',
      overlayOpacity: 0.8,
      overlayModel: false,
      overlayComponent: 'Delete',
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
    setOverlayComponent(payload: OverlayEnum) {
      this.overlayComponent = payload
    },
    updateKey() {
      this.key += 1
      if (this.key > 100) {
        this.key = 0
      }
    },
    isFiltration() {
      return this.overlayComponent == 'Filtration'
    },
    isCreate() {
      return this.overlayComponent == 'Create'
    },
    isReset() {
      return this.overlayComponent == 'Reset'
    },
    isEdit() {
      return this.overlayComponent == 'Edit'
    },
    isDelete() {
      return this.overlayComponent == 'Delete'
    }
  }
})
