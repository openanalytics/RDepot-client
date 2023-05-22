/*
 *  R Depot
 *
 *  Copyright (C) 2012-2023 Open Analytics NV
 *
 *  ===========================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the Apache License as published by
 *  The Apache Software Foundation, either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  Apache License for more details.
 *
 *  You should have received a copy of the Apache License
 *  along with this program. If not, see <http://www.apache.org/licenses/>
 *
 */

import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll
} from 'vitest'

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import ProgressCircularVue from '@/components/common/progress/ProgressCircular.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useCommonStore } from '@/store/common'
import { ResizeObserver } from '@/__tests__/config/ResizeObserver'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let common_store: any

beforeAll(() => {
  global.ResizeObserver = ResizeObserver
})

beforeEach(async () => {
  setActivePinia(createPinia())
  common_store = useCommonStore()
  wrapper = mount(ProgressCircularVue, {
    global: globalConfig
  })
})

describe('Progress Circular', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('is not showing if nothing is loading', async () => {
    await common_store.setProgressCircularActive(false)
    const content = wrapper.find('#progress-circular')
    expect(content.isVisible()).toBeFalsy()
  })

  it('is showing progress if something is loading', async () => {
    await common_store.setProgressCircularActive(true)
    const content = wrapper.find('#progress-circular')
    expect(content.isVisible()).toBeTruthy()
  })
})
