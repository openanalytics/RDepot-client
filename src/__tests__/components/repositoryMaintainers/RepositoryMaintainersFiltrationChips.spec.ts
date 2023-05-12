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
import { Technologies } from '@/enum/Technologies'
import { RepositoryMaintainersFiltration } from '@/models/Filtration'
import FiltrationChips from '@/components/common/chips/FiltrationChips.vue'
import RepositoryMaintainersFiltrationChips from '@/components/repositoryMaintainers/RepositoryMaintainersFiltrationChips.vue'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let repository_maintainers_store: any

const example_repository_maintainer_filtration =
  RepositoryMaintainersFiltration.parse({
    deleted: true,
    technologies: [
      Technologies.enum.Python,
      Technologies.enum.R
    ]
  })

beforeAll(() => {
  global.ResizeObserver = ResizeObserver
})

beforeEach(async () => {
  setActivePinia(createPinia())
  repository_maintainers_store =
    useRepositoryMaintainersStore()
  repository_maintainers_store.setFiltration(
    example_repository_maintainer_filtration
  )
  wrapper = mount(RepositoryMaintainersFiltrationChips, {
    global: globalConfig
  })
})

describe('Repository Maintainers - chips', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('show chips', () => {
    expect(
      wrapper.findComponent(FiltrationChips).isVisible()
    ).toBe(true)
  })

  it('click on chip causes filtration update', async () => {
    const technologiesChip = wrapper.find('#technologies')
    const deleteChip = wrapper.find('#deleted')

    expect(technologiesChip.isVisible()).toBeTruthy()
    expect(deleteChip.isVisible()).toBeTruthy()

    await technologiesChip.trigger('click')
    await deleteChip.trigger('click')

    expect(
      repository_maintainers_store.filtration.deleted
    ).toBe(false)
    expect(
      repository_maintainers_store.filtration.technologies
    ).toStrictEqual(['R'])
  })
})
