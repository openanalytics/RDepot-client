import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import Chip from '@/components/common/chips/Chip.vue'
import FiltrationChips from '@/components/common/chips/FiltrationChips.vue'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { packagesFiltrationLabels } from '@/maps/Filtration'

let wrapper: any

const VALUES = {
  state: 'ACCEPTED',
  technologies: ['R', 'Python'],
  deleted: true,
  repository: undefined
}

const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

describe('FiltrationChips', () => {
  beforeEach(async () => {
    wrapper = mount(FiltrationChips, {
      global: globalConfig,
      props: {
        values: VALUES,
        labels: packagesFiltrationLabels
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('render 4 chips (2 for technologies, 0 for undefined)', () => {
    expect(wrapper.findAllComponents(Chip).length).toBe(4)
  })

  it('emit update with field name (string)', async () => {
    expect(wrapper.find('#state').exists()).toBeTruthy()
    const chip = wrapper.find('#state')
    await chip.trigger('click')
    console.log(wrapper.emitted())
    expect(wrapper.emitted().update).toBeTruthy()
    expect(wrapper.emitted().update[0]).toStrictEqual([
      'state'
    ])
    expect(wrapper.emitted().update[1]).toBe(undefined)
  })

  it('emit update with field name and value (boolean)', async () => {
    expect(wrapper.find('#deleted').exists()).toBeTruthy()
    const chip = wrapper.find('#deleted')
    await chip.trigger('click')
    console.log(wrapper.emitted())
    expect(wrapper.emitted().update).toBeTruthy()
    expect(wrapper.emitted().update[0][0]).toBe('deleted')
    expect(wrapper.emitted().update[0][1]).toBe(false)
  })

  it('emit update with field name and values (string[])', async () => {
    expect(
      wrapper.find('#technologies').exists()
    ).toBeTruthy()
    const chip = wrapper.find('#technologies')
    await chip.trigger('click')
    console.log(wrapper.emitted())
    expect(wrapper.emitted().update).toBeTruthy()
    console.log(wrapper.emitted().update)
    expect(wrapper.emitted().update[0][0]).toBe(
      'technologies'
    )
    expect(wrapper.emitted().update[0][1]).toStrictEqual([
      'Python'
    ])
  })
})
