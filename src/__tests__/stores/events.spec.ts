import { useEventsStore } from '@/store/events'
import { createPinia, setActivePinia } from 'pinia'
import {
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'

const defaultFiltration = {
  eventType: undefined,
  resourceId: undefined,
  resourceType: undefined,
  technology: undefined,
  userId: undefined
}

const randomFiltration = {
  eventType: 'some event type',
  resourceId: 4,
  resourceType: 'four',
  technology: 'R',
  userId: 44
}

describe('Event Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Starting values', () => {
    const events_store = useEventsStore()
    expect(events_store.page).toBe(0)
    expect(events_store.pageSize).toBe(10)
    expect(events_store.totalNumber).toBe(0)
    expect(events_store.events).toStrictEqual([])
    expect(events_store.filtration).toStrictEqual(
      defaultFiltration
    )
    expect(events_store.pending).toBe(false)
    expect(events_store.next).toBe(undefined)
  })

  it('Edit page', () => {
    const events_store = useEventsStore()
    events_store.setPage(1)
    expect(events_store.page).toBe(1)
  })

  it('Edit filtration', () => {
    const events_store = useEventsStore()
    const spy = vi.spyOn(events_store, 'fetchEvents')
    const filtration = randomFiltration

    expect(spy).toHaveBeenCalledTimes(0)

    events_store.setFiltration(filtration)

    expect(events_store.filtration).toStrictEqual(
      filtration
    )
    expect(events_store.page).toBe(0)
    expect(events_store.events).toStrictEqual([])
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Clear filtration', () => {
    const events_store = useEventsStore()
    events_store.filtration = randomFiltration

    events_store.clearFiltration()

    expect(events_store.filtration).toStrictEqual(
      defaultFiltration
    )
    expect(events_store.page).toBe(0)
    expect(events_store.events).toStrictEqual([])
  })

  it('Clear filtration and fetch events', () => {
    const events_store = useEventsStore()
    const spy = vi.spyOn(events_store, 'fetchEvents')
    events_store.filtration = randomFiltration

    expect(spy).toHaveBeenCalledTimes(0)

    events_store.clearFiltrationAndFetch()

    expect(events_store.filtration).toStrictEqual(
      defaultFiltration
    )
    expect(events_store.page).toBe(0)
    expect(events_store.events).toStrictEqual([])
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
