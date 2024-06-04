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
import QuestionCard from '@/components/common/overlay/QuestionCard.vue'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'

let wrapper: any
const MESSAGE = 'Do you want to reset the form?'
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeEach(async () => {
  wrapper = mount(QuestionCard, {
    global: globalConfig,
    props: { text: MESSAGE }
  })
})

describe('QuestionCard', () => {
  it('renders properly', () => {
    expect(wrapper.text()).toContain(MESSAGE)
    expect(wrapper.vm.text).toBe(MESSAGE)
  })

  it('emit fasle on cancel action', async () => {
    const content = wrapper.find('#cancel-action')
    expect(content.exists()).toBeTruthy()
    await content.trigger('click')
    expect(wrapper.emitted().cancel).toBeTruthy()
  })

  it('emit true on apply action', async () => {
    const content = wrapper.find('#apply-action')
    expect(content.exists()).toBeTruthy()
    await content.trigger('click')
    expect(wrapper.emitted().reset).toBeTruthy()
  })
})
