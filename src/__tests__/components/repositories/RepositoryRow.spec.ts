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
import RepositoryRowVue from '@/components/repositories/RepositoryRow.vue'
import repositories from '@/__tests__/config/mockData/repositories.json'
import { EntityModelRRepositoryDto } from '@/openapi'
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

describe('Repositories - repository row (repository)', () => {
  const repository: EntityModelRRepositoryDto = deepCopyAny(
    repositories.data.content[0]
  )
  beforeEach(async () => {
    wrapper = mount(RepositoryRowVue, {
      global: globalConfig,
      props: {
        title: false,
        repository: repository
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('name field', () => {
    const field = wrapper.find('#repository-name')
    expect(field.text()).toBe(repository.name)
  })

  it('publication uri field', () => {
    const field = wrapper.find(
      '#repository-publication-uri'
    )
    expect(field.text()).toBe(repository.publicationUri)
  })

  it('server address field', () => {
    const field = wrapper.find('#repository-server-address')
    expect(field.text()).toBe(repository.serverAddress)
  })

  it('version field', () => {
    const field = wrapper.find('#repository-version')
    expect(field.text()).toBe(
      repository.version?.toString()
    )
  })

  it('packages number field', () => {
    const field = wrapper.find('#repository-packages-no')
    expect(field.text()).toBe('none')
  })

  it('published field (checkbox)', () => {
    const field = wrapper.find('#checkbox-published')
    expect(field.element.checked).toEqual(
      repository.published
    )
  })

  it('click published field (checkbox)', async () => {
    const checkbox_published = wrapper.find(
      '#checkbox-published'
    )
    expect(checkbox_published.element.checked).toEqual(
      repository.published
    )
    await checkbox_published.trigger('click')
    expect(checkbox_published.element.checked).toEqual(
      !repository.published
    )
  })

  it('navigate button is visiable', () => {
    expect(wrapper.find('#navigate-icon').isVisible()).toBe(
      true
    )
  })

  it('delete button is visible', () => {
    expect(wrapper.find('#delete-icon').isVisible()).toBe(
      true
    )
  })
})

describe('Repositories - repository row (empty repository)', () => {
  beforeEach(async () => {
    wrapper = mount(RepositoryRowVue, {
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
    const field = wrapper.find('#repository-name')
    expect(field.text()).toBe('')
  })

  it('publication uri field', () => {
    const field = wrapper.find(
      '#repository-publication-uri'
    )
    expect(field.text()).toBe('')
  })

  it('server address field', () => {
    const field = wrapper.find('#repository-server-address')
    expect(field.text()).toBe('')
  })

  it('repository version is correctly displayed', () => {
    const field = wrapper.find('#repository-version')
    expect(field.text()).toBe('')
  })

  it('packages number field', () => {
    const field = wrapper.find('#repository-packages-no')
    expect(field.text()).toBe('none')
  })

  it('published field (checkbox)', () => {
    const checkbox_active = wrapper.find(
      '#checkbox-published'
    )
    expect(checkbox_active.exists()).toEqual(false)
  })

  it('navigate button is visible', () => {
    expect(wrapper.find('#navigate-icon').exists()).toBe(
      false
    )
  })

  it('delete button is visible', () => {
    expect(wrapper.find('#delete-icon').exists()).toBe(
      false
    )
  })
})

describe('Repositories - repository row (title)', () => {
  beforeEach(async () => {
    wrapper = mount(RepositoryRowVue, {
      global: globalConfig,
      props: {
        title: true
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('name field', () => {
    const field = wrapper.find('#repository-name')
    expect(field.text()).toBe('Columns.name')
  })

  it('publication uri title', () => {
    const field = wrapper.find(
      '#repository-publication-uri'
    )
    expect(field.text()).toBe('Columns.publicationUri')
  })

  it('server address title', () => {
    const field = wrapper.find('#repository-server-address')
    expect(field.text()).toBe('Columns.serverAddress')
  })

  it('version title', () => {
    const field = wrapper.find('#repository-version')
    expect(field.text()).toBe('Columns.version')
  })

  it('technology title', () => {
    const field = wrapper.find('#repository-technology')
    expect(field.text()).toBe('Columns.technology')
  })

  it('packages number title', () => {
    const field = wrapper.find('#repository-packages-no')
    expect(field.text()).toBe('Columns.packagesNo')
  })

  it('published title', () => {
    const field = wrapper.find('#repository-published')
    const checkbox = wrapper.find('#checkbox-published')
    expect(field.text()).toEqual('Columns.published')
    expect(checkbox.exists()).toEqual(false)
  })

  it('navigate button not exists', () => {
    expect(wrapper.find('#navigate-icon').exists()).toBe(
      false
    )
  })

  it('delete button not exists', () => {
    expect(wrapper.find('#delete-icon').exists()).toBe(
      false
    )
  })
})
