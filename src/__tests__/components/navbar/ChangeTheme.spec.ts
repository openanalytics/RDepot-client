import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import ChangeThemeVue from '@/components/navbar/ChangeTheme.vue'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeEach(async () => {
  wrapper = mount(ChangeThemeVue, {
    global: globalConfig
  })
})

describe('Change Theme', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.vm.theme.global.name.value).toEqual(
      'light'
    )
  })

  it('change theme on click', async () => {
    await wrapper.trigger('click')
    expect(wrapper.vm.theme.global.name.value).toEqual(
      'dark'
    )
  })

  it('change theme two times after two clicks', async () => {
    await wrapper.trigger('click')
    expect(wrapper.vm.theme.global.name.value).toEqual(
      'light'
    )
    await wrapper.trigger('click')
    expect(wrapper.vm.theme.global.name.value).toEqual(
      'dark'
    )
  })
})
