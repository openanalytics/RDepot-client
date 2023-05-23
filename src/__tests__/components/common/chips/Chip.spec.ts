import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import Chip from '@/components/common/chips/Chip.vue'

let wrapper: any

const FIELD_NAME = 'name'
const NAME_VALUE = 'accured'
const FIELD_DELETED = 'deleted'

describe('Chip - with value', () => {
  beforeEach(async () => {
    wrapper = mount(Chip, {
      props: {
        label: FIELD_NAME,
        value: NAME_VALUE
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('both label and value are displayed', async () => {
    expect(wrapper.text()).toContain(FIELD_NAME)
    expect(wrapper.text()).toContain(':')
    expect(wrapper.text()).toContain(NAME_VALUE)
  })

  it('emit update on click', async () => {
    expect(
      wrapper.find('.chip-section').exists()
    ).toBeTruthy()
    const chip = wrapper.find('.chip-section')
    await chip.trigger('click')
    expect(wrapper.emitted().update).toBeTruthy()
  })
})

describe('Chip - without value', () => {
  beforeEach(async () => {
    wrapper = mount(Chip, {
      props: {
        label: FIELD_DELETED
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('only label is displayed', async () => {
    expect(wrapper.text()).toContain(FIELD_DELETED)
    expect(wrapper.text()).not.toContain(':')
  })
})
