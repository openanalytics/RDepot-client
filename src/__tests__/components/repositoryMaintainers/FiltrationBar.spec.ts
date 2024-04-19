/*
 * R Depot
 *
 * Copyright (C) 2012-2024 Open Analytics NV
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
import FiltrationBarVue from '@/components/repositoryMaintainers/FiltrationBar.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'
import { Technologies } from '@/enum/Technologies'
import {
  RepositoryMaintainersFiltration,
  defaultValues
} from '@/models/Filtration'
import waitForExpect from 'wait-for-expect'
import { useMeStore } from '@/store/me'
import me from '@/__tests__/config/mockData/me.json'

let wrapper: any
let meStore: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let repositoryMaintainersStore: any

const EXAMPLE_REPOSITORY_MAINTAINER_FILTRATION =
  RepositoryMaintainersFiltration.parse({
    deleted: false,
    technologies: [Technologies.enum.Python],
    search: 'ana'
  })

beforeAll(() => {
  global.ResizeObserver = ResizeObserver
})

beforeEach(async () => {
  setActivePinia(createPinia())
  repositoryMaintainersStore =
    useRepositoryMaintainersStore()
  meStore = useMeStore()
  meStore.me = me.data
  wrapper = mount(FiltrationBarVue, {
    global: globalConfig
  })
})

describe('Repository Maintainers - filtration', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('reset button hidden without filtration', () => {
    expect(wrapper.find('#reset-button').exists()).toBe(
      false
    )
  })

  it('reset button visible with filtration', async () => {
    await fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    await waitForExpect(() => {
      expect(
        wrapper.find('#reset-button').isVisible()
      ).toBe(true)
    })
  })

  it('reset form', async () => {
    await fillTheFormWithRandomData()
    fillPiniaFiltrationWithRandomData()
    await waitForExpect(() => {
      expect(
        wrapper.find('#reset-button').isVisible()
      ).toBe(true)
    })
    await clickButton('#reset-button')
    checkIfFiltrationIsEmpty()
    checkIfPiniaFiltrationIsEmpty()
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
