import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import QuestionCard from '@/components/common/QuestionCard.vue'
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
