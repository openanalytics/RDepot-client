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

import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll,
  vi
} from 'vitest'

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { ResizeObserver } from '@/__tests__/config/ResizeObserver'
import { createPinia, setActivePinia } from 'pinia'
import StepSecondVue from '@/components/addSubmission/StepSecond.vue'
import { useSubmissionStore } from '@/store/submission'
import { nextTick } from 'process'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeAll(() => {
  global.ResizeObserver = ResizeObserver
})

beforeEach(async () => {
  setActivePinia(createPinia())
  wrapper = mount(StepSecondVue, {
    global: globalConfig
  })
})

describe('Add submission - second step', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('back button exists', () => {
    const button = wrapper.find('#back-button')
    expect(button.exists()).toBeTruthy()
  })

  it('go back if back button is clicked', async () => {
    const button = wrapper.find('#back-button')
    expect(button.exists()).toBeTruthy()
    await button.trigger('click')
    expect(wrapper.emitted().next[0]).toEqual([1])
  })

  it('next button exists', () => {
    const button = wrapper.find('#next-button')
    expect(button.exists()).toBeTruthy()
  })

  it('go next not allowed if packages list is empty', async () => {
    const button = wrapper.find('#next-button')
    expect(button.exists()).toBeTruthy()
    await button.trigger('click')
    expect(wrapper.emitted().next).toBeFalsy()
  })

  it('go next allowed if packages list is not empty', async () => {
    const submissionsStore = useSubmissionStore()
    const spy = vi.spyOn(
      submissionsStore,
      'addSubmissionRequests'
    )
    const files = [
      {
        name: 'A3_1.0.0.tar.gz',
        type: 'application/gzip'
      } as File
    ]
    const button = wrapper.find('#next-button')
    wrapper.vm.valid = true
    wrapper.vm.files = files
    wrapper.vm.filesLocal = files
    expect(button.isVisible()).toBeTruthy()
    await nextTick(() => {})
    await button.trigger('click')
    console.log(button.element.disabled)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted().next).toBeTruthy()
    expect(wrapper.emitted().next[0]).toEqual([3])
  })
})
