/*
 * R Depot
 *
 * Copyright (C) 2012-2024 Open Analytics NV
 *
 * ===========================================================================
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License as published by
 * The Apache Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache License for more details.
 *
 * You should have received a copy of the Apache License
 * along with this program. If not, see <http://www.apache.org/licenses/>
 *
 */

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
import { useUtilities } from '@/composable/utilities'

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

const { deepCopyAny } = useUtilities()

describe('Packages - package row (packagebag)', () => {
  const packagebag: EntityModelRPackageDto = deepCopyAny(
    packages.data.content[0]
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
    const checkboxActive = wrapper.find('#checkbox-active')
    expect(checkboxActive.element.checked).toEqual(
      packagebag.active
    )
  })

  it('click active field (checkbox)', async () => {
    const checkboxActive = wrapper.find('#checkbox-active')
    expect(checkboxActive.element.checked).toEqual(
      packagebag.active
    )
    await checkboxActive.trigger('click')
    expect(checkboxActive.element.checked).toEqual(
      !packagebag.active
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
    const checkboxActive = wrapper.find('#checkbox-active')
    expect(checkboxActive.exists()).toBeFalsy()
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
    expect(field.text()).toEqual('Columns.package.name')
  })

  it('version title', () => {
    const field = wrapper.find('#package-row-version')
    expect(field.text()).toBe('Columns.package.version')
  })

  it('title title', () => {
    const field = wrapper.find('#package-row-title')
    expect(field.text()).toBe('Columns.package.title')
  })

  it('technology title', () => {
    const field = wrapper.find('#package-row-technology')
    expect(field.text()).toBe('Columns.package.technology')
  })

  it('maintainer title', () => {
    const field = wrapper.find('#package-row-maintainer')
    expect(field.text()).toBe('Columns.package.maintainer')
  })

  it('active title', () => {
    const field = wrapper.find('#package-row-active')
    const checkboxActive = wrapper.find('#checkbox-active')
    expect(field.text()).toBe('Columns.package.active')
    expect(checkboxActive.exists()).toBeFalsy()
  })

  it('delete package button not exists', () => {
    expect(wrapper.find('#delete-icon').exists()).toBe(
      false
    )
  })
})
