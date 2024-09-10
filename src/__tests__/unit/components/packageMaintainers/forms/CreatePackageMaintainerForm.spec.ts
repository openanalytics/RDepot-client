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
  vi
} from 'vitest'

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { createPinia, setActivePinia } from 'pinia'
import CreatePackageMaintainerForm from '@/components/packageMaintainers/forms/CreatePackageMaintainerForm.vue'
import { nextTick } from 'vue'
import { useAuthorizationStore } from '@/store/options/authorization'
import me from '@/__tests__/config/mockData/me.json'
import { usePackageMaintainersStore } from '@/store/options/packageMaintainers'

let wrapper: any
let authorizationStore: any
let packageMaintainerStore: any

const USER_FIELD_ID = '#create-package-maintainer-user'
const REPOSITORY_FIELD_ID =
  '#create-package-maintainer-repository'
const PACKAGE_FIELD_ID =
  '#create-package-maintainer-package'

const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

describe('CreatePackageMaintainer', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    authorizationStore = useAuthorizationStore()
    authorizationStore.me = me.data
    packageMaintainerStore = usePackageMaintainersStore()
    await nextTick()
    wrapper = mount(CreatePackageMaintainerForm, {
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
    ).toEqual(3)
    expect(wrapper.find(USER_FIELD_ID)).toBeTruthy()
    expect(wrapper.find(REPOSITORY_FIELD_ID)).toBeTruthy()
    expect(wrapper.find(PACKAGE_FIELD_ID)).toBeTruthy()
  })

  it('repository and user fields are enabled', () => {
    expect(
      wrapper.find(USER_FIELD_ID).isDisabled()
    ).toBeFalsy()

    expect(
      wrapper.find(REPOSITORY_FIELD_ID).isDisabled()
    ).toBeFalsy()
  })

  it('package field is disabled', () => {
    expect(
      wrapper.find(PACKAGE_FIELD_ID).isDisabled()
    ).toBeTruthy()
  })

  it('package field is enabled when both repository and user is chosen', async () => {
    wrapper.vm.setFieldValue('repository', {
      title: 'testrepo3',
      value: 10
    })
    wrapper.vm.setFieldValue('user', {
      title: 'Albert Einstein',
      value: 4
    })
    await nextTick()
    expect(
      wrapper.find(PACKAGE_FIELD_ID).isDisabled()
    ).toBeFalsy()
  })

  it('package field is disabled when only user is chosen', async () => {
    wrapper.vm.setFieldValue('repository', {
      title: 'testrepo3',
      value: 10
    })
    await nextTick()
    expect(
      wrapper.find(PACKAGE_FIELD_ID).isDisabled()
    ).toBeTruthy()
  })

  it('package field is disabled when only repository is chosen', async () => {
    wrapper.vm.setFieldValue('user', {
      title: 'Albert Einstein',
      value: 4
    })
    await nextTick()
    expect(
      wrapper.find(PACKAGE_FIELD_ID).isDisabled()
    ).toBeTruthy()
  })

  it('package field is disabled when repository field was unset', async () => {
    wrapper.vm.setFieldValue('repository', {
      title: 'testrepo3',
      value: 10
    })
    wrapper.vm.setFieldValue('user', {
      title: 'Albert Einstein',
      value: 4
    })
    await nextTick()
    wrapper.vm.setFieldValue('repository', undefined)
    await nextTick()
    expect(
      wrapper.find(PACKAGE_FIELD_ID).isDisabled()
    ).toBeTruthy()
  })

  it('package field is disabled when user field was unset', async () => {
    wrapper.vm.setFieldValue('repository', {
      title: 'testrepo3',
      value: 10
    })
    wrapper.vm.setFieldValue('user', {
      title: 'Albert Einstein',
      value: 4
    })
    await nextTick()
    wrapper.vm.setFieldValue('user', undefined)
    await nextTick()
    expect(
      wrapper.find(PACKAGE_FIELD_ID).isDisabled()
    ).toBeTruthy()
  })

  it('submit action triggers create maintainer action', async () => {
    const spy = vi.spyOn(packageMaintainerStore, 'create')
    wrapper.vm.setFieldValue('repository', {
      title: 'testrepo3',
      value: 10
    })
    wrapper.vm.setFieldValue('user', {
      title: 'Albert Einstein',
      value: 4
    })
    wrapper.vm.setFieldValue('package', {
      title: 'testpackge',
      value: 1
    })
    await nextTick()
    const createButton = wrapper.find('#submit-button')
    await createButton.trigger('click')
    await nextTick()
    expect(spy).toHaveBeenCalledOnce()
  })
})
