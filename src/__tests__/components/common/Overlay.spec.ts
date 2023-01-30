import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import Overlay from '@/components/common/Overlay.vue'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import FiltrationVue from '@/components/packages/Filtration.vue'
import { createPinia, setActivePinia } from 'pinia'
import QuestionCardVue from '@/components/common/QuestionCard.vue'

let wrapper: any
const MESSAGE = 'Do you want to reset the form?'
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

describe('Overlay - filtration', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    wrapper = mount(Overlay, {
      global: globalConfig,
      props: {
        text: MESSAGE,
        overlay: true,
        opacity: 1,
        component: 0
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('render filtration conmponent if props says so', async () => {
    const content = wrapper.findComponent(FiltrationVue)
    expect(wrapper.vm.packagesFiltration).toEqual(true)
    expect(content.exists()).toBeTruthy()
  })

  it('send event after getting it from child', async () => {
    const content = wrapper.findComponent(FiltrationVue)
    expect(content.exists()).toBeTruthy()
    const childButton = content.find('#setfiltration')
    await childButton.trigger('click')
    expect(wrapper.emitted().overlayClicked[0]).toEqual([
      false
    ])
  })

  it('not render questioncard conmponent if props says so', async () => {
    const content = wrapper.findComponent(QuestionCardVue)
    expect(content.exists()).toBeFalsy()
    expect(wrapper.vm.resetPackagesFiltration).toEqual(
      false
    )
  })

  it('send event for closing overaly after escape key is clicked', async () => {
    const event = new KeyboardEvent('keyup', {
      code: 'Escape'
    })
    await document.dispatchEvent(event)
    expect(wrapper.emitted().overlayClicked).toBeTruthy()
  })
})

describe('Overlay - questioncard', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    wrapper = mount(Overlay, {
      global: globalConfig,
      props: {
        text: MESSAGE,
        overlay: true,
        opacity: 1,
        component: 1
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('render questioncard component if props says so', async () => {
    const content = wrapper.findComponent(QuestionCardVue)
    expect(content.exists()).toBeTruthy()
    expect(wrapper.vm.resetPackagesFiltration).toEqual(true)
  })

  it('send event after getting it from child', async () => {
    const content = wrapper.findComponent(QuestionCardVue)
    expect(content.exists()).toBeTruthy()
    const childButton = content.find('#applyaction')
    await childButton.trigger('click')
    expect(wrapper.emitted().overlayClicked[0]).toEqual([
      true
    ])
  })

  it('not render filtration component if props says so', async () => {
    const content = wrapper.findComponent(FiltrationVue)
    expect(content.exists()).toBeFalsy()
    expect(wrapper.vm.packagesFiltration).toEqual(false)
  })

  it('send event for closing overaly after escape key is clicked', async () => {
    const event = new KeyboardEvent('keyup', {
      code: 'Escape'
    })
    await document.dispatchEvent(event)
    expect(wrapper.emitted().overlayClicked).toBeTruthy()
  })
})
