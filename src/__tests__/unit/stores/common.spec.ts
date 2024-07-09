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
import { useCommonStore } from '@/store/common'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Common Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Starting values', () => {
    const commonStore = useCommonStore()
    expect(commonStore.progressCircularActive).toBeFalsy()
    expect(commonStore.drawer).toBeTruthy()
    expect(commonStore.overlayText).toBe('')
    expect(commonStore.overlayComponent).toBe(undefined)
    expect(commonStore.key).toBe(0)
  })

  it('Edit progress circular active', () => {
    const commonStore = useCommonStore()
    commonStore.progressCircularActive = true
    expect(commonStore.progressCircularActive).toBeTruthy()
  })

  it('Edit drawer', () => {
    const commonStore = useCommonStore()
    commonStore.drawer = false
    expect(commonStore.drawer).toBeFalsy()
  })

  it('Edit overlay text', () => {
    const commonStore = useCommonStore()
    commonStore.overlayText = 'true'
    expect(commonStore.overlayText).toBe('true')
  })

  it('Edit overlay component', () => {
    const commonStore = useCommonStore()
    commonStore.overlayComponent = OverlayEnum.enum.Edit
    expect(commonStore.overlayComponent).toBe(
      OverlayEnum.enum.Edit
    )
  })

  it('Update key', () => {
    const commonStore = useCommonStore()
    commonStore.updateKey()
    expect(commonStore.key).toBe(1)
  })

  it('Update key over 100 times', () => {
    const commonStore = useCommonStore()
    for (let _ = 0; _ < 100; _++) {
      commonStore.updateKey()
    }
    expect(commonStore.key).toBe(100)

    commonStore.updateKey()
    expect(commonStore.key).toBe(0)
  })
})
