/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
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

import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import ProgressCircularVue from '@/components/common/progress/ProgressCircular.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useCommonStore } from '@/store/options/common'
import { nextTick } from 'vue'
import { PROGRESS_CIRCULAR_ID } from '@/__tests__/end-to-end/helpers/elementsIds'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let commonStore: any

beforeEach(async () => {
  setActivePinia(createPinia())
  commonStore = useCommonStore()
  wrapper = mount(ProgressCircularVue, {
    global: globalConfig
  })
})

describe('Progress Circular', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('is not showing if nothing is loading', async () => {
    commonStore.progressCircularActive = false
    await nextTick()
    const content = wrapper.find(`#${PROGRESS_CIRCULAR_ID}`)
    expect(content.isVisible()).toBeFalsy()
  })

  it('is showing progress if something is loading', async () => {
    commonStore.progressCircularActive = true
    await nextTick()
    const content = wrapper.find(`#${PROGRESS_CIRCULAR_ID}`)
    expect(content.isVisible()).toBeTruthy()
  })
})
