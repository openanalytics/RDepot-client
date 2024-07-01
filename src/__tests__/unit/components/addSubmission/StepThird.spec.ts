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

import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { createPinia, setActivePinia } from 'pinia'
import { PackagePromise } from '@/store/submission'
import { useSubmissionStore } from '@/store/submission'
import StepThirdVue from '@/components/addSubmission/StepThird.vue'
import UploadSummary from '@/components/addSubmission/UploadSummary.vue'

import { nextTick } from 'process'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

const files: File[] = [
  {
    name: 'A3_1.0.0.tar.gz',
    type: 'application/gzip'
  } as File,
  {
    name: 'abind_1.4-5.tar.gz',
    type: 'application/gzip'
  } as File
]

let submissionStore: any

const promises: PackagePromise[] = [
  {
    packageBag: files[0],
    promise: new Promise(() => {}),
    state: 'pending',
    error: [],
    response: undefined
  },
  {
    packageBag: files[1],
    promise: new Promise(() => {}),
    state: 'pending',
    error: [],
    response: undefined
  }
]

beforeEach(async () => {
  setActivePinia(createPinia())
  submissionStore = useSubmissionStore()
  submissionStore.setPackages(files)
  submissionStore.setRepository({
    id: 1,
    name: 'repository 1'
  })
  submissionStore.generateManual = [files[0]]
  submissionStore.promises = promises
  submissionStore.resolved = false
  wrapper = mount(StepThirdVue, {
    global: globalConfig
  })
})

describe('Add submission - step third', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('disabled action button exists', () => {
    const button = wrapper.find('#back-button-disabled')
    expect(button.exists()).toBeTruthy()
    expect(button.element.disabled).toBeTruthy()
  })

  it('action button does not exists', () => {
    const button = wrapper.find('#back-button')
    expect(button.exists()).toBeFalsy()
  })

  it('action button exists when all requests has ended', async () => {
    submissionStore.resolved = true
    await nextTick(() => {})
    const button = wrapper.find('#back-button')
    expect(button.exists()).toBeTruthy()
    expect(button.element.disabled).toBeFalsy()
  })

  it('send event if button was clicked ', async () => {
    submissionStore.resolved = true
    await nextTick(() => {})
    const button = wrapper.find('#back-button')
    expect(button.exists()).toBeTruthy()
    await button.trigger('click')
    expect(wrapper.emitted().next[0]).toEqual([1])
  })

  it('disabled action button does not exists when all requests has ended ', async () => {
    submissionStore.resolved = true
    await nextTick(() => {})
    const buttonDisabled = wrapper.find(
      '#back-button-disabled'
    )
    expect(buttonDisabled.exists()).toBeFalsy()
  })

  it('each submission is listed', () => {
    const submissionRecords =
      wrapper.findAllComponents(UploadSummary)
    expect(submissionRecords).toHaveLength(2)
  })

  it('the list title contains repo name', () => {
    const listTitle = wrapper.find('#repository-name')
    expect(listTitle.text()).toContain(
      submissionStore.repository.name
    )
  })
})
