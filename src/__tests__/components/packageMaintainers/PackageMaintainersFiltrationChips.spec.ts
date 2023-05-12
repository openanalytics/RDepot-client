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
import { PackageMaintainersFiltration } from '@/models/Filtration'
import FiltrationChips from '@/components/common/chips/FiltrationChips.vue'
import PackageMaintainersFiltrationChips from '@/components/packageMaintainers/PackageMaintainersFiltrationChips.vue'
import { usePackageMaintainersStore } from '@/store/package_maintainers'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let package_maintainers_store: any

const example_package_maintainer_filtration =
  PackageMaintainersFiltration.parse({
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
  package_maintainers_store = usePackageMaintainersStore()
  package_maintainers_store.setFiltration(
    example_package_maintainer_filtration
  )
  wrapper = mount(PackageMaintainersFiltrationChips, {
    global: globalConfig
  })
})

describe('Package maintainers - chips', () => {
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
      package_maintainers_store.filtration.deleted
    ).toBe(false)
    expect(
      package_maintainers_store.filtration.technologies
    ).toStrictEqual(['R'])
  })
})
