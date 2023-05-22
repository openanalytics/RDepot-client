/*
 *  R Depot
 *
 *  Copyright (C) 2012-2023 Open Analytics NV
 *
 *  ===========================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the Apache License as published by
 *  The Apache Software Foundation, either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  Apache License for more details.
 *
 *  You should have received a copy of the Apache License
 *  along with this program. If not, see <http://www.apache.org/licenses/>
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
import RepositoryMaintainerVue from '@/components/repositoryMaintainers/RepositoryMaintainerRow.vue'
import maintainers from '@/__tests__/config/mockData/repositoryMaintainers.json'
import { EntityModelRepositoryMaintainerDto } from '@/openapi'
import { createPinia, setActivePinia } from 'pinia'
import { useUtilities } from '@/composable/utilities'

let wrapper: any
const { deepCopyAny } = useUtilities()
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
  const maintainer: EntityModelRepositoryMaintainerDto =
    deepCopyAny(maintainers.data.content[0])
  beforeEach(async () => {
    wrapper = mount(RepositoryMaintainerVue, {
      global: globalConfig,
      props: {
        title: false,
        repositoryMaintainer: maintainer
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('name field', () => {
    const field = wrapper.find(
      '#repository-maintainer-name'
    )
    expect(field.text()).toBe(maintainer.user?.name)
  })

  it('repository field', () => {
    const field = wrapper.find(
      '#repository-maintainer-repository'
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
    wrapper = mount(RepositoryMaintainerVue, {
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
    const field = wrapper.find(
      '#repository-maintainer-name'
    )
    expect(field.text()).toBe('')
  })

  it('repository field', () => {
    const field = wrapper.find(
      '#repository-maintainer-repository'
    )
    expect(field.text()).toBe('')
  })

  it('delete button not exists', () => {
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
    wrapper = mount(RepositoryMaintainerVue, {
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
    const field = wrapper.find(
      '#repository-maintainer-name'
    )
    expect(field.text()).toBe('Columns.name')
  })

  it('repository field', () => {
    const field = wrapper.find(
      '#repository-maintainer-repository'
    )
    expect(field.text()).toBe('Columns.repository')
  })

  it('technology field', () => {
    const field = wrapper.find(
      '#repository-maintainer-technology'
    )
    expect(field.text()).toBe('Columns.technology')
  })

  it('actions field', () => {
    const field = wrapper.find(
      '#repository-maintainer-actions'
    )
    expect(field.text()).toBe('Columns.actions')
  })

  it('delete button not exists', () => {
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
