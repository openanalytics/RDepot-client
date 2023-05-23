/*
 * R Depot
 *
 * Copyright (C) 2012-2023 Open Analytics NV
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
import { useCommonStore } from '@/store/common'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Common Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Starting values', () => {
    const common_store = useCommonStore()
    expect(common_store.progressCircularActive).toBeFalsy()
    expect(common_store.drawer).toBeTruthy()
    expect(common_store.overlayText).toBe('')
    expect(common_store.overlayOpacity).toBe(0.8)
    expect(common_store.overlayComponent).toBe(
      OverlayEnum.enum.Delete
    )
    expect(common_store.key).toBe(0)
  })

  it('Edit progress circular active', () => {
    const common_store = useCommonStore()
    common_store.setProgressCircularActive(true)
    expect(common_store.progressCircularActive).toBeTruthy()
  })

  it('Edit drawer', () => {
    const common_store = useCommonStore()
    common_store.setDrawer(false)
    expect(common_store.drawer).toBeFalsy()
  })

  it('Edit overlay text', () => {
    const common_store = useCommonStore()
    common_store.setOverlayText('true')
    expect(common_store.overlayText).toBe('true')
  })

  it('Edit overlay opacity', () => {
    const common_store = useCommonStore()
    common_store.setOverlayOpacity(0.5)
    expect(common_store.overlayOpacity).toBe(0.5)
  })

  it('Edit overlay component', () => {
    const common_store = useCommonStore()
    common_store.setOverlayComponent(OverlayEnum.enum.Edit)
    expect(common_store.overlayComponent).toBe(
      OverlayEnum.enum.Edit
    )
  })

  it('Update key', () => {
    const common_store = useCommonStore()
    common_store.updateKey()
    expect(common_store.key).toBe(1)
  })

  it('Update key over 100 times', () => {
    const common_store = useCommonStore()
    for (let _ = 0; _ < 100; _++) {
      common_store.updateKey()
    }
    expect(common_store.key).toBe(100)

    common_store.updateKey()
    expect(common_store.key).toBe(0)
  })
})
