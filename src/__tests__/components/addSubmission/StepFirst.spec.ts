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
import { ResizeObserver } from '@/__tests__/config/ResizeObserver'
import { createPinia, setActivePinia } from 'pinia'
import { useSubmissionStore } from '@/store/submission'
import StepFirstVue from '@/components/addSubmission/StepFirst.vue'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let submission_store: any

beforeAll(() => {
  global.ResizeObserver = ResizeObserver
})

beforeEach(async () => {
  setActivePinia(createPinia())
  submission_store = useSubmissionStore()
  wrapper = mount(StepFirstVue, {
    global: globalConfig
  })
})

describe('Add submission - first step', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('next button exists', () => {
    const button = wrapper.find('#next-button')
    expect(button.exists()).toBeTruthy()
  })

  it('go next not allowed if reposiotry is not choosen', async () => {
    const button = wrapper.find('#next-button')
    expect(button.exists()).toBeTruthy()
    await button.trigger('click')
    expect(wrapper.emitted().next).toBeFalsy()
  })

  it('go next allowed if reposiotry is choosen', async () => {
    await submission_store.setRepository({
      id: 1,
      name: 'repository1'
    })
    const button = wrapper.find('#next-button')
    expect(button.exists()).toBeTruthy()
    await button.trigger('click')
    expect(wrapper.emitted().next).toBeTruthy()
    expect(wrapper.emitted().next[0]).toEqual([2])
  })
})