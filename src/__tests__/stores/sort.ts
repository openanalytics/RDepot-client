import { useSortStore } from '@/store/sort'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Sort Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Starting values', () => {
    const sort_store = useSortStore()
    expect(sort_store.field).toEqual('name')
    expect(sort_store.direction).toEqual('asc')
  })

  it('Set new field', () => {
    const sort_store = useSortStore()
    sort_store.setField('user')
    expect(sort_store.field).toEqual('user')
    expect(sort_store.direction).toEqual('asc')
  })

  it('Set the same field', () => {
    const sort_store = useSortStore()
    sort_store.setField('name')
    expect(sort_store.field).toEqual('name')
    expect(sort_store.direction).toEqual('desc')
  })

  it('Reset store', () => {
    const sort_store = useSortStore()
    expect(sort_store.field).toEqual('name')
    expect(sort_store.direction).toEqual('asc')
  })
})
