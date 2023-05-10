import { beforeEach, describe, it, expect } from 'vitest'

import PaginationVue from '@/components/common/Pagination.vue'
import { mount, flushPromises } from '@vue/test-utils'
import { ResizeObserver } from '@/__tests__/config/ResizeObserver'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { createPinia, setActivePinia } from 'pinia'
import { usePaginationStore } from '@/store/pagination'

let wrapper: any
let pagination_store: any
let numberOfPages: number
const pageButtonsSelector = 'li.v-pagination__item'
const currentPageSelector =
  'li.v-pagination__item--is-active'
const pageSizeSelector = 'input#page-size-input'
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeEach(async () => {
  setActivePinia(createPinia())
  global.ResizeObserver = ResizeObserver
  pagination_store = usePaginationStore()
  numberOfPages = 5
  pagination_store.totalNumber =
    pagination_store.pageSize * numberOfPages

  wrapper = mount(PaginationVue, {
    global: globalConfig
  })
})

describe('Pagination', () => {
  it('renders properly', () => {
    // Check pagination has nav
    expect(wrapper.find('nav').exists()).toBeTruthy()

    expect(wrapper.find('ul').exists()).toBeTruthy()

    expect(
      wrapper.findAll(pageButtonsSelector).length
    ).toBe(numberOfPages)
  })

  it('Multiple pages', async () => {
    expect(
      wrapper.findAll(pageButtonsSelector).length
    ).toBe(numberOfPages)
  })

  it('Next page', async () => {
    let currentPage = pagination_store.page

    expect(wrapper.find(currentPageSelector).text()).toBe(
      pageToString(currentPage)
    )

    await wrapper
      .find('button[arialabel="Next page"]')
      .trigger('click')

    currentPage += 1

    expect(wrapper.find(currentPageSelector).text()).toBe(
      pageToString(currentPage)
    )
  })

  it('Previous page', async () => {
    let currentPage = 2
    pagination_store.page = currentPage

    await flushPromises()

    expect(wrapper.find(currentPageSelector).text()).toBe(
      pageToString(currentPage)
    )

    await wrapper
      .find('button[arialabel="Previous page"]')
      .trigger('click')

    console.log(
      wrapper.find('button[arialabel="Goto Page 1"]')
    )

    currentPage -= 1
    expect(wrapper.find(currentPageSelector).text()).toBe(
      pageToString(currentPage)
    )
  })

  it('Select page 3', async () => {
    let currentPage = 0
    pagination_store.page = currentPage

    await flushPromises()

    expect(wrapper.find(currentPageSelector).text()).toBe(
      '1'
    )

    await wrapper
      .find('button[arialabel="Goto Page 3"]')
      .trigger('click')

    expect(wrapper.find(currentPageSelector).text()).toBe(
      '3'
    )

    expect(pagination_store.page).toBe(2)
  })

  it('Change page size by typing', async () => {
    expect(
      wrapper.find(pageSizeSelector).element.value
    ).toBe(pagination_store.pageSize.toString())

    const newPageSize = 5
    await wrapper
      .find(pageSizeSelector)
      .setValue(newPageSize.toString())

    await wrapper.find(pageSizeSelector).trigger('blur')

    expect(
      wrapper.find(pageSizeSelector).element.value
    ).toBe(newPageSize.toString())

    expect(
      wrapper.findAll(pageButtonsSelector).length
    ).toBe(
      Math.ceil(pagination_store.totalNumber / newPageSize)
    )
  })
})

function pageToString(page: number) {
  return (page + 1).toString()
}
