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
import { usePackagesStore } from '@/store/packages'
import PackagesListVue from '@/components/packages/PackagesList.vue'
import PackageRowVue from '@/components/packages/PackageRow.vue'
import packages from '@/tmpLists/packages.json'
import PackagesListTitleVue from '@/components/packages/PackagesListTitle.vue'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let packages_store: any
beforeAll(() => {
  global.ResizeObserver = ResizeObserver
})

beforeEach(async () => {
  setActivePinia(createPinia())
  packages_store = usePackagesStore()
  wrapper = mount(PackagesListVue, {
    global: globalConfig
  })
})

describe('Packages - list', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays one row for each package + one for title', async () => {
    const packagesFromWrapper =
      wrapper.findAllComponents(PackageRowVue)

    expect(packagesFromWrapper.length).toEqual(
      packages.page2.length + 1
    )
  })
})
