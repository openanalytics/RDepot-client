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
import RepositoriesListVue from '@/components/repositories/RepositoriesList.vue'
import RepositoryRowVue from '@/components/repositories/RepositoryRow.vue'
import repositories from '@/tmpLists/repositories.json'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let packages_store: any
beforeAll(() => {
  global.ResizeObserver = ResizeObserver
  setActivePinia(createPinia())
  packages_store = usePackagesStore()
})

beforeEach(async () => {
  wrapper = mount(RepositoriesListVue, {
    global: globalConfig
  })
})

describe('Repositories - list', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays one row for each repository + one for title', async () => {
    const packagesFromWrapper = wrapper.findAllComponents(
      RepositoryRowVue
    )
    expect(packagesFromWrapper.length).toEqual(
      repositories.data.length + 1
    )
  })
})
