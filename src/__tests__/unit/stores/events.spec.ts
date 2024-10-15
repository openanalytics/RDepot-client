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

import { useEventsStore } from '@/store/options/events'
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
import events from '@/__tests__/config/mockData/events.json'
import { Technologies } from '@/enum/Technologies'
import { EventsFiltration } from '@/models/Filtration'
import { useAuthorizationStore } from '@/store/options/authorization'
import { server } from '@/__tests__/config/backend/server'

const defaultFiltration = {
  eventType: undefined,
  resourceType: undefined,
  technologies: undefined,
  userName: undefined,
  packageName: undefined,
  repositoryName: undefined,
  fromDate: undefined,
  toDate: undefined
}

const randomFiltration = {
  eventType: ['update'],
  userName: 'tesla',
  packageName: undefined,
  repositoryName: undefined,
  technologies: [Technologies.enum.Python],
  resourceType: ['submission'],
  fromDate: '2019-05-03',
  toDate: '2022-09-20'
}

describe('Event Store', () => {
  beforeAll(() => {
    server.listen()
  })

  beforeEach(async () => {
    setActivePinia(createPinia())
    server.resetHandlers()
    const authorizationStore = useAuthorizationStore()
    await authorizationStore.getUserInfo()
  })

  afterAll(() => {
    server.close()
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
    const spy = vi.spyOn(eventsStore, 'get')
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
    const spy = vi.spyOn(eventsStore, 'get')
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

    await eventsStore.get()

    expect(eventsStore.events).toStrictEqual(
      events.data.content
    )
  })

  it('Fetch next page with undefined next and page 0', async () => {
    const eventsStore = useEventsStore()
    const spy = vi.spyOn(eventsStore, 'get')

    expect(eventsStore.next).toBe(undefined)
    expect(eventsStore.page).toBe(0)

    await eventsStore.getPage()

    expect(eventsStore.next).toBe(undefined)
    expect(eventsStore.page).toBe(0)
    expect(spy).toBeCalledTimes(0)
  })

  it('Fetch next page with non-undefined next and page 0', async () => {
    const eventsStore = useEventsStore()
    const spy = vi.spyOn(eventsStore, 'get')

    await eventsStore.get()

    expect(eventsStore.next).toBeTruthy()
    expect(eventsStore.page).toBe(events.data.page.number)
    expect(eventsStore.events).toStrictEqual(
      events.data.content
    )
    expect(spy).toBeCalledTimes(1)

    await eventsStore.getPage()

    expect(eventsStore.next).toBeTruthy()
    expect(eventsStore.page).toBe(events.data.page.number)
    expect(eventsStore.events).toStrictEqual([
      ...events.data.content,
      ...events.data.content
    ])
    expect(spy).toBeCalledTimes(2)
  })
})
