import { describe, it, expect, beforeEach } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import CommonButton from '@/components/common/Button.vue'
import { useCommonStore } from '@/store/common'
import { createPinia, setActivePinia } from 'pinia'
import { i18n } from '@/plugins/i18n'

let wrapper: any
let common_store: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeEach(async () => {
  setActivePinia(createPinia())
  common_store = useCommonStore()
  wrapper = shallowMount(CommonButton, {
    global: globalConfig
  })
})

describe('Button', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('set overaly values after click', async () => {
    const content = wrapper.find('#common-button')
    expect(content.exists()).toBeTruthy()
    await content.trigger('click')
    expect(common_store.overlayText).toEqual(
      i18n.t('filtration.makeSure')
    )
    expect(common_store.overlayModel).toBe(true)
  })
})
