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
  overlayModel: boolean
  overlayOpacity: number
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
      overlayOpacity: 0.8,
      overlayModel: false,
      activeId: 'name',
      overlayComponent: undefined,
      key: 0,
      themeKey: 0
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
    openOverlay(payload: OverlayEnum, opacity = 0.8) {
      this.setOverlayModel(true)
      this.setOverlayOpacity(opacity)
      this.setOverlayComponent(payload)
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
    },

    setActiveId(payload: string) {
      this.activeId = payload
    },
    isFiltration() {
      return (
        this.overlayComponent == OverlayEnum.enum.Filtration
      )
    },
    isCreate() {
      return (
        this.overlayComponent == OverlayEnum.enum.Create
      )
    },
    isReset() {
      return this.overlayComponent == OverlayEnum.enum.Reset
    },
    isEdit() {
      return this.overlayComponent == OverlayEnum.enum.Edit
    },
    isDelete() {
      return (
        this.overlayComponent == OverlayEnum.enum.Delete
      )
    },
    isCreated() {
      return (
        this.overlayComponent == OverlayEnum.enum.Created
      )
    },
    isDeactivate() {
      return (
        this.overlayComponent == OverlayEnum.enum.Deactivate
      )
    }
  }
})
