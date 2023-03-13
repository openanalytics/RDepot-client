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
import FiltrationVue from '@/components/repositories/Filtration.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useRepositoryStore } from '@/store/repositories'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let repositories_store: any
beforeAll(() => {
  global.ResizeObserver = ResizeObserver
})

beforeEach(async () => {
  setActivePinia(createPinia())
  repositories_store = useRepositoryStore()
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
    wrapper.vm.localFiltration.technology = 'Python'
    await clickButton('#reset-button')
    checkIfFiltrationIsEmpty()
    expect(repositories_store.filtration.technology).toBe(
      'R'
    )
  })

  it('reset form but and cancel it', async () => {
    fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    wrapper.vm.localFiltration.technology = 'Python'
    await clickButton('#reset-button')
    await clickButton('#cancel-button')
    expect(wrapper.vm.filtration.technology).toBe('R')
    expect(repositories_store.filtration.technology).toBe(
      'R'
    )
  })

  it('change state but cancel action', async () => {
    fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    await clickButton('#set-filtration')
    wrapper.vm.localFiltration.technology = 'Python'
    await clickButton('#cancel-button')
    expect(wrapper.vm.filtration.technology).toBe('R')
    expect(repositories_store.filtration.technology).toBe(
      'R'
    )
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
  expect(wrapper.vm.localFiltration.name).toBe('')
  expect(wrapper.vm.localFiltration.technology).toBe('')
}

function checkIfPiniaFiltrationIsEmpty() {
  expect(repositories_store.filtration.name).toBe('')
  expect(repositories_store.filtration.technology).toBe('')
}

function checkIfPiniaFiltrationIsFilledWithData() {
  expect(repositories_store.filtration.name).toBe(
    'testrepo1'
  )
  expect(repositories_store.filtration.technology).toBe('R')
}

function fillPiniaFiltrationWithRandomData() {
  repositories_store.filtration.name = 'testrepo1'
  repositories_store.filtration.technology = 'R'
}

function fillTheFormWithRandomData() {
  wrapper.vm.localFiltration.name = 'testrepo1'
  wrapper.vm.localFiltration.technology = 'R'
}

async function clickButton(id: string) {
  const cancel_button = wrapper.find(id)
  expect(cancel_button.isVisible()).toBe(true)
  await cancel_button.trigger('click')
}
