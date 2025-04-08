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
import CreateRepositoryForm from '@/components/repositories/forms/CreateRepositoryForm.vue'
import { Technologies } from '@/enum/Technologies'
import { nextTick } from 'vue'
import { HashMethods } from '@/enum/HashMethods'
import { useRepositoryStore } from '@/store/options/repositories'
import { useAuthorizationStore } from '@/store/options/authorization'
import me from '@/__tests__/config/mockData/me.json'

let wrapper: any
let repositoryStore: any
let authorizationStore: any

const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

describe('CreateRepository', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    await nextTick()
    repositoryStore = useRepositoryStore()
    authorizationStore = useAuthorizationStore()
    authorizationStore.me = me.data
    wrapper = mount(CreateRepositoryForm, {
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
    ).toEqual(4)
    expect(
      wrapper.find('#repository-create-name')
    ).toBeTruthy()
    expect(
      wrapper.find('#repository-create-publication-uri')
    ).toBeTruthy()
    expect(
      wrapper.find('#repository-crete-server-address')
    ).toBeTruthy()
    expect(
      wrapper.find('#repository-create-technology')
    ).toBeTruthy()
  })

  it('hash method field is not displayed', () => {
    expect(
      wrapper
        .find('#repository-create-hash-method')
        .exists()
    ).toBeFalsy()
  })

  it('all fields are enabled', () => {
    expect(
      wrapper.find('#repository-create-name').isDisabled()
    ).toBeFalsy()
    expect(
      wrapper
        .find('#repository-create-publication-uri')
        .isDisabled()
    ).toBeFalsy()
    expect(
      wrapper
        .find('#repository-create-server-address')
        .isDisabled()
    ).toBeFalsy()
    expect(
      wrapper
        .find('#repository-create-technology')
        .isDisabled()
    ).toBeFalsy()
  })

  it('hash method field is displayed with a default value when technology is Python', async () => {
    wrapper.vm.setFieldValue(
      'technology',
      Technologies.Enum.Python
    )
    await nextTick()
    expect(
      wrapper
        .find('#repository-create-hash-method')
        .exists()
    ).toBeTruthy()
    expect(wrapper.vm.values.hashMethod).toEqual(
      HashMethods.Enum.MD5
    )
  })

  it('hash method field is not displayed when technology is R', async () => {
    wrapper.vm.setFieldValue(
      'technology',
      Technologies.Enum.R
    )
    await nextTick()
    expect(
      wrapper
        .find('#repository-create-hash-method')
        .exists()
    ).toBeFalsy()
  })

  it('redirect to source field is displayed when technology is R', async () => {
    wrapper.vm.setFieldValue(
      'technology',
      Technologies.Enum.R
    )
    await nextTick()
    expect(
      wrapper
        .find('#repository-create-redirect-to-source')
        .exists()
    ).toBeTruthy()
  })

  it('redirect to source field is not displayed when technology is Python', async () => {
    wrapper.vm.setFieldValue(
      'technology',
      Technologies.Enum.Python
    )
    await nextTick()
    expect(
      wrapper
        .find('#repository-create-redirect-to-source')
        .exists()
    ).toBeFalsy()
  })

  it('should not call create repository if form is empty', async () => {
    const spy = vi.spyOn(repositoryStore, 'create')
    const createButton = wrapper.find('#submit-button')
    await createButton.trigger('click')
    await nextTick()
    expect(spy).toBeCalledTimes(0)
  })

  it('should not call create repository if form is invalid', async () => {
    const spy = vi.spyOn(repositoryStore, 'create')
    wrapper.vm.setFieldValue(
      'technology',
      Technologies.Enum.R
    )
    wrapper.vm.setFieldValue('name', 'testName')
    wrapper.vm.setFieldValue(
      'serverAddress',
      'invalid address'
    )
    wrapper.vm.setFieldValue(
      'publicationUri',
      'invalid publication uri'
    )
    await nextTick()
    const createButton = wrapper.find('#submit-button')
    await createButton.trigger('click')
    await nextTick()
    expect(spy).toBeCalledTimes(0)
  })

  it('should call create repository if form is valid', async () => {
    const spy = vi.fn(() => {})
    repositoryStore.create = spy
    wrapper.vm.setFieldValue(
      'technology',
      Technologies.Enum.R
    )
    wrapper.vm.setFieldValue('name', 'testName')
    wrapper.vm.setFieldValue(
      'serverAddress',
      'http://localhost:8080/repo/testRepo'
    )
    wrapper.vm.setFieldValue(
      'publicationUri',
      'http://oa-repo-app:8080/testRepo'
    )
    wrapper.vm.setTouched(true)
    await nextTick()
    const createButton = wrapper.find('#submit-button')
    await createButton.trigger('click')
    await nextTick()
    expect(spy).toHaveBeenCalledOnce()
  })
})
