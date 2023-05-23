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
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import events from '@/__tests__/config/mockData/events.json'
import { Technologies } from '@/enum/Technologies'
import { EventsFiltration } from '@/models/Filtration'

const defaultFiltration = {
  eventType: undefined,
  resourceId: undefined,
  resourceType: undefined,
  technologies: undefined,
  userId: undefined
}

const randomFiltration = {
  eventType: 'some event type',
  resourceId: 4,
  resourceType: 'four',
  technologies: [Technologies.enum.R],
  userId: 44
}

const server = setupServer(
  rest.get(
    'http://localhost:8017/api/v2/manager/events',
    (_, res, ctx) => {
      return res(ctx.json(events))
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

  it('Edit filtration', () => {
    const events_store = useEventsStore()
    const spy = vi.spyOn(events_store, 'fetchEvents')
    const filtration = randomFiltration

    expect(spy).toHaveBeenCalledTimes(0)

    events_store.setFiltration(
      EventsFiltration.parse(filtration)
    )

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

  it('Fetch events', async () => {
    const events_store = useEventsStore()

    await events_store.fetchEvents()

    expect(events_store.events).toStrictEqual(
      events.data.content
    )
  })

  it('Fetch next page with undefined next and page 0', async () => {
    const events_store = useEventsStore()
    const spy = vi.spyOn(events_store, 'fetchEvents')

    expect(events_store.next).toBe(undefined)
    expect(events_store.page).toBe(0)

    await events_store.fetchNextPageEvents()

    expect(events_store.next).toBe(undefined)
    expect(events_store.page).toBe(0)
    expect(spy).toBeCalledTimes(0)
  })

  it('Fetch next page with non-undefined next and page 0', async () => {
    const events_store = useEventsStore()
    const spy = vi.spyOn(events_store, 'fetchEvents')

    await events_store.fetchEvents()

    expect(events_store.next).toBeTruthy()
    expect(events_store.page).toBe(events.data.page.number)
    expect(events_store.events).toStrictEqual(
      events.data.content
    )
    expect(spy).toBeCalledTimes(1)

    await events_store.fetchNextPageEvents()

    expect(events_store.next).toBeTruthy()
    expect(events_store.page).toBe(events.data.page.number)
    expect(events_store.events).toStrictEqual([
      ...events.data.content,
      ...events.data.content
    ])
    expect(spy).toBeCalledTimes(2)
  })
})
