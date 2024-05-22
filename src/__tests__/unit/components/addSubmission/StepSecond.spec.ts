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

import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll,
  vi
} from 'vitest'

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/unit/config/plugins'
import { mocks } from '@/__tests__/unit/config/mocks'
import { ResizeObserver } from '@/__tests__/unit/config/ResizeObserver'
import { createPinia, setActivePinia } from 'pinia'
import StepSecondVue from '@/components/addSubmission/StepSecond.vue'
import { useSubmissionStore } from '@/store/submission'
import { nextTick } from 'process'
import { useFilesListStore } from '@/store/local_files'

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
    const filesStore = useFilesListStore()
    filesStore.files = files
    const button = wrapper.find('#next-button')
    wrapper.vm.valid = true
    wrapper.vm.files = files
    wrapper.vm.filesLocal = files
    expect(button.isVisible()).toBeTruthy()
    await nextTick(() => {})
    await button.trigger('click')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted().next).toBeTruthy()
    expect(wrapper.emitted().next[0]).toEqual([3])
  })

  it('generate manual exists if package is not Python', async () => {
    const submissionsStore = useSubmissionStore()
    const files = [
      {
        name: 'A3_1.0.0.tar.gz',
        type: 'application/gzip'
      } as File
    ]
    wrapper.vm.valid = true
    wrapper.vm.files = files
    wrapper.vm.filesLocal = files
    const filesStore = useFilesListStore()
    filesStore.files = files
    submissionsStore.repository = {
      technology: 'R'
    }
    await nextTick(() => {})
    const checkboxMarked = wrapper.find(
      '.mdi-checkbox-marked-outline'
    )
    const checkboxUnmarked = wrapper.find(
      '.mdi-checkbox-blank-outline'
    )

    expect(checkboxMarked.isVisible()).toBeTruthy()
    expect(checkboxUnmarked.exists()).toBeFalsy()
    expect(wrapper.text()).toContain(
      'packages.generatemanual'
    )
  })

  it('generate manual change on click', async () => {
    const submissionsStore = useSubmissionStore()
    const files = [
      {
        name: 'A3_1.0.0.tar.gz',
        type: 'application/gzip'
      } as File
    ]
    wrapper.vm.valid = true
    wrapper.vm.files = files
    wrapper.vm.filesLocal = files
    const filesStore = useFilesListStore()
    filesStore.files = files
    submissionsStore.repository = {
      technology: 'R'
    }

    await nextTick(() => {})
    let checkboxMarked = wrapper.find(
      '.mdi-checkbox-marked-outline'
    )
    expect(checkboxMarked.isVisible()).toBeTruthy()
    let checkboxUnmarked = wrapper.find(
      '.mdi-checkbox-blank-outline'
    )
    expect(checkboxUnmarked.exists()).toBeFalsy()

    await checkboxMarked.trigger('click')
    checkboxMarked = wrapper.find(
      '.mdi-checkbox-marked-outline'
    )
    checkboxUnmarked = wrapper.find(
      '.mdi-checkbox-blank-outline'
    )
    expect(checkboxUnmarked.isVisible()).toBeTruthy()
    expect(checkboxMarked.exists()).toBeFalsy()
  })

  it('generate manual exists if package is not Python', async () => {
    const submissionsStore = useSubmissionStore()
    const files = [
      {
        name: 'A3_1.0.0.tar.gz',
        type: 'application/gzip'
      } as File
    ]
    wrapper.vm.valid = true
    wrapper.vm.files = files
    wrapper.vm.filesLocal = files
    const filesStore = useFilesListStore()
    filesStore.files = files
    submissionsStore.repository = {
      technology: 'Python'
    }

    await nextTick(() => {})
    const checkboxMarked = wrapper.find(
      '.mdi-checkbox-marked-outline'
    )
    expect(checkboxMarked.exists()).toBeFalsy()
    const checkboxUnmarked = wrapper.find(
      '.mdi-checkbox-blank-outline'
    )
    expect(checkboxUnmarked.exists()).toBeFalsy()
    expect(wrapper.text()).not.toContain('generate manual')
  })
})
