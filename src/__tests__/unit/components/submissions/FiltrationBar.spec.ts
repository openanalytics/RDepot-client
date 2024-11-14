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
import FiltrationBarVue from '@/components/submissions/FiltrationBar.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useSubmissionStore } from '@/store/options/submission'
import {
  SubmissionsFiltration,
  defaultValues
} from '@/models/Filtration'
import flushPromises from 'flush-promises'
import waitForExpect from 'wait-for-expect'
import { Technologies } from '@/enum/Technologies'
import { useAuthorizationStore } from '@/store/options/authorization'
import me from '@/__tests__/config/mockData/me.json'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let submissions_store: any
let authorizationStore: any

const example_submission_filtration =
  SubmissionsFiltration.parse({
    state: ['ACCEPTED'],
    assignedToMe: false,
    search: 'accured',
    technologies: [Technologies.enum.Python],
    repository: ['repository1'],
    fromDate: '2019-05-03',
    toDate: '2022-09-20'
  })

beforeEach(async () => {
  setActivePinia(createPinia())
  submissions_store = useSubmissionStore()
  authorizationStore = useAuthorizationStore()
  authorizationStore.me = me.data
  wrapper = mount(FiltrationBarVue, {
    global: globalConfig
  })
})

describe('Submissions - filtration', () => {
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
    defaultValues(SubmissionsFiltration)
  )
}

function checkIfPiniaFiltrationIsEmpty() {
  expect(submissions_store.filtration).toEqual(
    defaultValues(SubmissionsFiltration)
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
