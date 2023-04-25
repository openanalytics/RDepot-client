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
import StepSecondVue from '@/components/addSubmission/StepSecond.vue'

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

  it('go next not allowed if repository is not chosen', async () => {
    const button = wrapper.find('#next-button')
    expect(button.exists()).toBeTruthy()
    await button.trigger('click')
    expect(wrapper.emitted().next).toBeFalsy()
  })

  it('go next allowed if reposiotry is chosen', async () => {
    // var files = [
    //   new File([''], 'filename', {
    //     type: 'application/gzip'
    //   })
    // ]
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

    const button = wrapper.find('#next-button')
    wrapper.vm.valid = true
    wrapper.vm.files_local = files
    expect(button.isVisible()).toBeTruthy()
    await button.trigger('click')
    expect(wrapper.emitted().next).toBeTruthy()
    expect(wrapper.emitted().next[0]).toEqual([3])
  })
})
