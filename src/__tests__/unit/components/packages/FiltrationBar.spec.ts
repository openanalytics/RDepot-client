/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
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

import flushPromises from 'flush-promises'
import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import FiltrationBarVue from '@/components/packages/FiltrationBar.vue'
import { createPinia, setActivePinia } from 'pinia'
import { usePackagesStore } from '@/store/options/packages'
import { Technologies } from '@/enum/Technologies'
import {
  defaultValues,
  PackagesFiltration
} from '@/models/Filtration'
import waitForExpect from 'wait-for-expect'
import { useAuthorizationStore } from '@/store/options/authorization'
import me from '@/__tests__/config/mockData/me.json'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let packagesStore: any
let authorizationStore: any

const EXAMPLE_PACKAGES_FILTRATION =
  PackagesFiltration.parse({
    submissionState: ['ACCEPTED'],
    repository: ['repository1'],
    deleted: false,
    technologies: [Technologies.enum.R],
    maintainer: ['newton'],
    search: 'a'
  })

beforeEach(async () => {
  setActivePinia(createPinia())
  packagesStore = usePackagesStore()
  authorizationStore = useAuthorizationStore()
  authorizationStore.me = me.data
  wrapper = mount(FiltrationBarVue, {
    global: globalConfig
  })
})

describe('Packages - filtration', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('reset button hidden without filtration', () => {
    expect(wrapper.find('#reset-button').isVisible()).toBe(
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
    defaultValues(PackagesFiltration)
  )
}

function checkIfPiniaFiltrationIsEmpty() {
  expect(packagesStore.filtration).toEqual(
    defaultValues(PackagesFiltration)
  )
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
