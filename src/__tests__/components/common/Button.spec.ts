import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import Button from '@/components/common/Button.vue'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'

let wrapper: any
const MESSAGE = 'Accept'
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeEach(async () => {
  wrapper = mount(Button, {
    global: globalConfig,
    props: { title: MESSAGE }
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
