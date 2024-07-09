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

import ModalOverlay from '@/components/common/overlay/ModalOverlay.vue'
import { createPinia, setActivePinia } from 'pinia'
import { shallowMount } from '@vue/test-utils'
import { useCommonStore } from '@/store/common'
import EditUserModal from '@/components/users/modals/EditUserModal.vue'

let wrapper: any
let commonStore: any

describe('ModalOverlay - chosen component', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    commonStore = useCommonStore()
    wrapper = shallowMount(ModalOverlay, {
      data() {
        return {}
      },
      slots: {
        props: EditUserModal
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders chosen component', () => {
    expect(
      wrapper.findComponent('user-edit-stub').exists()
    ).toBe(true)
  })

  it('reset after escape button is clicked', async () => {
    const event = new KeyboardEvent('keyup', {
      code: 'Escape'
    })
    await document.dispatchEvent(event)
    expect(commonStore.overlay).toBe(false)
    expect(wrapper.emitted().action).toBeTruthy()
  })
})

describe('Overlay - default', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    wrapper = shallowMount(ModalOverlay)
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
