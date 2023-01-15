import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import QuestionCard from '../../common/QuestionCard.vue'
import { global } from '@/components/__tests__/config'

const MESSAGE = 'Do you want to reset the form?'

describe('QuestionCard', () => {
  it('renders properly', () => {
    const wrapper = mount(QuestionCard, {
      global: global,
      props: { text: MESSAGE }
    })
    expect(wrapper.text()).toContain(MESSAGE)
  })
})
