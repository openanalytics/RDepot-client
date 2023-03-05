import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import CommonButton from '@/components/common/Button.vue'

let wrapper: any
const MESSAGE = 'filtration'
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeEach(async () => {
  wrapper = mount(CommonButton, {
    global: globalConfig
  })
})

describe('Button', () => {
  it('renders properly', () => {
    expect(wrapper.text()).toContain(MESSAGE)
    expect(wrapper.vm.title).toBe(MESSAGE)
  })

  it('emit event on click', async () => {
    const content = wrapper.find('#commonbutton')
    expect(content.exists()).toBeTruthy()
    await content.trigger('click')
    expect(wrapper.emitted().buttonClicked).toBeTruthy()
  })
})
