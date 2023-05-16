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
import StepThirdVue from '@/components/addSubmission/StepThird.vue'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

var files: File[] = [
  {
    name: 'A3_1.0.0.tar.gz',
    type: 'application/gzip'
  } as File,
  {
    name: 'abind_1.4-5.tar.gz',
    type: 'application/gzip'
  } as File
]

let submission_store: any

beforeAll(() => {
  global.ResizeObserver = ResizeObserver
})

beforeEach(async () => {
  setActivePinia(createPinia())
  submission_store = useSubmissionStore()
  submission_store.setPackages(files)
  submission_store.setRepository({
    id: 1,
    name: 'repository 1'
  })
  wrapper = mount(StepThirdVue, {
    global: globalConfig
  })
})

describe('Add submission - step third', () => {
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
    expect(wrapper.emitted().next[0]).toEqual([2])
  })

  it('submit button exists', () => {
    const button = wrapper.find('#submit-button')
    expect(button.exists()).toBeTruthy()
  })

  it('summary list should display each package', () => {
    const packagesList = wrapper.findAll(
      '#submission-package'
    )
    expect(packagesList.length).toEqual(
      submission_store.packages.length
    )
  })

  it('summary should contain repository name', () => {
    const repositoryName = wrapper.find('#repository-name')
    expect(repositoryName.text()).toEqual(
      submission_store.repository.name
    )
  })
})