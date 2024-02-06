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
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { ResizeObserver } from '@/__tests__/config/ResizeObserver'
import { createPinia, setActivePinia } from 'pinia'
import UploadSummary from '@/components/addSubmission/UploadSummary.vue'
import submissions from '@/__tests__/config/mockData/submissions.json'
import { PackagePromise } from '@/store/submission'
import { usePackagesStore } from '@/store/packages'
import { VProgressCircular } from 'vuetify/components'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

let packageStore: any

const file: File = {
  name: 'A3_1.0.0.tar.gz',
  type: 'application/gzip'
} as File

const promise: PackagePromise = {
  packageBag: file,
  promise: new Promise(() => {}),
  state: 'pending',
  error: [],
  response: undefined
}

beforeAll(() => {
  global.ResizeObserver = ResizeObserver
})

describe('Upload summary - pending', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    packageStore = usePackagesStore()
    wrapper = mount(UploadSummary, {
      global: globalConfig,
      props: {
        promise: promise,
        generateManual: true,
        technology: 'R'
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('progress circle is displayed', () => {
    const progressCircle = wrapper.findComponent(
      VProgressCircular
    )
    expect(progressCircle.exists()).toBeTruthy()
    expect(progressCircle.isVisible()).toBeTruthy()
  })

  it('success icon is not displayed', () => {
    const successIcon = wrapper.find(
      '#submission-success-icon'
    )
    expect(successIcon.exists()).toBeFalsy()
  })

  it('error icon is not displayed', () => {
    const errorIcon = wrapper.find('#submission-error-icon')
    expect(errorIcon.exists()).toBeFalsy()
  })

  it('download icon is not displayed', () => {
    const downloadIcon = wrapper.find(
      '#download-manual-icon'
    )
    expect(downloadIcon.exists()).toBeFalsy()
  })

  it('file name is displayed', () => {
    const text = wrapper.text()
    expect(text).toContain(promise.packageBag.name)
  })

  it('generate manual checkbox has proper value', async () => {
    const generateIcon = wrapper.find(
      '#generate-manual-icon-blank'
    )
    const generateIconMarked = wrapper.find(
      '#generate-manual-icon-marked'
    )
    expect(generateIconMarked.exists()).toBeFalsy()
    expect(generateIcon.exists()).toBeTruthy()
    expect(generateIcon.isVisible()).toBeTruthy()
  })

  it('generate manual checkbox is disabled', () => {
    const generateIcon = wrapper.find(
      '#generate-manual-icon-blank'
    )
    expect(generateIcon.element.disabled).toBeTruthy()
  })
})

describe('Upload summary - error', () => {
  beforeAll(() => {
    promise.state = 'error'
    promise.error = ['Some error message']
  })

  beforeEach(async () => {
    setActivePinia(createPinia())
    packageStore = usePackagesStore()

    wrapper = mount(UploadSummary, {
      global: globalConfig,
      props: {
        promise: promise,
        generateManual: true,
        technology: 'R'
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('progress circle is not displayed', () => {
    const progressCircle = wrapper.findComponent(
      VProgressCircular
    )
    expect(progressCircle.exists()).toBeFalsy()
  })

  it('success icon is not displayed', () => {
    const successIcon = wrapper.find(
      '#submission-success-icon'
    )
    expect(successIcon.exists()).toBeFalsy()
  })

  it('error icon is displayed', () => {
    console.log(wrapper.html())
    const errorIcon = wrapper.find('#submission-error-icon')
    expect(errorIcon.exists()).toBeTruthy()
    expect(errorIcon.isVisible()).toBeTruthy()
  })

  it('download icon is not displayed', () => {
    const downloadIcon = wrapper.find(
      '#download-manual-icon'
    )
    expect(downloadIcon.exists()).toBeFalsy()
  })

  it('file name is displayed', () => {
    const text = wrapper.text()
    expect(text).toContain(promise.packageBag.name)
  })

  it('generate manual checkbox has proper value', async () => {
    const generateIcon = wrapper.find(
      '#generate-manual-icon-blank'
    )
    const generateIconMarked = wrapper.find(
      '#generate-manual-icon-marked'
    )
    expect(generateIconMarked.exists()).toBeFalsy()
    expect(generateIcon.exists()).toBeTruthy()
    expect(generateIcon.isVisible()).toBeTruthy()
  })

  it('generate manual checkbox is disabled', () => {
    const generateIcon = wrapper.find(
      '#generate-manual-icon-blank'
    )
    expect(generateIcon.element.disabled).toBeTruthy()
  })

  it('error icon shows tooltip on hover', async (done: CallableFunction) => {
    const tooltipActivator = wrapper.find(
      '#submission-error-icon'
    )
    expect(tooltipActivator.exists()).toBeTruthy()
    await tooltipActivator.trigger('mousenter')
    await wrapper.vm.$nextTick()
    requestAnimationFrame(() => {
      expect(wrapper.text()).toContain(promise.error[0])
      done()
    })
  })
})

describe('Upload summary - success', () => {
  beforeAll(() => {
    const pagination = {
      totalElements: 20,
      size: 5,
      totalPages: 5,
      number: 1,
      totalNumber: 5,
      page: 1
    }
    promise.state = 'success'
    promise.response = [
      { id: 1 },
      pagination,
      submissions.data.links
    ]
    promise.error = []
  })

  beforeEach(async () => {
    setActivePinia(createPinia())
    packageStore = usePackagesStore()

    wrapper = mount(UploadSummary, {
      global: globalConfig,
      props: {
        promise: promise,
        generateManual: false,
        technology: 'R'
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('progress circle is not displayed', () => {
    const progressCircle = wrapper.findComponent(
      VProgressCircular
    )
    expect(progressCircle.exists()).toBeFalsy()
  })

  it('success icon is displayed', () => {
    const successIcon = wrapper.find(
      '#submission-success-icon'
    )
    expect(successIcon.exists()).toBeTruthy()
    expect(successIcon.isVisible()).toBeTruthy()
    expect(successIcon.element.disabled).toBeFalsy()
  })

  it('error icon is not displayed', () => {
    console.log(wrapper.html())
    const errorIcon = wrapper.find('#submission-error-icon')
    expect(errorIcon.exists()).toBeFalsy()
  })

  it('download icon is displayed', () => {
    const downloadIcon = wrapper.find(
      '#download-manual-icon'
    )
    expect(downloadIcon.exists()).toBeTruthy()
  })

  it('download manual after click action ', async () => {
    const spy = vi.spyOn(packageStore, 'downloadManual')
    const downloadIcon = wrapper.find(
      '#download-manual-icon'
    )
    expect(downloadIcon.exists()).toBeTruthy()
    await downloadIcon.trigger('click')
    expect(spy).toBeCalledTimes(1)
  })

  it('file name is displayed', () => {
    const text = wrapper.text()
    expect(text).toContain(promise.packageBag.name)
  })

  it('generate manual checkbox has proper value', async () => {
    const generateIconMarked = wrapper.find(
      '#generate-manual-icon-marked'
    )
    const generateIcon = wrapper.find(
      '#generate-manual-icon-blank'
    )
    expect(generateIcon.exists()).toBeFalsy()
    expect(generateIconMarked.exists()).toBeTruthy()
    expect(generateIconMarked.isVisible()).toBeTruthy()
  })

  it('generate manual checkbox is disabled', () => {
    const generateIcon = wrapper.find(
      '#generate-manual-icon-marked'
    )
    expect(generateIcon.element.disabled).toBeTruthy()
  })
})

describe('Upload summary - success, no manual', () => {
  beforeAll(() => {
    promise.state = 'success'
  })

  beforeEach(async () => {
    setActivePinia(createPinia())
    packageStore = usePackagesStore()

    wrapper = mount(UploadSummary, {
      global: globalConfig,
      props: {
        promise: promise,
        generateManual: true,
        technology: 'R'
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('download icon is not displayed', () => {
    const downloadIcon = wrapper.find(
      '#download-manual-icon'
    )
    expect(downloadIcon.exists()).toBeFalsy()
  })

  it('file name is displayed', () => {
    const text = wrapper.text()
    expect(text).toContain(promise.packageBag.name)
  })

  it('generate manual checkbox has proper value', async () => {
    const generateIcon = wrapper.find(
      '#generate-manual-icon-blank'
    )
    const generateIconMarked = wrapper.find(
      '#generate-manual-icon-marked'
    )
    expect(generateIconMarked.exists()).toBeFalsy()
    expect(generateIcon.exists()).toBeTruthy()
    expect(generateIcon.isVisible()).toBeTruthy()
  })

  it('generate manual checkbox is disabled', () => {
    const generateIcon = wrapper.find(
      '#generate-manual-icon-blank'
    )
    expect(generateIcon.element.disabled).toBeTruthy()
  })
})

describe('Upload summary - no manual options', () => {
  beforeAll(() => {
    promise.state = 'success'
  })

  beforeEach(async () => {
    setActivePinia(createPinia())
    packageStore = usePackagesStore()

    wrapper = mount(UploadSummary, {
      global: globalConfig,
      props: {
        promise: promise,
        generateManual: true,
        technology: 'Python'
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('download icon is not displayed', () => {
    const downloadIcon = wrapper.find(
      '#download-manual-icon'
    )
    expect(downloadIcon.exists()).toBeFalsy()
  })

  it('generate manual is not visible', () => {
    const text = wrapper.text()
    expect(text).not.toContain('GENERATE MANUAL')
  })

  it('generate manual checkbox is not displayed', async () => {
    const generateIcon = wrapper.find(
      '#generate-manual-icon-blank'
    )
    const generateIconMarked = wrapper.find(
      '#generate-manual-icon-marked'
    )
    expect(generateIconMarked.exists()).toBeFalsy()
    expect(generateIcon.exists()).toBeFalsy()
  })
})
