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
import FiltrationVue from '@/components/packageMaintainers/Filtration.vue'
import { createPinia, setActivePinia } from 'pinia'
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import { Technologies } from '@/enum/Technologies'
import {
  PackageMaintainersFiltration,
  defaultValues
} from '@/models/Filtration'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let package_maintainers_store: any
beforeAll(() => {
  global.ResizeObserver = ResizeObserver
})

beforeEach(async () => {
  setActivePinia(createPinia())
  package_maintainers_store = usePackageMaintainersStore()
  wrapper = mount(FiltrationVue, {
    global: globalConfig
  })
})

describe('Packages Maintainers - filtration', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('show reset button', () => {
    expect(wrapper.find('#reset-button').isVisible()).toBe(
      true
    )
  })

  it('show set filtration button', () => {
    expect(
      wrapper.find('#set-filtration').isVisible()
    ).toBe(true)
  })

  it('reset clear form', async () => {
    await clickButton('#reset-button')
    checkIfFiltrationIsEmpty()
    checkIfPiniaFiltrationIsEmpty()
  })

  it('reset filled form', async () => {
    fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    await clickButton('#reset-button')
    checkIfFiltrationIsEmpty()
    checkIfPiniaFiltrationIsFilledWithData()
  })

  it('reset form but not accept it yet', async () => {
    fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    wrapper.vm.localFiltration.technologies = [
      Technologies.enum.Python
    ]
    await clickButton('#reset-button')
    checkIfFiltrationIsEmpty()
    expect(
      package_maintainers_store.filtration.technologies
    ).toStrictEqual([Technologies.enum.R])
  })

  it('reset form but and cancel it', async () => {
    fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    wrapper.vm.localFiltration.technologies = [
      Technologies.enum.Python
    ]
    await clickButton('#reset-button')
    await clickButton('#cancel-button')
    expect(
      wrapper.vm.filtration.technologies
    ).toStrictEqual([Technologies.enum.R])
    expect(
      package_maintainers_store.filtration.technologies
    ).toStrictEqual([Technologies.enum.R])
  })

  it('change state but cancel action', async () => {
    fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    await clickButton('#set-filtration')
    wrapper.vm.localFiltration.technologies = [
      Technologies.enum.Python
    ]
    await clickButton('#cancel-button')
    expect(
      wrapper.vm.filtration.technologies
    ).toStrictEqual([Technologies.enum.R])
    expect(
      package_maintainers_store.filtration.technologies
    ).toStrictEqual([Technologies.enum.R])
  })

  it('clear form and accept it', async () => {
    fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    await clickButton('#set-filtration')
    expect(wrapper.emitted().closeModal).toBeTruthy()
    await clickButton('#reset-button')
    await clickButton('#set-filtration')
    checkIfFiltrationIsEmpty()
    checkIfPiniaFiltrationIsEmpty()
  })

  it('save filtration', async () => {
    fillTheFormWithRandomData()
    await clickButton('#set-filtration')
    expect(wrapper.emitted().closeModal).toBeTruthy()
    checkIfPiniaFiltrationIsFilledWithData()
  })
})

function checkIfFiltrationIsEmpty() {
  expect(wrapper.vm.localFiltration).toEqual(
    defaultValues(PackageMaintainersFiltration)
  )
}

function checkIfPiniaFiltrationIsEmpty() {
  expect(package_maintainers_store.filtration).toEqual(
    defaultValues(PackageMaintainersFiltration)
  )
}

function checkIfPiniaFiltrationIsFilledWithData() {
  expect(
    package_maintainers_store.filtration.technologies
  ).toStrictEqual([Technologies.enum.R])
  expect(package_maintainers_store.filtration.deleted).toBe(
    false
  )
}

function fillPiniaFiltrationWithRandomData() {
  package_maintainers_store.filtration.technologies = [
    Technologies.enum.R
  ]
  package_maintainers_store.filtration.deleted = false
}

function fillTheFormWithRandomData() {
  wrapper.vm.localFiltration.technologies = [
    Technologies.enum.R
  ]
  wrapper.vm.localFiltration.deleted = false
}

async function clickButton(id: string) {
  const button = wrapper.find(id)
  expect(button.isVisible()).toBe(true)
  await button.trigger('click')
}
