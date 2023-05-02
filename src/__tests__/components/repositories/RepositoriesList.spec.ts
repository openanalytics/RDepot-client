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
import RepositoriesListVue from '@/components/repositories/RepositoriesList.vue'
import RepositoryRowVue from '@/components/repositories/RepositoryRow.vue'
import repositories from '@/__tests__/config/mockData/repositories.json'
import { useRepositoryStore } from '@/store/repositories'

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
  wrapper = mount(RepositoriesListVue, {
    global: globalConfig
  })
})

describe('Repositories - list', () => {
  it('renders properly', () => {
    const repository_store = useRepositoryStore()
    repository_store.repositories =
      repositories.data.content
    expect(wrapper.exists()).toBe(true)
  })

  it('displays one row for each repository + one for title', async () => {
    const repository_store = useRepositoryStore()
    repository_store.repositories =
      repositories.data.content
    const packagesFromWrapper = wrapper.findAllComponents(
      RepositoryRowVue
    )
    expect(packagesFromWrapper.length).toEqual(
      repositories.data.content.length + 1
    )
  })
})
