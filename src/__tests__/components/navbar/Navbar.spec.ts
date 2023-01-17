import { describe, it, expect, beforeEach } from 'vitest'

import { mount, shallowMount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import NavbarVue from '@/components/navbar/Navbar.vue'
import { createPinia, setActivePinia } from 'pinia'
import Vuetify from 'vuetify/lib/framework'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

// const ChangeLanguageStub = {
//   template: '<div>ChangeLanguageStub</div>'
// }
// const ChangeThemeStub = {
//   template: '<div>ChangeThemeStub</div>'
// }

beforeEach(async () => {
  setActivePinia(createPinia())
  wrapper = mount(NavbarVue, {
    // stubs: {
    //   ChangeLanguage: ChangeLanguageStub,
    //   ChangeTheme: ChangeThemeStub
    // },
    global: globalConfig
  })
})

describe('Navbar', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
    // expect(
    //   wrapper.findComponent(ChangeThemeStub).exists()
    // ).toBe(true)
    // expect(
    //   wrapper.findComponent(ChangeLanguageStub).exists()
    // ).toBe(true)
  })
})
