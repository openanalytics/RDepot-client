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
import FiltrationVue from '@/components/repositoryMaintainers/Filtration.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let repository_maintainers_store: any
beforeAll(() => {
  global.ResizeObserver = ResizeObserver
})

beforeEach(async () => {
  setActivePinia(createPinia())
  repository_maintainers_store =
    useRepositoryMaintainersStore()
  wrapper = mount(FiltrationVue, {
    global: globalConfig
  })
})

describe('Repository Maintainers - filtration', () => {
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
    wrapper.vm.localFiltration.technology = 'R'
    await clickButton('#reset-button')
    checkIfFiltrationIsEmpty()
    expect(
      repository_maintainers_store.filtration.technology
    ).toBe('Python')
  })

  it('reset form but and cancel it', async () => {
    fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    wrapper.vm.localFiltration.technology = 'R'
    await clickButton('#reset-button')
    await clickButton('#cancel-button')
    expect(wrapper.vm.filtration.technology).toBe('Python')
    expect(
      repository_maintainers_store.filtration.technology
    ).toBe('Python')
  })

  it('change state but cancel action', async () => {
    fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    await clickButton('#set-filtration')
    wrapper.vm.localFiltration.technology = 'R'
    await clickButton('#cancel-button')
    expect(wrapper.vm.filtration.technology).toBe('Python')
    expect(
      repository_maintainers_store.filtration.technology
    ).toBe('Python')
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
  expect(wrapper.vm.localFiltration.technology).toBe('')
  expect(wrapper.vm.localFiltration.deleted).toBe(false)
}

function checkIfPiniaFiltrationIsEmpty() {
  expect(
    repository_maintainers_store.filtration.technology
  ).toBe('')
  expect(
    repository_maintainers_store.filtration.deleted
  ).toBe(false)
}

function checkIfPiniaFiltrationIsFilledWithData() {
  expect(
    repository_maintainers_store.filtration.technology
  ).toBe('Python')
  expect(
    repository_maintainers_store.filtration.deleted
  ).toBe(false)
}

function fillPiniaFiltrationWithRandomData() {
  repository_maintainers_store.filtration.technology =
    'Python'
  repository_maintainers_store.filtration.deleted = false
}

function fillTheFormWithRandomData() {
  wrapper.vm.localFiltration.technology = 'Python'
  wrapper.vm.localFiltration.deleted = false
}

async function clickButton(id: string) {
  const cancel_button = wrapper.find(id)
  expect(cancel_button.isVisible()).toBe(true)
  await cancel_button.trigger('click')
}
