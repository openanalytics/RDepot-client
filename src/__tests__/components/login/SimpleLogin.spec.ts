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

// TODO

import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import SimpleLogin from '@/components/login/SimpleLogin.vue'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import users from '@/__tests__/config/mockData/loginUsers.json'
import { useUtilities } from '@/composable/utilities'
import { createPinia, setActivePinia } from 'pinia'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
const { deepCopyAny } = useUtilities()

beforeEach(async () => {
  setActivePinia(createPinia())
  wrapper = mount(SimpleLogin, {
    global: globalConfig
  })
})

describe('SimpleLogin', () => {
  const userCorrect = deepCopyAny(users.content[0])
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('correct login', async () => {
    const fieldUsername = wrapper.find('#username-input')
    fieldUsername.setValue(userCorrect.login)
    const fieldPassword = wrapper.find('#password-input')
    fieldPassword.setValue(userCorrect.password)
    const loginButton = wrapper.find('#login-simple-button')
    expect(loginButton.exists()).toBeTruthy()
    await loginButton.trigger('click')
    expect(
      wrapper.find('.v-messages').isVisible()
    ).toBeFalsy()
  })

  it('empty username field', async () => {
    const fieldUsername = wrapper.find('#username-input')
    expect(fieldUsername.element.value).toBe('')
    const fieldPassword = wrapper.find('#password-input')
    fieldPassword.setValue(userCorrect.password)
    const loginButton = wrapper.find('#login-simple-button')
    expect(loginButton.exists()).toBeTruthy()
    await loginButton.trigger('click')
    const passwordMessage =
      // wrapper.findAll('.v-messages')[0].element.firstChild
      wrapper.findAll('.v-input__details')[0].element
        .firstChild.innerHTML
    // .html()

    expect(passwordMessage).toBeFalsy()
  })

  it('reset simple login', async () => {
    const fieldUsername = wrapper.find('#username-input')
    fieldUsername.setValue(userCorrect.login)
    const fieldPassword = wrapper.find('#password-input')
    fieldPassword.setValue(userCorrect.password)
    const resetButton = wrapper.find('#reset-button')
    expect(resetButton.exists()).toBeTruthy()
    expect(fieldUsername.element.value).toBe(
      userCorrect.login
    )
    expect(fieldPassword.element.value).toBe(
      userCorrect.password
    )
    await resetButton.trigger('click')
    expect(fieldUsername.element.value).toBe('')
    expect(fieldPassword.element.value).toBe('')
  })
})
