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
import packages from '@/__tests__/config/mockData/packages.json'
import { EntityModelRPackageDto } from '@/openapi'
import { createPinia, setActivePinia } from 'pinia'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
beforeAll(() => {
  global.ResizeObserver = ResizeObserver
  config.global.renderStubDefaultSlot = true
  setActivePinia(createPinia())
})

describe('Packages - package row (packagebag)', () => {
  const packagebag: EntityModelRPackageDto = JSON.parse(
    JSON.stringify(packages.data.content[0])
  )
  beforeEach(async () => {
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

  it('name field', () => {
    const field = wrapper.find('#package-row-name')
    expect(field.text()).toBe(packagebag.name)
  })

  it('version field', () => {
    const field = wrapper.find('#package-row-version')
    expect(field.text()).toBe(packagebag.version)
  })

  it('title field', () => {
    const field = wrapper.find('#package-row-title')
    expect(field.text()).toBe(
      packagebag.title?.slice(0, wrapper.vm.descMaxLength)
    )
  })

  it('maintainer field', () => {
    const field = wrapper.find('#package-row-maintainer')
    expect(field.text()).toBe(
      packagebag.user?.name?.toString()
    )
  })

  it('active field (checkbox)', () => {
    const checkbox_active = wrapper.find('#checkbox-active')
    expect(checkbox_active.element.checked).toEqual(
      packagebag.active
    )
  })

  it('click active field (checkbox)', async () => {
    const checkbox_active = wrapper.find('#checkbox-active')
    expect(checkbox_active.element.checked).toEqual(
      packagebag.active
    )
    await checkbox_active.trigger('click')
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

describe('Packages - package row (empty)', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    wrapper = mount(PackageRowVue, {
      global: globalConfig,
      props: {
        title: false
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('name field', () => {
    const field = wrapper.find('#package-row-name')
    expect(field.text()).toBe('')
  })

  it('version field', () => {
    const field = wrapper.find('#package-row-version')
    expect(field.text()).toBe('')
  })

  it('title field', () => {
    const field = wrapper.find('#package-row-title')
    expect(field.text()).toBe('')
  })

  it('maintainer field', () => {
    const field = wrapper.find('#package-row-maintainer')
    expect(field.text()).toBe('')
  })

  it('active field (checkbox)', () => {
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

describe('Packages - package row (title)', () => {
  beforeEach(async () => {
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

  it('name title', () => {
    const field = wrapper.find('#package-row-name')
    expect(field.text()).toEqual('Packages.name')
  })

  it('version title', () => {
    const field = wrapper.find('#package-row-version')
    expect(field.text()).toBe('Packages.version')
  })

  it('title title', () => {
    const field = wrapper.find('#package-row-title')
    expect(field.text()).toBe('Packages.title')
  })

  it('maintainer title', () => {
    const field = wrapper.find('#package-row-maintainer')
    expect(field.text()).toBe('Packages.maintainer')
  })

  it('active title', () => {
    const field = wrapper.find('#package-row-active')
    const checkbox_active = wrapper.find('#checkbox-active')
    expect(field.text()).toBe('Packages.active')
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
