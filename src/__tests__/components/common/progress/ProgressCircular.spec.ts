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