import { useSelectStore } from '@/store/select_pagination'
import { useSortStore } from '@/store/sort'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Select Pagination Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Starting values', () => {
    const select_pagination_store =
      useSelectStore('packages')
    expect(select_pagination_store.items).toEqual([])
    expect(select_pagination_store.pending).toEqual(false)
    expect(select_pagination_store.paginationData).toEqual({
      page: 0,
      totalNumber: -1
    })
  })

  it('Set pending', () => {
    const select_pagination_store =
      useSelectStore('packages')
    select_pagination_store.pending = true
    expect(select_pagination_store.pending).toEqual(true)
  })

  it('Add new items - display only unique values', () => {
    const select_pagination_store =
      useSelectStore('packages')
    select_pagination_store.addItems([
      'item1',
      'item2',
      'item3'
    ])
    select_pagination_store.addItems([
      'item4',
      'item2',
      'item3'
    ])
    expect(select_pagination_store.items).toEqual([
      'item1',
      'item2',
      'item3',
      'item4'
    ])
  })

  it('Reset items', () => {
    const select_pagination_store =
      useSelectStore('packages')
    select_pagination_store.addItems([
      'item1',
      'item2',
      'item3'
    ])
    expect(select_pagination_store.items).toEqual([
      'item1',
      'item2',
      'item3'
    ])
    select_pagination_store.resetItems()
    expect(select_pagination_store.items).toEqual([])
  })

  it('Set pagination data which should change the fetched status', () => {
    const select_pagination_store =
      useSelectStore('packages')
    select_pagination_store.paginationData = {
      page: 2,
      totalNumber: 3
    }
    select_pagination_store.addItems([
      'item1',
      'item2',
      'item3'
    ])
    expect(select_pagination_store.ifAllFetched).toEqual(
      true
    )
  })
})
