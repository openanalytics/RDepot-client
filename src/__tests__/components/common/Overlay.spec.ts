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
    let a = wrapper.html()
    expect(
      wrapper
        .findComponent('question-card-stub')
        .isVisible()
    ).toBe(true)
  })
})