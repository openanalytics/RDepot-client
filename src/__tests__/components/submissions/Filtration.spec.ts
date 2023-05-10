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
import FiltrationCard from '@/components/common/FiltrationCard.vue'
import {
  SubmissionsFiltration,
  defaultValues
} from '@/models/Filtration'
import flushPromises from 'flush-promises'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let submissions_store: any

const example_submission_filtration =
  SubmissionsFiltration.parse({
    state: 'ACCEPTED',
    package: 'accured',
    assignedToMe: false
  })

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
      'ACCEPTED'
    )
  })
  it('reset form and then cancel it', async () => {
    fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    wrapper.vm.values.state = 'DELETED'
    const filtrationCard =
      wrapper.findComponent(FiltrationCard)
    expect(filtrationCard.exists()).toEqual(true)
    await filtrationCard
      .find('#reset-button')
      .trigger('click')
    await filtrationCard
      .find('#cancel-button')
      .trigger('click')
    expect(submissions_store.filtration.state).toBe(
      'ACCEPTED'
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
    wrapper.vm.values.state = 'DELETED'

    await filtrationCard
      .find('#cancel-button')
      .trigger('click')
    expect(submissions_store.filtration.state).toBe(
      'ACCEPTED'
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
    await fillTheFormWithRandomData()
    await clickButton('#set-filtration')
    expect(wrapper.emitted().closeModal).toBeTruthy()
    checkIfPiniaFiltrationIsFilledWithData()
  })
})

function checkIfFiltrationIsEmpty() {
  expect(wrapper.vm.values).toEqual(
    defaultValues(SubmissionsFiltration)
  )
}

function checkIfPiniaFiltrationIsEmpty() {
  expect(submissions_store.filtration).toEqual(
    defaultValues(SubmissionsFiltration)
  )
}

function checkIfPiniaFiltrationIsFilledWithData() {
  expect(submissions_store.filtration.state).toBe(
    'ACCEPTED'
  )
  expect(submissions_store.filtration.package).toBe(
    'accured'
  )
  expect(submissions_store.filtration.assignedToMe).toBe(
    false
  )
}

function fillPiniaFiltrationWithRandomData() {
  submissions_store.filtration =
    SubmissionsFiltration.parse(
      example_submission_filtration
    )
}

async function fillTheFormWithRandomData() {
  wrapper.vm.setValues(example_submission_filtration)
  await flushPromises()
}

async function clickButton(id: string) {
  const button = wrapper.find(id)
  expect(button.isVisible()).toBe(true)
  await button.trigger('click')
}
