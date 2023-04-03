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
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'
import RepositoryMaintainersListVue from '@/components/repositoryMaintainers/RepositoryMaintainersList.vue'
import RepositoryMaintainerRow from '@/components/repositoryMaintainers/RepositoryMaintainerRow.vue'
import maintainers from '@/tmpLists/repositoryMaintainers.json'

let wrapper: any
let repository_maintainers__store: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeAll(() => {
  global.ResizeObserver = ResizeObserver
  setActivePinia(createPinia())
  repository_maintainers__store =
    useRepositoryMaintainersStore()
})

beforeEach(async () => {
  wrapper = mount(RepositoryMaintainersListVue, {
    global: globalConfig
  })

  repository_maintainers__store.maintainers =
    maintainers.data
})

describe('Repository Maintainers - list', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays one row for each maintainer + one for title', async () => {
    const packagesFromWrapper = wrapper.findAllComponents(
      RepositoryMaintainerRow
    )

    expect(packagesFromWrapper.length).toEqual(
      maintainers.data.length + 1
    )
  })
})
