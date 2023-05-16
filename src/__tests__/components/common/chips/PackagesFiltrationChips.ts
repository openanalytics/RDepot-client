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
import { Technologies } from '@/enum/Technologies'
import { PackagesFiltration } from '@/models/Filtration'
import FiltrationChips from '@/components/common/chips/FiltrationChips.vue'
import PackagesFiltrationChips from '@/components/packages/PackagesFiltrationChips.vue'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let packages_store: any

const example_packages_filtration =
  PackagesFiltration.parse({
    state: 'ACCEPTED',
    repository: 'repository1',
    deleted: true,
    technologies: [
      Technologies.enum.R,
      Technologies.enum.Python
    ]
  })

beforeAll(() => {
  global.ResizeObserver = ResizeObserver
})

beforeEach(async () => {
  setActivePinia(createPinia())
  packages_store = usePackagesStore()
  packages_store.setFiltration(example_packages_filtration)
  wrapper = mount(PackagesFiltrationChips, {
    global: globalConfig
  })
})

describe('Packages - chips', () => {
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
    const stateChip = wrapper.find('#state')

    expect(technologiesChip.isVisible()).toBeTruthy()
    expect(deleteChip.isVisible()).toBeTruthy()
    expect(stateChip.isVisible()).toBeTruthy()

    await technologiesChip.trigger('click')
    await deleteChip.trigger('click')
    await stateChip.trigger('click')

    expect(packages_store.filtration.state).toBe(undefined)
    expect(packages_store.filtration.deleted).toBe(false)
    expect(
      packages_store.filtration.technologies
    ).toStrictEqual(['Python'])
  })
})
