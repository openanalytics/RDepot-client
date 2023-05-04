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
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import PackageMaintainersListVue from '@/components/packageMaintainers/PackageMaintainersList.vue'
import PackageMaintainerRow from '@/components/packageMaintainers/PackageMaintainerRow.vue'
import packageMaintainers from '@/__tests__/config/mockData/packageMaintainers.json'

let wrapper: any
let package_maintainers_store: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeAll(() => {
  global.ResizeObserver = ResizeObserver
  setActivePinia(createPinia())
  package_maintainers_store = usePackageMaintainersStore()
})

beforeEach(async () => {
  wrapper = mount(PackageMaintainersListVue, {
    global: globalConfig
  })

  package_maintainers_store.maintainers =
    packageMaintainers.data.content
})

describe('Package Maintainers - list', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays one row for each maintainer + one for title', async () => {
    const packageMaintainersFromWrapper =
      wrapper.findAllComponents(PackageMaintainerRow)

    expect(packageMaintainersFromWrapper.length).toEqual(
      packageMaintainers.data.content.length + 1
    )
  })
})