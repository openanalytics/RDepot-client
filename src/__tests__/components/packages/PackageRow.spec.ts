import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll
} from 'vitest'

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { ResizeObserver } from '@/__tests__/config/ResizeObserver'
import PackageRowVue from '@/components/packages/PackageRow.vue'
import { Package } from '@/models/packages/Package'
import packages from '@/tmpLists/packages.json'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
beforeAll(() => {
  global.ResizeObserver = ResizeObserver
})

describe('Packages - package row (packagebag)', () => {
  const packagebag = packages.page1[0]
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

  it('package name is correctly displayed', () => {
    const name_column = wrapper.find('#packagerowname')
    expect(name_column.text()).toBe(packagebag.name)
  })

  it('package version is correctly displayed', () => {
    const name_column = wrapper.find('#packagerowversion')
    expect(name_column.text()).toBe(packagebag.version)
  })

  it('package description is correctly displayed', () => {
    const name_column = wrapper.find(
      '#packagerowdescription'
    )
    expect(name_column.text()).toBe(
      packagebag.desc.slice(0, wrapper.vm.descMaxLength) +
        '...'
    )
  })

  it('package maintainer is correctly displayed', () => {
    const name_column = wrapper.find(
      '#packagerowmaintainer'
    )
    expect(name_column.text()).toBe(packagebag.maintainer)
  })

  it('package active value is correctly displayed', () => {
    const checkbox_active = wrapper.find('#checkboxactive')
    expect(checkbox_active.element.checked).toEqual(
      packagebag.active
    )
  })

  it('package active change value after click', async () => {
    const checkbox_active = wrapper.find('#checkboxactive')
    expect(checkbox_active.element.checked).toEqual(
      packagebag.active
    )
    await checkbox_active.setChecked(false)
    expect(checkbox_active.element.checked).toEqual(
      !packagebag.active
    )
  })

  it('package actions is correctly displayed', () => {
    const action = wrapper.find('#navigateicon')
    expect(action.exists()).toBeTruthy()
  })
})

describe('Packages - package row (empty packagebag)', () => {
  const packagebag: Package | null = null
  beforeEach(async () => {
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
    const name_column = wrapper.find('#packagerowname')
    expect(name_column.text()).toBe('')
  })

  it('package version is correctly displayed', () => {
    const name_column = wrapper.find('#packagerowversion')
    expect(name_column.text()).toBe('')
  })

  it('package description is correctly displayed', () => {
    const name_column = wrapper.find(
      '#packagerowdescription'
    )
    expect(name_column.text()).toBe('')
  })

  it('package maintainer is correctly displayed', () => {
    const name_column = wrapper.find(
      '#packagerowmaintainer'
    )
    expect(name_column.text()).toBe('')
  })

  it('package active value is correctly displayed', () => {
    const checkbox_active = wrapper.find('#checkboxactive')
    expect(checkbox_active.exists()).toBeFalsy()
  })
})

describe('Packages - package row (title row)', () => {
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

  it('package name is correctly displayed', () => {
    const name_column = wrapper.find('#packagerowname')
    expect(name_column.text()).toEqual('Packages.name')
  })

  it('package version is correctly displayed', () => {
    const name_column = wrapper.find('#packagerowversion')
    expect(name_column.text()).toBe('Packages.version')
  })

  it('package description is correctly displayed', () => {
    const name_column = wrapper.find(
      '#packagerowdescription'
    )
    expect(name_column.text()).toBe('Packages.description')
  })

  it('package maintainer is correctly displayed', () => {
    const name_column = wrapper.find(
      '#packagerowmaintainer'
    )
    expect(name_column.text()).toBe('Packages.maintainer')
  })

  it('package active value is correctly displayed', () => {
    const checkbox_active = wrapper.find('#checkboxactive')
    expect(checkbox_active.exists()).toBeFalsy()
  })
})
