/*
 * R Depot
 *
 * Copyright (C) 2012-2023 Open Analytics NV
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
import PackageMaintainersRow from '@/components/packageMaintainers/PackageMaintainerRow.vue'
import maintainers from '@/__tests__/config/mockData/packageMaintainers.json'
import { createPinia, setActivePinia } from 'pinia'
import { EntityModelPackageMaintainerDto } from '@/openapi'
import { useUtilities } from '@/composable/utilities'

let wrapper: any
const { deepCopy } = useUtilities()
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
beforeAll(() => {
  global.ResizeObserver = ResizeObserver
  config.global.renderStubDefaultSlot = true
  setActivePinia(createPinia())
})

describe('Repository Maintainers - maintainers row (maintainer)', () => {
  const maintainer: EntityModelPackageMaintainerDto =
    deepCopy(maintainers.data.content[0])
  beforeEach(async () => {
    wrapper = mount(PackageMaintainersRow, {
      global: globalConfig,
      props: {
        title: false,
        packageMaintainer: maintainer
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('name field', () => {
    const field = wrapper.find('#package-maintainer-name')
    expect(field.text()).toBe(maintainer.user?.name)
  })

  it('package field', () => {
    const field = wrapper.find(
      '#package-maintainer-package'
    )
    expect(field.text()).toBe(maintainer.packageName)
  })

  it('repository field', () => {
    const field = wrapper.find(
      '#package-maintainer-repository'
    )
    expect(field.text()).toBe(maintainer.repository?.name)
  })

  it('delete button is visiable', () => {
    expect(wrapper.find('#delete-icon').isVisible()).toBe(
      true
    )
  })

  it('edit button is visible', () => {
    expect(wrapper.find('#pencil-icon').isVisible()).toBe(
      true
    )
  })
})

describe('Repository Maintainers - maintainers row (empty)', () => {
  beforeEach(async () => {
    wrapper = mount(PackageMaintainersRow, {
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
    const field = wrapper.find('#package-maintainer-name')
    expect(field.text()).toBe('')
  })

  it('package field', () => {
    const field = wrapper.find(
      '#package-maintainer-package'
    )
    expect(field.text()).toBe('')
  })

  it('repository field', () => {
    const field = wrapper.find(
      '#package-maintainer-repository'
    )
    expect(field.text()).toBe('')
  })

  it('delete button bnot exists', () => {
    expect(wrapper.find('#delete-icon').exists()).toBe(
      false
    )
  })

  it('edit button not exists', () => {
    expect(wrapper.find('#pencil-icon').exists()).toBe(
      false
    )
  })
})

describe('Repository Maintainers - maintainers row (title)', () => {
  beforeEach(async () => {
    wrapper = mount(PackageMaintainersRow, {
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
    const field = wrapper.find('#package-maintainer-name')
    expect(field.text()).toBe('Columns.name')
  })

  it('package title', () => {
    const field = wrapper.find(
      '#package-maintainer-package'
    )
    expect(field.text()).toBe('Columns.packageName')
  })

  it('technology title', () => {
    const field = wrapper.find(
      '#package-maintainer-technology'
    )
    expect(field.text()).toBe('Columns.technology')
  })

  it('repository title', () => {
    const field = wrapper.find(
      '#package-maintainer-repository'
    )
    expect(field.text()).toBe('Columns.repository')
  })

  it('actions title', () => {
    const field = wrapper.find(
      '#package-maintainer-actions'
    )
    expect(field.text()).toBe('Columns.actions')
  })

  it('delete button bnot exists', () => {
    expect(wrapper.find('#delete-icon').exists()).toBe(
      false
    )
  })

  it('edit button not exists', () => {
    expect(wrapper.find('#pencil-icon').exists()).toBe(
      false
    )
  })
})
