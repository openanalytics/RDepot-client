import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import SortTitle from '@/components/common/resources/SortTitle.vue'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { createPinia, setActivePinia } from 'pinia'
import { useCommonStore } from '@/store/common'
import { useSortStore } from '@/store/sort'

let wrapper: any
const TEXT: string = 'name'
const TEXT_MODIFIED: string = 'Name'

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
    const common_store = useCommonStore()
    common_store.activeId = 'name'
    const sortButton = wrapper.find('#name')
    expect(sortButton.classes()).not.toContain('opacity')
    expect(sortButton.classes()).toContain('text-oablue')
  })
  it('asc sort icon change to desc sort icon after click', async () => {
    const common_store = useCommonStore()
    common_store.activeId = 'name'
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
    const common_store = useCommonStore()
    await common_store.setActiveId('name_sth')
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
    const common_store = useCommonStore()
    common_store.activeId = 'user'
    const sortButton = wrapper.find('#name')
    expect(wrapper.vm.getIcon).toEqual('mdi-sort')
  })

  it('sort icon is become active after click', async () => {
    const common_store = useCommonStore()
    common_store.activeId = 'user'
    const sort_store = useSortStore()
    sort_store.field = 'user'
    const sortButton = wrapper.find('#name')
    expect(common_store.activeId).toEqual('user')
    expect(sort_store.direction).toEqual('asc')
    expect(sort_store.field).toEqual('user')
    await sortButton.trigger('click')
    expect(sort_store.direction).toEqual('asc')
    expect(common_store.activeId).toEqual('name')
    expect(sort_store.field).toEqual('name')
    expect(wrapper.vm.getIcon).toEqual('mdi-sort-ascending')
  })
})
