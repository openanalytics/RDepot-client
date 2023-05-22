/*
 *  R Depot
 *
 *  Copyright (C) 2012-2023 Open Analytics NV
 *
 *  ===========================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the Apache License as published by
 *  The Apache Software Foundation, either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  Apache License for more details.
 *
 *  You should have received a copy of the Apache License
 *  along with this program. If not, see <http://www.apache.org/licenses/>
 *
 */

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
import { Technologies } from '@/enum/Technologies'
import {
  RepositoriesFiltration,
  defaultValues
} from '@/models/Filtration'
import flushPromises from 'flush-promises'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let repositories_store: any

const example_repository_filtration =
  RepositoriesFiltration.parse({
    name: 'testrepo1',
    deleted: true,
    technologies: [Technologies.enum.R]
  })

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

describe('Repositories - filtration', () => {
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
    wrapper.vm.values.technologies = [
      Technologies.enum.Python
    ]
    await clickButton('#reset-button')
    checkIfFiltrationIsEmpty()
    expect(
      repositories_store.filtration.technologies
    ).toStrictEqual([Technologies.enum.R])
  })

  it('reset form but and cancel it', async () => {
    await fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    wrapper.vm.values.technologies = [
      Technologies.enum.Python
    ]
    await clickButton('#reset-button')
    await clickButton('#cancel-button')
    expect(
      repositories_store.filtration.technologies
    ).toStrictEqual([Technologies.enum.R])
  })

  it('change state but cancel action', async () => {
    await fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    await clickButton('#set-filtration')
    wrapper.vm.values.technologies =
      Technologies.enum.Python
    await clickButton('#cancel-button')
    expect(
      repositories_store.filtration.technologies
    ).toStrictEqual([Technologies.enum.R])
  })

  it('clear form and accept it', async () => {
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
    fillTheFormWithRandomData()
    await clickButton('#set-filtration')
    expect(wrapper.emitted().closeModal).toBeTruthy()
    checkIfPiniaFiltrationIsFilledWithData()
  })
})

function checkIfFiltrationIsEmpty() {
  expect(wrapper.vm.values).toEqual(
    defaultValues(RepositoriesFiltration)
  )
}

function checkIfPiniaFiltrationIsEmpty() {
  expect(repositories_store.filtration).toEqual(
    defaultValues(RepositoriesFiltration)
  )
}

function checkIfPiniaFiltrationIsFilledWithData() {
  expect(repositories_store.filtration.name).toBe(
    'testrepo1'
  )
  expect(
    repositories_store.filtration.technologies
  ).toStrictEqual([Technologies.enum.R])
  expect(repositories_store.filtration.deleted).toBe(true)
}

function fillPiniaFiltrationWithRandomData() {
  repositories_store.filtration =
    RepositoriesFiltration.parse(
      example_repository_filtration
    )
}

async function fillTheFormWithRandomData() {
  wrapper.vm.setValues(example_repository_filtration)
  await flushPromises()
}

async function clickButton(id: string) {
  const button = wrapper.find(id)
  expect(button.isVisible()).toBe(true)
  await button.trigger('click')
}
