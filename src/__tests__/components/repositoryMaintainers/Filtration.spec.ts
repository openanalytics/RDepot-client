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

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { ResizeObserver } from '@/__tests__/config/ResizeObserver'
import FiltrationVue from '@/components/repositoryMaintainers/Filtration.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'
import { Technologies } from '@/enum/Technologies'
import {
  RepositoryMaintainersFiltration,
  defaultValues
} from '@/models/Filtration'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let repositoryMaintainersStore: any

const EXAMPLE_REPOSITORY_MAINTAINER_FILTRATION =
  RepositoryMaintainersFiltration.parse({
    deleted: false,
    technologies: [Technologies.enum.Python]
  })

beforeAll(() => {
  global.ResizeObserver = ResizeObserver
})

beforeEach(async () => {
  setActivePinia(createPinia())
  repositoryMaintainersStore =
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
    await fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    wrapper.vm.technologies = [Technologies.enum.Python]
    await clickButton('#reset-button')
    checkIfFiltrationIsEmpty()
    expect(
      repositoryMaintainersStore.filtration.technologies
    ).toStrictEqual([Technologies.enum.Python])
  })

  it('reset form but and cancel it', async () => {
    fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    wrapper.vm.values.technologies = [Technologies.enum.R]
    await clickButton('#reset-button')
    await clickButton('#cancel-button')
    expect(
      repositoryMaintainersStore.filtration.technologies
    ).toStrictEqual([Technologies.enum.Python])
  })

  it('change state but cancel action', async () => {
    fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    await clickButton('#set-filtration')
    wrapper.vm.values.technologies = [Technologies.enum.R]
    await clickButton('#cancel-button')
    expect(
      repositoryMaintainersStore.filtration.technologies
    ).toStrictEqual([Technologies.enum.Python])
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
  expect(wrapper.vm.values).toEqual(
    defaultValues(RepositoryMaintainersFiltration)
  )
}

function checkIfPiniaFiltrationIsEmpty() {
  expect(repositoryMaintainersStore.filtration).toEqual(
    defaultValues(RepositoryMaintainersFiltration)
  )
}

function checkIfPiniaFiltrationIsFilledWithData() {
  expect(
    repositoryMaintainersStore.filtration.technologies
  ).toStrictEqual([Technologies.enum.Python])
  expect(
    repositoryMaintainersStore.filtration.deleted
  ).toBe(false)
}

function fillPiniaFiltrationWithRandomData() {
  repositoryMaintainersStore.filtration =
    RepositoryMaintainersFiltration.parse(
      EXAMPLE_REPOSITORY_MAINTAINER_FILTRATION
    )
}

function fillTheFormWithRandomData() {
  wrapper.vm.setValues(
    EXAMPLE_REPOSITORY_MAINTAINER_FILTRATION
  )
}

async function clickButton(id: string) {
  const cancelButton = wrapper.find(id)
  expect(cancelButton.isVisible()).toBe(true)
  await cancelButton.trigger('click')
}
