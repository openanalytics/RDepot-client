import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll
} from 'vitest'

import { mount, config } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { ResizeObserver } from '@/__tests__/config/ResizeObserver'
import PackageRowVue from '@/components/packages/PackageRow.vue'
import { Package } from '@/models/packages/Package'
import packages from '@/tmpLists/packages.json'
import { EntityModelRPackageDto } from '@/openapi'
import { createPinia, setActivePinia } from 'pinia'
import { useCommonStore } from '@/store/common'

let wrapper: any
let common_store: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
beforeAll(() => {
  global.ResizeObserver = ResizeObserver
  config.global.renderStubDefaultSlot = true
})

describe('Packages - package row (packagebag)', () => {
  const packagebag: EntityModelRPackageDto = JSON.parse(
    JSON.stringify(packages.page1[0])
  )
  beforeEach(async () => {
    setActivePinia(createPinia())
    common_store = useCommonStore()
    wrapper = mount(PackageRowVue, {
      global: globalConfig,
      props: {
        title: false,
        packageBag: packagebag
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('package name is correctly displayed', () => {
    const name_column = wrapper.find('#package-row-name')
    expect(name_column.text()).toBe(packagebag.name)
  })

  it('package version is correctly displayed', () => {
    const name_column = wrapper.find('#package-row-version')
    expect(name_column.text()).toBe(packagebag.version)
  })

  it('package title is correctly displayed', () => {
    const name_column = wrapper.find('#package-row-title')
    expect(name_column.text()).toBe(
      packagebag.title?.slice(0, wrapper.vm.descMaxLength)
    )
  })

  it('package maintainer is correctly displayed', () => {
    const name_column = wrapper.find(
      '#package-row-maintainer'
    )
    expect(name_column.text()).toBe(
      packagebag.userId?.toString()
    )
  })

  it('package active value is correctly displayed', () => {
    const checkbox_active = wrapper.find('#checkbox-active')
    expect(checkbox_active.element.checked).toEqual(
      packagebag.active
    )
  })

  it('package active change value after click', async () => {
    const checkbox_active = wrapper.find('#checkbox-active')
    expect(checkbox_active.element.checked).toEqual(
      packagebag.active
    )
    await checkbox_active.setChecked(false)
    expect(checkbox_active.element.checked).toEqual(
      !packagebag.active
    )
  })

  it('navigate button is visiable', () => {
    expect(wrapper.find('#navigate-icon').isVisible()).toBe(
      true
    )
  })

  it('delete package button is visible', () => {
    expect(wrapper.find('#delete-icon').isVisible()).toBe(
      true
    )
  })
})

describe('Packages - package row (empty packagebag)', () => {
  const packagebag: Package | null = null
  beforeEach(async () => {
    setActivePinia(createPinia())
    common_store = useCommonStore()
    wrapper = mount(PackageRowVue, {
      global: globalConfig,
      props: {
        title: false,
        packageBag: packagebag!
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('package name is correctly displayed', () => {
    const name_column = wrapper.find('#package-row-name')
    expect(name_column.text()).toBe('')
  })

  it('package version is correctly displayed', () => {
    const name_column = wrapper.find('#package-row-version')
    expect(name_column.text()).toBe('')
  })

  it('package title is correctly displayed', () => {
    const name_column = wrapper.find('#package-row-title')
    expect(name_column.text()).toBe('')
  })

  it('package maintainer is correctly displayed', () => {
    const name_column = wrapper.find(
      '#package-row-maintainer'
    )
    expect(name_column.text()).toBe('')
  })

  it('package active value is correctly displayed', () => {
    const checkbox_active = wrapper.find('#checkbox-active')
    expect(checkbox_active.exists()).toBeFalsy()
  })

  it('navigate button not exists', () => {
    expect(wrapper.find('#navigate-icon').exists()).toBe(
      false
    )
  })

  it('delete package button not exists', () => {
    expect(wrapper.find('#delete-icon').exists()).toBe(
      false
    )
  })
})

describe('Packages - package row (title row)', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    common_store = useCommonStore()
    wrapper = mount(PackageRowVue, {
      global: globalConfig,
      props: {
        title: true
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('package name is correctly displayed', () => {
    const name_column = wrapper.find('#package-row-name')
    expect(name_column.text()).toEqual('Packages.name')
  })

  it('package version is correctly displayed', () => {
    const name_column = wrapper.find('#package-row-version')
    expect(name_column.text()).toBe('Packages.version')
  })

  it('package title is correctly displayed', () => {
    const name_column = wrapper.find('#package-row-title')
    expect(name_column.text()).toBe('Packages.title')
  })

  it('package maintainer is correctly displayed', () => {
    const name_column = wrapper.find(
      '#package-row-maintainer'
    )
    expect(name_column.text()).toBe('Packages.maintainer')
  })

  it('package active value is correctly displayed', () => {
    const checkbox_active = wrapper.find('#checkbox-active')
    expect(checkbox_active.exists()).toBeFalsy()
  })

  it('navigate button not exists', () => {
    expect(wrapper.find('#navigate-icon').exists()).toBe(
      false
    )
  })

  it('delete package button not exists', () => {
    expect(wrapper.find('#delete-icon').exists()).toBe(
      false
    )
  })
})
