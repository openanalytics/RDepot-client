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

import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import SortTitle from '@/components/common/resources/SortTitle.vue'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { createPinia, setActivePinia } from 'pinia'
import { useCommonStore } from '@/store/common'
import { useSortStore } from '@/store/sort'

let wrapper: any
const TEXT = 'name'
const TEXT_MODIFIED = 'Name'

const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

describe('SortTitle - default options', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    wrapper = mount(SortTitle, {
      global: globalConfig,
      props: { text: TEXT }
    })
  })

  it('renders properly', () => {
    expect(wrapper.text()).toContain(TEXT_MODIFIED)
    const titleRow = wrapper.find('#title-row')
    const sortButton = wrapper.find('#name')
    expect(titleRow.classes()).toContain('justify-start')
    expect(sortButton.exists()).toBeTruthy()
    expect(sortButton.classes()).not.toContain('opacity')
    expect(sortButton.classes()).not.toContain('oablue')
  })
  it('is highlighten if the sort option is active', () => {
    const commonStore = useCommonStore()
    commonStore.activeId = 'name'
    const sortButton = wrapper.find('#name')
    expect(sortButton.classes()).not.toContain('opacity')
    expect(sortButton.classes()).toContain('text-oablue')
  })
  it('asc sort icon change to desc sort icon after click', async () => {
    const commonStore = useCommonStore()
    commonStore.activeId = 'name'
    const sortButton = wrapper.find('#name')
    expect(wrapper.vm.getIcon).toEqual('mdi-sort-ascending')
    await sortButton.trigger('click')
    expect(wrapper.vm.getIcon).toEqual(
      'mdi-sort-descending'
    )
  })
})

describe('SortTitle - custom options', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    wrapper = mount(SortTitle, {
      global: globalConfig,
      props: {
        text: TEXT,
        center: true,
        sortField: 'user'
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.text()).toContain(TEXT_MODIFIED)
    const sortButton = wrapper.find('#name')
    const titleRow = wrapper.find('#title-row')
    expect(titleRow.classes()).toContain('justify-center')
    expect(sortButton.exists()).toBeTruthy()
    expect(sortButton.classes()).not.toContain('opacity')
    expect(sortButton.classes()).not.toContain('oablue')
  })
  it('is transparent on hover if the sort option is not active', async () => {
    const commonStore = useCommonStore()
    await commonStore.setActiveId('name_sth')
    const sortButton = wrapper.find('#name')
    expect(sortButton.classes()).toContain('opacity')
    expect(sortButton.classes()).not.toContain(
      'text-oablue'
    )
  })
})

describe('SortTitle - no sort option', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    wrapper = mount(SortTitle, {
      global: globalConfig,
      props: {
        text: TEXT,
        noSort: true
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.text()).toContain(TEXT_MODIFIED)
    const sortButton = wrapper.find('#name')
    const titleRow = wrapper.find('#title-row')
    expect(titleRow.classes()).toContain('justify-start')
    expect(sortButton.exists()).toBeFalsy()
  })
})

describe('SortTitle - nonactive field', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    wrapper = mount(SortTitle, {
      global: globalConfig,
      props: {
        text: TEXT
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.text()).toContain(TEXT_MODIFIED)
    const sortButton = wrapper.find('#name')
    const titleRow = wrapper.find('#title-row')
    expect(titleRow.classes()).toContain('justify-start')
    expect(sortButton.exists()).toBeTruthy()
  })

  it('sort icon is gray and non active', async () => {
    const commonStore = useCommonStore()
    commonStore.activeId = 'user'
    expect(wrapper.vm.getIcon).toEqual('mdi-sort')
  })

  it('sort icon is become active after click', async () => {
    const commonStore = useCommonStore()
    commonStore.activeId = 'user'
    const sortStore = useSortStore()
    sortStore.field = 'user'
    const sortButton = wrapper.find('#name')
    expect(commonStore.activeId).toEqual('user')
    expect(sortStore.direction).toEqual('asc')
    expect(sortStore.field).toEqual('user')
    await sortButton.trigger('click')
    expect(sortStore.direction).toEqual('asc')
    expect(commonStore.activeId).toEqual('name')
    expect(sortStore.field).toEqual('name')
    expect(wrapper.vm.getIcon).toEqual('mdi-sort-ascending')
  })
})
