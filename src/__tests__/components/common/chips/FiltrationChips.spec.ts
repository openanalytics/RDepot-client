import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll
} from 'vitest'

import { mount } from '@vue/test-utils'
import Chip from '@/components/common/chips/Chip.vue'
import FiltrationChips from '@/components/common/chips/FiltrationChips.vue'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { packagesFiltrationLabels } from '@/maps/Filtration'
import { PackagesFiltration } from '@/models/Filtration'
import { Technologies } from '@/enum/Technologies'
import { createPinia, setActivePinia } from 'pinia'
import { usePackagesStore } from '@/store/packages'

let wrapper: any
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

const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeAll(() => {
  setActivePinia(createPinia())
  packages_store = usePackagesStore()
})

describe('FiltrationChips', () => {
  beforeEach(async () => {
    packages_store.setFiltration(
      example_packages_filtration
    )
    wrapper = mount(FiltrationChips, {
      global: globalConfig,
      props: {
        store: packages_store
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('render 5 chips (2 for technologies, 0 for undefined)', () => {
    expect(wrapper.findAllComponents(Chip).length).toBe(5)
  })

  it('update string field', async () => {
    expect(wrapper.find('#state').exists()).toBeTruthy()
    const chip = wrapper.find('#state')
    await chip.trigger('click')
    expect(wrapper.vm.props.store.filtration.state).toEqual(
      undefined
    )
  })

  it('update boolean field', async () => {
    expect(wrapper.find('#deleted').exists()).toBeTruthy()
    const chip = wrapper.find('#deleted')
    await chip.trigger('click')
    expect(
      wrapper.vm.props.store.filtration.deleted
    ).toEqual(false)
  })

  it('update string[] field', async () => {
    expect(
      wrapper.find('#technologies').exists()
    ).toBeTruthy()
    const chip = wrapper.find('#technologies')
    await chip.trigger('click')
    expect(
      wrapper.vm.props.store.filtration.technologies
    ).toStrictEqual(['Python'])
  })
})
