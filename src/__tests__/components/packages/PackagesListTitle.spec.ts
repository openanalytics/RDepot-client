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
import PackagesListVue from '@/components/packages/PackagesList.vue'
import PackageRowVue from '@/components/packages/PackageRow.vue'
import { createPinia, setActivePinia } from 'pinia'

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
  wrapper = mount(PackagesListVue, {
    global: globalConfig
  })
})

describe('Packages - list', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays package row with title', async () => {
    const packagesFromWrapper =
      wrapper.findComponent(PackageRowVue)
    expect(packagesFromWrapper.exists()).toBeTruthy()
  })
})
