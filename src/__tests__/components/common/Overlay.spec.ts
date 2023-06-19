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

import { describe, it, expect, beforeEach } from 'vitest'

import Overlay from '@/components/common/Overlay.vue'
import FiltrationVue from '@/components/packages/Filtration.vue'
import { createPinia, setActivePinia } from 'pinia'
import { shallowMount } from '@vue/test-utils'
import { useCommonStore } from '@/store/common'

let wrapper: any
let common_store: any

describe('Overlay - chosen component', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    common_store = useCommonStore()
    wrapper = shallowMount(Overlay, {
      data() {
        return {}
      },
      slots: {
        props: FiltrationVue
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders chosen component', async () => {
    expect(
      wrapper.findComponent('filtration-stub').isVisible()
    ).toBe(true)
    expect(
      wrapper.findComponent('question-card-stub').exists()
    ).toBe(false)
  })

  it('reset after escape button is clicked', async () => {
    const event = new KeyboardEvent('keyup', {
      code: 'Escape'
    })
    await document.dispatchEvent(event)
    expect(common_store.overlayModel).toBe(false)
    expect(wrapper.emitted().action).toBeTruthy()
  })
})

describe('Overlay - default', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    wrapper = shallowMount(Overlay)
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders default component', async () => {
    expect(
      wrapper
        .findComponent('question-card-stub')
        .isVisible()
    ).toBe(true)
  })
})
