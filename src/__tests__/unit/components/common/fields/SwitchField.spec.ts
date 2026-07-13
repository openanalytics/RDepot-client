/*
 * R Depot
 *
 * Copyright (C) 2012-2026 Open Analytics NV
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

import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import SwitchField from '@/components/common/fields/SwitchField.vue'

const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

describe('SwitchField', () => {
  it('cycles false → true → false in binary mode', async () => {
    const wrapper = mount(SwitchField, {
      props: {
        initialValue: false,
        indeterminate: false
      },
      global: globalConfig
    })

    await wrapper.find('input').trigger('click')
    let events = wrapper.emitted('setValue')
    expect(events).toBeTruthy()
    expect(events![0]).toEqual([true])

    await wrapper.find('input').trigger('click')
    events = wrapper.emitted('setValue')
    expect(events).toBeTruthy()
    expect(events![1]).toEqual([false])
  })

  it('cycles false → undefined → true → false in tri-state mode', async () => {
    const wrapper = mount(SwitchField, {
      props: {
        initialValue: false,
        indeterminate: true
      },
      global: globalConfig
    })

    const input = wrapper.find('input')

    await input.trigger('click')
    let events = wrapper.emitted('setValue')
    expect(events).toBeTruthy()
    expect(events![0]).toEqual([undefined])

    await input.trigger('click')
    events = wrapper.emitted('setValue')
    expect(events).toBeTruthy()
    expect(events![1]).toEqual([true])

    await input.trigger('click')
    events = wrapper.emitted('setValue')
    expect(events).toBeTruthy()
    expect(events![2]).toEqual([false])
  })

  it('starts correctly from undefined', async () => {
    const wrapper = mount(SwitchField, {
      props: {
        initialValue: undefined,
        indeterminate: true
      },
      global: globalConfig
    })

    await wrapper.find('input').trigger('click')
    const events = wrapper.emitted('setValue')

    expect(events).toBeTruthy()
    expect(events![0]).toEqual([true])
  })

  it('reacts to external initialValue change', async () => {
    const wrapper = mount(SwitchField, {
      props: {
        initialValue: false,
        indeterminate: false
      },
      global: globalConfig
    })

    await wrapper.setProps({ initialValue: true })

    expect(wrapper.props('initialValue')).toBe(true)
  })
})
