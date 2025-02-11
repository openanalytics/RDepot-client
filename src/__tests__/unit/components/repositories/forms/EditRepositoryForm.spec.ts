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

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { createPinia, setActivePinia } from 'pinia'
import EditRepositoryForm from '@/components/repositories/forms/EditRepositoryForm.vue'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

describe('EditRepository', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    wrapper = mount(EditRepositoryForm, {
      global: globalConfig,
      props: {
        generateManual: true,
        technology: 'R'
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('all fields are correctly displayed', () => {
    expect(
      wrapper.findAll('.v-field__field').length
    ).toEqual(4)
    expect(wrapper.find('#edit-name')).toBeTruthy()
    expect(
      wrapper.find('#edit-publication-uri')
    ).toBeTruthy()
    expect(
      wrapper.find('#edit-server-address')
    ).toBeTruthy()
    expect(wrapper.find('#edit-technology')).toBeTruthy()
  })

  it('technology field is disabled', () => {
    expect(
      wrapper.find('#edit-technology').isDisabled()
    ).toBeTruthy()
  })

  it('other fields are not disabled', () => {
    expect(
      wrapper.find('#edit-name').isDisabled()
    ).toBeFalsy()
    expect(
      wrapper.find('#edit-publication-uri').isDisabled()
    ).toBeFalsy()
    expect(
      wrapper.find('#edit-server-address').isDisabled()
    ).toBeFalsy()
  })
})
