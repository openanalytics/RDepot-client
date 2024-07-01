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

import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import FiltrationBarVue from '@/components/packageMaintainers/FiltrationBar.vue'
import { createPinia, setActivePinia } from 'pinia'
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import { Technologies } from '@/enum/Technologies'
import {
  PackageMaintainersFiltration,
  defaultValues
} from '@/models/Filtration'
import flushPromises from 'flush-promises'
import waitForExpect from 'wait-for-expect'
import { useAuthorizationStore } from '@/store/authorization'
import me from '@/__tests__/config/mockData/me.json'

let wrapper: any
let authorizationStore: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let packageMaintainersStore: any

const packageMaintainersStoreFiltration =
  PackageMaintainersFiltration.parse({
    deleted: false,
    technologies: [Technologies.enum.R],
    search: 'newton',
    repository: ['repository1']
  })

beforeEach(async () => {
  setActivePinia(createPinia())
  packageMaintainersStore = usePackageMaintainersStore()
  authorizationStore = useAuthorizationStore()
  authorizationStore.me = me.data
  wrapper = mount(FiltrationBarVue, {
    global: globalConfig
  })
})

describe('Packages Maintainers - filtration', () => {
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
    defaultValues(PackageMaintainersFiltration)
  )
}

function checkIfPiniaFiltrationIsEmpty() {
  expect(packageMaintainersStore.filtration).toEqual(
    defaultValues(PackageMaintainersFiltration)
  )
}

function fillPiniaFiltrationWithRandomData() {
  packageMaintainersStore.filtration =
    PackageMaintainersFiltration.parse(
      packageMaintainersStoreFiltration
    )
}

async function fillTheFormWithRandomData() {
  wrapper.vm.setValues(packageMaintainersStoreFiltration)
  await flushPromises()
}

async function clickButton(id: string) {
  const button = wrapper.find(id)
  expect(button.isVisible()).toBe(true)
  await button.trigger('click')
}
