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
import { plugins } from '@/__tests__/unit/config/plugins'
import { mocks } from '@/__tests__/unit/config/mocks'
import ChangeThemeVue from '@/components/navbar/ChangeTheme.vue'
import { createPinia, setActivePinia } from 'pinia'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeEach(async () => {
  setActivePinia(createPinia())
  wrapper = mount(ChangeThemeVue, {
    global: globalConfig
  })
})

describe('Change Theme', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.vm.theme.global.name.value).toEqual(
      'light'
    )
  })

  it('change theme on click', async () => {
    const themeSwitch = wrapper.find('#theme-switch')
    await themeSwitch.trigger('click')
    expect(wrapper.vm.theme.global.name.value).toEqual(
      'dark'
    )
  })

  it('change theme two times after two clicks', async () => {
    const themeSwitch = wrapper.find('#theme-switch')
    wrapper.vm.theme.global.name.value = 'dark'
    await themeSwitch.trigger('click')
    expect(wrapper.vm.theme.global.name.value).toEqual(
      'light'
    )
    await themeSwitch.trigger('click')
    expect(wrapper.vm.theme.global.name.value).toEqual(
      'dark'
    )
  })
})
