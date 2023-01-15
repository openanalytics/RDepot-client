import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { router } from '@/__tests__/config'

import AppVue from '@/App.vue'
import PackagesVue from '@/views/packages/Packages.vue'
import { globalConfig } from '@/__tests__/config'
import { useCommonStore } from '@/store/common'

describe('App', () => {
  it('renders packages list via router', async () => {
    const common_store = useCommonStore()
    router.push('/packages')
    await router.isReady()
    const wrapper = mount(AppVue, {
      global: globalConfig
    })

    expect(
      wrapper.findComponent(PackagesVue).exists()
    ).toBe(true)
  })
})
