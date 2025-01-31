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
import CreateRepositoryMaintainerForm from '@/components/repositoryMaintainers/forms/CreateRepositoryMaintainerForm.vue'
import { nextTick } from 'vue'
import { useAuthorizationStore } from '@/store/options/authorization'
import me from '@/__tests__/config/mockData/me.json'

let wrapper: any
let authorizationStore: any

const USER_FIELD_ID = '#create-repository-maintainer-user'
const REPOSITORY_FIELD_ID =
  '#create-repository-maintainer-repository'

const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

describe('CreateRepositoryMaintainer', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    await nextTick()
    authorizationStore = useAuthorizationStore()
    authorizationStore.me = me.data
    wrapper = mount(CreateRepositoryMaintainerForm, {
      global: globalConfig
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('all fields are correctly displayed', async () => {
    await nextTick()
    expect(
      wrapper.findAll('.v-field__field').length
    ).toEqual(2)
    expect(wrapper.find(USER_FIELD_ID)).toBeTruthy()
    expect(wrapper.find(REPOSITORY_FIELD_ID)).toBeTruthy()
  })

  it('user field is enabled', () => {
    expect(
      wrapper.find(USER_FIELD_ID).isDisabled()
    ).toBeFalsy()
  })

  it('repository field is disabled', () => {
    expect(
      wrapper.find(REPOSITORY_FIELD_ID).isDisabled()
    ).toBeTruthy()
  })
})
