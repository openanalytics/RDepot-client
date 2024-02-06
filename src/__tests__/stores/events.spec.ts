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

import { useEventsStore } from '@/store/events'
import { createPinia, setActivePinia } from 'pinia'
import {
  beforeAll,
  beforeEach,
  afterAll,
  describe,
  expect,
  it,
  vi
} from 'vitest'
import { setupServer } from 'msw/node'
import events from '@/__tests__/config/mockData/events.json'
import { Technologies } from '@/enum/Technologies'
import { EventsFiltration } from '@/models/Filtration'
import { http, HttpResponse } from 'msw'

const defaultFiltration = {
  eventType: undefined,
  resourceType: undefined,
  technologies: undefined,
  userName: undefined,
  fromDate: undefined,
  toDate: undefined
}

const randomFiltration = {
  eventType: ['update'],
  userName: 'tesla',
  technologies: [Technologies.enum.Python],
  resourceType: ['submission'],
  fromDate: '2019-05-03',
  toDate: '2022-09-20'
}
const server = setupServer(
  http.get(
    'http://localhost:8017/api/v2/manager/events',
    () => {
      return HttpResponse.json(events)
    }
  )
)

describe('Event Store', () => {
  beforeAll(() => {
    server.listen()
  })

  beforeEach(() => {
    setActivePinia(createPinia())
    server.resetHandlers()
  })

  afterAll(() => {
    server.close
  })

  it('Starting values', () => {
    const eventsStore = useEventsStore()
    expect(eventsStore.page).toBe(0)
    expect(eventsStore.pageSize).toBe(10)
    expect(eventsStore.totalNumber).toBe(0)
    expect(eventsStore.events).toStrictEqual([])
    expect(eventsStore.filtration).toStrictEqual(
      defaultFiltration
    )
    expect(eventsStore.pending).toBe(false)
    expect(eventsStore.next).toBe(undefined)
  })

  it('Edit filtration', () => {
    const eventsStore = useEventsStore()
    const spy = vi.spyOn(eventsStore, 'fetchEvents')
    const filtration = randomFiltration

    expect(spy).toHaveBeenCalledTimes(0)

    eventsStore.setFiltration(
      EventsFiltration.parse(filtration)
    )

    expect(eventsStore.filtration).toStrictEqual(filtration)
    expect(eventsStore.page).toBe(0)
    expect(eventsStore.events).toStrictEqual([])
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Clear filtration', () => {
    const eventsStore = useEventsStore()
    eventsStore.filtration = randomFiltration

    eventsStore.clearFiltration()

    expect(eventsStore.filtration).toStrictEqual(
      defaultFiltration
    )
    expect(eventsStore.page).toBe(0)
    expect(eventsStore.events).toStrictEqual([])
  })

  it('Clear filtration and fetch events', () => {
    const eventsStore = useEventsStore()
    const spy = vi.spyOn(eventsStore, 'fetchEvents')
    eventsStore.filtration = randomFiltration

    expect(spy).toHaveBeenCalledTimes(0)

    eventsStore.clearFiltrationAndFetch()

    expect(eventsStore.filtration).toStrictEqual(
      defaultFiltration
    )
    expect(eventsStore.page).toBe(0)
    expect(eventsStore.events).toStrictEqual([])
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Fetch events', async () => {
    const eventsStore = useEventsStore()

    await eventsStore.fetchEvents()

    expect(eventsStore.events).toStrictEqual(
      events.data.content
    )
  })

  it('Fetch next page with undefined next and page 0', async () => {
    const eventsStore = useEventsStore()
    const spy = vi.spyOn(eventsStore, 'fetchEvents')

    expect(eventsStore.next).toBe(undefined)
    expect(eventsStore.page).toBe(0)

    await eventsStore.fetchNextPageEvents()

    expect(eventsStore.next).toBe(undefined)
    expect(eventsStore.page).toBe(0)
    expect(spy).toBeCalledTimes(0)
  })

  it('Fetch next page with non-undefined next and page 0', async () => {
    const eventsStore = useEventsStore()
    const spy = vi.spyOn(eventsStore, 'fetchEvents')

    await eventsStore.fetchEvents()

    expect(eventsStore.next).toBeTruthy()
    expect(eventsStore.page).toBe(events.data.page.number)
    expect(eventsStore.events).toStrictEqual(
      events.data.content
    )
    expect(spy).toBeCalledTimes(1)

    await eventsStore.fetchNextPageEvents()

    expect(eventsStore.next).toBeTruthy()
    expect(eventsStore.page).toBe(events.data.page.number)
    expect(eventsStore.events).toStrictEqual([
      ...events.data.content,
      ...events.data.content
    ])
    expect(spy).toBeCalledTimes(2)
  })
})
