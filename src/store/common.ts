/*
 * R Depot
 *
 * Copyright (C) 2012-2024 Open Analytics NV
 *
 * ===========================================================================
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License as published by
 * The Apache Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache License for more details.
 *
 * You should have received a copy of the Apache License
 * along with this program. If not, see <http://www.apache.org/licenses/>
 *
 */

import { OverlayEnum } from '@/enum/Overlay'
import { defineStore } from 'pinia'

interface State {
  drawer: boolean
  progressCircularActive: boolean
  progress: boolean
  totalVisiblePages: number
  overlayText: string
  overlay: boolean
  overlayComponent?: OverlayEnum
  key: number
  activeId: string
  themeKey: number
}

export const useCommonStore = defineStore('commonStore', {
  state: (): State => {
    return {
      drawer: true,
      progressCircularActive: false,
      progress: false,
      totalVisiblePages: 10,
      overlayText: '',
      overlay: false,
      activeId: 'name',
      overlayComponent: undefined,
      key: 0,
      themeKey: 0
    }
  },
  getters: {
    isCreate: (state) =>
      state.overlayComponent == OverlayEnum.enum.Create,
    isEdit: (state) =>
      state.overlayComponent == OverlayEnum.enum.Edit,
    isDelete: (state) =>
      state.overlayComponent == OverlayEnum.enum.Delete,
    isCreated: (state) =>
      state.overlayComponent == OverlayEnum.enum.Created,
    isDeactivate: (state) =>
      state.overlayComponent == OverlayEnum.enum.Deactivate
  },
  actions: {
    openOverlay(payload: OverlayEnum) {
      this.overlay = true
      this.overlayComponent = payload
    },
    closeOverlay() {
      this.overlay = false
    },
    updateKey() {
      this.key += 1
      if (this.key > 100) {
        this.key = 0
      }
    },

    updateThemeKey() {
      this.themeKey += 1
      if (this.themeKey > 100) {
        this.themeKey = 0
      }
    }
  }
})
