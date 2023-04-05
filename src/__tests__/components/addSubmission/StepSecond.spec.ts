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

describe('Add submission - step first', () => {
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

  it('go next not allowed if repository is not choosen', async () => {
    const button = wrapper.find('#next-button')
    expect(button.exists()).toBeTruthy()
    await button.trigger('click')
    expect(wrapper.emitted().next).toBeFalsy()
  })

  it('go next allowed if reposiotry is choosen', async () => {
    var files = [new File([''], 'filename')]
    const button = wrapper.find('#next-button')
    wrapper.vm.valid = true
    wrapper.vm.files = files
    expect(button.isVisible()).toBeTruthy()
    await button.trigger('click')
    expect(wrapper.emitted().next).toBeTruthy()
    expect(wrapper.emitted().next[0]).toEqual([3])
  })
})
