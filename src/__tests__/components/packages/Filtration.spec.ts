/*
 * R Depot
 *
 * Copyright (C) 2012-2023 Open Analytics NV
 *
 * ===========================================================================
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License as published by
 * The Apache Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache License for more details.
 *
 * You should have received a copy of the Apache License
 * along with this program. If not, see <http://www.apache.org/licenses/>
 *
 */

import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll
} from 'vitest'

import flushPromises from 'flush-promises'
import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { ResizeObserver } from '@/__tests__/config/ResizeObserver'
import FiltrationVue from '@/components/packages/Filtration.vue'
import { createPinia, setActivePinia } from 'pinia'
import { usePackagesStore } from '@/store/packages'
import { Technologies } from '@/enum/Technologies'
import {
  defaultValues,
  PackagesFiltration
} from '@/models/Filtration'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let packagesStore: any

const EXAMPLE_PACKAGES_FILTRATION =
  PackagesFiltration.parse({
    state: 'ACCEPTED',
    repository: 'repository1',
    deleted: false,
    technologies: [Technologies.enum.R]
  })

beforeAll(() => {
  global.ResizeObserver = ResizeObserver
})

beforeEach(async () => {
  setActivePinia(createPinia())
  packagesStore = usePackagesStore()
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
    await fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    await clickButton('#reset-button')
    checkIfFiltrationIsEmpty()
    checkIfPiniaFiltrationIsFilledWithData()
  })

  it('reset form but not accept it yet', async () => {
    await fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    wrapper.vm.values.state = 'DELETED'
    await clickButton('#reset-button')
    checkIfFiltrationIsEmpty()
    expect(packagesStore.filtration.state).toBe('ACCEPTED')
  })

  it('reset form and cancel it', async () => {
    await fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    wrapper.vm.values.state = 'DELETED'
    await clickButton('#reset-button')
    await clickButton('#cancel-button')
    expect(packagesStore.filtration.state).toBe('ACCEPTED')
  })

  it('change state but cancel action', async () => {
    await fillTheFormWithRandomData()
    await clickButton('#set-filtration')
    wrapper.vm.values.state = 'DELETED'
    await clickButton('#cancel-button')
    expect(packagesStore.filtration.state).toBe('ACCEPTED')
  })

  it('clear form and accept it ', async () => {
    await fillTheFormWithRandomData()
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
    defaultValues(PackagesFiltration)
  )
}

function checkIfPiniaFiltrationIsEmpty() {
  expect(packagesStore.filtration).toEqual(
    defaultValues(PackagesFiltration)
  )
}

function checkIfPiniaFiltrationIsFilledWithData() {
  expect(packagesStore.filtration.repository).toBe(
    'repository1'
  )
  expect(packagesStore.filtration.state).toBe('ACCEPTED')
  expect(packagesStore.filtration.deleted).toBe(false)
  expect(
    packagesStore.filtration.technologies
  ).toStrictEqual([Technologies.enum.R])
}

function fillPiniaFiltrationWithRandomData() {
  packagesStore.filtration = PackagesFiltration.parse(
    EXAMPLE_PACKAGES_FILTRATION
  )
}

async function fillTheFormWithRandomData() {
  wrapper.vm.setValues(EXAMPLE_PACKAGES_FILTRATION)
  await flushPromises()
}

async function clickButton(id: string) {
  const button = wrapper.find(id)
  expect(button.isVisible()).toBe(true)
  await button.trigger('click')
}
