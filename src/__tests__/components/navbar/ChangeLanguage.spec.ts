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
import ChangeLanguageVue from '@/components/navbar/ChangeLanguage.vue'
import { ResizeObserver } from '@/__tests__/config/ResizeObserver'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeAll(() => {
  global.ResizeObserver = ResizeObserver
})

beforeEach(async () => {
  wrapper = mount(ChangeLanguageVue, {
    global: globalConfig
  })
})

describe('Change Language', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
