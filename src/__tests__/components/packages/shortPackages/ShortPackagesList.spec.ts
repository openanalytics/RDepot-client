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
import ShortPackagesListVue from '@/components/packages/shortPackages/ShortPackagesList.vue'
import ShortPackageRowVue from '@/components/packages/shortPackages/ShortPackageRow.vue'
import packages from '@/tmpLists/packages.json'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeAll(() => {
  global.ResizeObserver = ResizeObserver
  setActivePinia(createPinia())
})

beforeEach(async () => {
  wrapper = mount(ShortPackagesListVue, {
    global: globalConfig
  })
})

describe('Short Packages - list', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays one row for each package + one for title', async () => {
    const packagesFromWrapper = wrapper.findAllComponents(
      ShortPackageRowVue
    )

    expect(packagesFromWrapper.length).toEqual(
      packages.page2.length + 1
    )
  })
})
