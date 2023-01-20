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
import { useSubmissionState } from '@/store/submission'
import StepSecondVue from '@/components/addSubmission/StepSecond.vue'
import packages from '@/tmpLists/packages.json'

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
  submission_store = useSubmissionState()
  wrapper = mount(StepSecondVue, {
    global: globalConfig
  })
})

describe('Add submission - step first', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('back button exists', () => {
    const button = wrapper.find('#backbutton')
    expect(button.exists()).toBeTruthy()
  })

  it('go back if back button is clicked', async () => {
    const button = wrapper.find('#backbutton')
    expect(button.exists()).toBeTruthy()
    await button.trigger('click')
    expect(wrapper.emitted().next[0]).toEqual([1])
  })

  it('next button exists', () => {
    const button = wrapper.find('#nextbutton')
    expect(button.exists()).toBeTruthy()
  })

  it('go next not allowed if reposiotry is not choosen', async () => {
    const button = wrapper.find('#nextbutton')
    expect(button.exists()).toBeTruthy()
    await button.trigger('click')
    expect(wrapper.emitted().next).toBeFalsy()
  })

  it('go next allowed if reposiotry is choosen', async () => {
    await submission_store.setPackages(packages.page1)
    const button = wrapper.find('#nextbutton')
    expect(button.exists()).toBeTruthy()
    await button.trigger('click')
    expect(wrapper.emitted().next).toBeTruthy()
    expect(wrapper.emitted().next[0]).toEqual([3])
  })
})
