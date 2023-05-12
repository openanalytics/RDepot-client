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
import { RepositoriesFiltration } from '@/models/Filtration'
import FiltrationChips from '@/components/common/chips/FiltrationChips.vue'
import RepositoriesFiltrationChips from '@/components/repositories/RepositoriesFiltrationChips.vue'
import { useRepositoryStore } from '@/store/repositories'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let repositories_store: any

const example_repository_filtration =
  RepositoriesFiltration.parse({
    name: 'testrepo1',
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
  repositories_store = useRepositoryStore()
  repositories_store.setFiltration(
    example_repository_filtration
  )
  wrapper = mount(RepositoriesFiltrationChips, {
    global: globalConfig
  })
})

describe('Repositories - chips', () => {
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
    const nameChip = wrapper.find('#repository_name')

    expect(technologiesChip.isVisible()).toBeTruthy()
    expect(deleteChip.isVisible()).toBeTruthy()
    expect(nameChip.isVisible()).toBeTruthy()

    await technologiesChip.trigger('click')
    await deleteChip.trigger('click')
    await nameChip.trigger('click')

    expect(repositories_store.filtration.name).toBe(
      undefined
    )
    expect(repositories_store.filtration.deleted).toBe(
      false
    )
    expect(
      repositories_store.filtration.technologies
    ).toStrictEqual(['R'])
  })
})
