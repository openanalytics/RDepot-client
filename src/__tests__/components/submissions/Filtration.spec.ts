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
import FiltrationVue from '@/components/submissions/Filtration.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useSubmissionStore } from '@/store/submission'
import { log } from 'console'
import FiltrationCard from '@/components/common/FiltrationCard.vue'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let submissions_store: any
beforeAll(() => {
  global.ResizeObserver = ResizeObserver
})

beforeEach(async () => {
  setActivePinia(createPinia())
  submissions_store = useSubmissionStore()
  wrapper = mount(FiltrationVue, {
    global: globalConfig
  })
})

describe('Submissions - filtration', () => {
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
    const filtrationCard =
      wrapper.findComponent(FiltrationCard)
    expect(filtrationCard.exists()).toEqual(true)
    await filtrationCard
      .find('#reset-button')
      .trigger('click')
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
    const filtrationCard =
      wrapper.findComponent(FiltrationCard)
    expect(filtrationCard.exists()).toEqual(true)
    await filtrationCard
      .find('#reset-button')
      .trigger('click')
    expect(submissions_store.filtration.state).toBe(
      'accepted'
    )
  })
  it('reset form and then cancel it', async () => {
    fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    wrapper.vm.localFiltration.state = 'deleted'
    const filtrationCard =
      wrapper.findComponent(FiltrationCard)
    expect(filtrationCard.exists()).toEqual(true)
    await filtrationCard
      .find('#reset-button')
      .trigger('click')
    await filtrationCard
      .find('#cancel-button')
      .trigger('click')
    expect(wrapper.vm.localFiltration.state).toBe(
      'accepted'
    )
    expect(submissions_store.filtration.state).toBe(
      'accepted'
    )
  })

  it('change state but cancel action', async () => {
    fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    const filtrationCard =
      wrapper.findComponent(FiltrationCard)
    expect(filtrationCard.exists()).toEqual(true)
    await filtrationCard
      .find('#set-filtration')
      .trigger('click')
    wrapper.vm.localFiltration.state = 'deleted'

    await filtrationCard
      .find('#cancel-button')
      .trigger('click')
    expect(wrapper.vm.localFiltration.state).toBe('deleted')
    expect(submissions_store.filtration.state).toBe(
      'deleted'
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
  expect(wrapper.vm.localFiltration.state).toBe(undefined)
  expect(wrapper.vm.localFiltration.packageId).toBe(
    undefined
  )
  expect(wrapper.vm.localFiltration.assignedToMe).toBe(
    undefined
  )
}

function checkIfPiniaFiltrationIsEmpty() {
  expect(submissions_store.filtration.state).toBe(undefined)
  expect(submissions_store.filtration.packageId).toBe(
    undefined
  )
  expect(submissions_store.filtration.assignedToMe).toBe(
    undefined
  )
}

function checkIfPiniaFiltrationIsFilledWithData() {
  expect(submissions_store.filtration.state).toBe(
    'accepted'
  )
  expect(submissions_store.filtration.packageId).toBe(
    'accured'
  )
  expect(submissions_store.filtration.assignedToMe).toBe(
    false
  )
}

function fillPiniaFiltrationWithRandomData() {
  submissions_store.filtration.state = 'accepted'
  submissions_store.filtration.packageId = 'accured'
  submissions_store.filtration.assignedToMe = false
}

function fillTheFormWithRandomData() {
  wrapper.vm.localFiltration.state = 'accepted'
  wrapper.vm.localFiltration.packageId = 'accured'
  wrapper.vm.localFiltration.assignedToMe = false
}

async function clickButton(id: string) {
  const button = wrapper.find(id)
  expect(button.isVisible()).toBe(true)
  await button.trigger('click')
}
