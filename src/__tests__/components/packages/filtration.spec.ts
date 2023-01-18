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

  it('reset clear form', async () => {
    await clickButton('#resetbutton')
    checkIfFiltrationIsEmpty()
    checkIfPiniaFiltrationIsEmpty()
  })

  it('reset filled form', async () => {
    fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    await clickButton('#resetbutton')
    checkIfFiltrationIsEmpty()
    checkIfPiniaFiltrationIsFilledWithData()
  })

  it('reset form but not accept it yet', async () => {
    fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    wrapper.vm.localFiltration.state.value = 'deleted'
    await clickButton('#resetbutton')
    checkIfFiltrationIsEmpty()
    expect(packages_store.filtration.state.value).toBe(
      'accepted'
    )
  })

  it('reset form but and cancel it', async () => {
    fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    wrapper.vm.localFiltration.state.value = 'deleted'
    await clickButton('#resetbutton')
    await clickButton('#cancelbutton')
    expect(wrapper.vm.filtration.state.value).toBe(
      'accepted'
    )
    expect(packages_store.filtration.state.value).toBe(
      'accepted'
    )
  })

  it('change state but cancel action', async () => {
    fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    await clickButton('#setfiltration')
    wrapper.vm.localFiltration.state.value = 'deleted'
    await clickButton('#cancelbutton')
    expect(wrapper.vm.filtration.state.value).toBe(
      'accepted'
    )
    expect(packages_store.filtration.state.value).toBe(
      'accepted'
    )
  })

  it('clear form and accept it', async () => {
    fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    await clickButton('#setfiltration')
    expect(wrapper.emitted().changeOptions).toBeTruthy()
    await clickButton('#resetbutton')
    await clickButton('#setfiltration')
    checkIfFiltrationIsEmpty()
    checkIfPiniaFiltrationIsEmpty()
  })

  it('save filtration', async () => {
    fillTheFormWithRandomData()
    await clickButton('#setfiltration')
    expect(wrapper.emitted().changeOptions).toBeTruthy()
    checkIfPiniaFiltrationIsFilledWithData()
  })
})

function checkIfFiltrationIsEmpty() {
  expect(wrapper.vm.localFiltration.state.value).toBe('')
  expect(wrapper.vm.localFiltration.repository.value).toBe(
    ''
  )
  expect(wrapper.vm.localFiltration.deleted.value).toBe(
    false
  )
}

function checkIfPiniaFiltrationIsEmpty() {
  expect(packages_store.filtration.state.value).toBe('')
  expect(packages_store.filtration.repository.value).toBe(
    ''
  )
  expect(packages_store.filtration.deleted.value).toBe(
    false
  )
}

function checkIfPiniaFiltrationIsFilledWithData() {
  expect(packages_store.filtration.state.value).toBe(
    'accepted'
  )
  expect(packages_store.filtration.repository.value).toBe(
    'repository1'
  )
  expect(packages_store.filtration.deleted.value).toBe(
    false
  )
}

function fillPiniaFiltrationWithRandomData() {
  packages_store.filtration.state.value = 'accepted'
  packages_store.filtration.repository.value = 'repository1'
  packages_store.filtration.deleted.value = false
}

function fillTheFormWithRandomData() {
  wrapper.vm.localFiltration.state.value = 'accepted'
  wrapper.vm.localFiltration.repository.value =
    'repository1'
  wrapper.vm.localFiltration.deleted.value = false
}

async function clickButton(id: string) {
  const cancel_button = wrapper.find(id)
  expect(cancel_button.exists()).toBeTruthy()
  await cancel_button.trigger('click')
}
