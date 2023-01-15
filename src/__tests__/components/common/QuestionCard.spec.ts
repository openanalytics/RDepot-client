import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import QuestionCard from '@/components/common/QuestionCard.vue'
import { globalConfig } from '@/__tests__/config'

const MESSAGE = 'Do you want to reset the form?'

describe('QuestionCard', () => {
  it('renders properly', () => {
    const wrapper = mount(QuestionCard, {
      global: globalConfig,
      props: { text: MESSAGE }
    })
    expect(wrapper.text()).toContain(MESSAGE)
  })
})
