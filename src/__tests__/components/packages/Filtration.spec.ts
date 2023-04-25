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
import FiltrationVue from '@/components/packages/Filtration.vue'
import { createPinia, setActivePinia, Store } from 'pinia'
import { usePackagesStore } from '@/store/packages'
import { Technologies } from '@/enum/Technologies'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let packages_store: any
beforeAll(() => {
  global.ResizeObserver = ResizeObserver
})

beforeEach(async () => {
  setActivePinia(createPinia())
  packages_store = usePackagesStore()
  wrapper = mount(FiltrationVue, {
    global: globalConfig
  })
})

describe('Packages - filtration', () => {
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
    wrapper.vm.localFiltration.state = 'deleted'
    await clickButton('#reset-button')
    checkIfFiltrationIsEmpty()
    expect(packages_store.filtration.state).toBe('accepted')
  })

  it('reset form but and cancel it', async () => {
    fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    wrapper.vm.localFiltration.state = 'deleted'
    await clickButton('#reset-button')
    await clickButton('#cancel-button')
    expect(wrapper.vm.filtration.state).toBe('accepted')
    expect(packages_store.filtration.state).toBe('accepted')
  })

  it('change state but cancel action', async () => {
    fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    await clickButton('#set-filtration')
    wrapper.vm.localFiltration.state = 'deleted'
    await clickButton('#cancel-button')
    expect(wrapper.vm.filtration.state).toBe('accepted')
    expect(packages_store.filtration.state).toBe('accepted')
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
  expect(wrapper.vm.localFiltration.state).toBe(undefined)
  expect(wrapper.vm.localFiltration.repository).toBe(
    undefined
  )
  expect(wrapper.vm.localFiltration.deleted).toBe(undefined)
  expect(wrapper.vm.localFiltration.technology).toBe(
    undefined
  )
}

function checkIfPiniaFiltrationIsEmpty() {
  expect(packages_store.filtration.state).toBe(undefined)
  expect(packages_store.filtration.repository).toBe(
    undefined
  )
  expect(packages_store.filtration.deleted).toBe(undefined)
  expect(packages_store.filtration.technology).toBe(
    undefined
  )
}

function checkIfPiniaFiltrationIsFilledWithData() {
  expect(packages_store.filtration.state).toBe('accepted')
  expect(packages_store.filtration.repository).toBe(
    'repository1'
  )
  expect(packages_store.filtration.deleted).toBe(false)
  expect(packages_store.filtration.technology).toBe(
    Technologies.enum.R
  )
}

function fillPiniaFiltrationWithRandomData() {
  packages_store.filtration.state = 'accepted'
  packages_store.filtration.repository = 'repository1'
  packages_store.filtration.deleted = false
  packages_store.filtration.technology = Technologies.enum.R
}

function fillTheFormWithRandomData() {
  wrapper.vm.localFiltration.state = 'accepted'
  wrapper.vm.localFiltration.repository = 'repository1'
  wrapper.vm.localFiltration.deleted = false
  wrapper.vm.localFiltration.technology =
    Technologies.enum.R
}

async function clickButton(id: string) {
  const cancel_button = wrapper.find(id)
  expect(cancel_button.isVisible()).toBe(true)
  await cancel_button.trigger('click')
}
