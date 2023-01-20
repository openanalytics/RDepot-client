import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import PackageItemVue from '@/components/packages/PackageItem.vue'
import packages from '@/tmpLists/packages.json'
import PackageRowVue from '@/components/packages/PackageRow.vue'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeEach(async () => {
  wrapper = mount(PackageItemVue, {
    global: globalConfig,
    props: {
      packageBag: packages.page1[0]
    }
  })
})

describe('Packages - package item', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('shows package description after click on package', async () => {
    expect(wrapper.find('div.content').exists()).toBeFalsy()
    const title = wrapper.find('#expansionpaneltitle')
    expect(title.exists()).toBeTruthy()
    await title.trigger('click')
    const description = wrapper.find('div.content')
    expect(description.exists()).toBeTruthy()
    expect(description.text()).toBe(packages.page1[0].desc)
  })

  it('displays expansion panel with package short version', () => {
    const package_row = wrapper.findComponent(PackageRowVue)
    expect(package_row.exists()).toBeTruthy()
  })
})
