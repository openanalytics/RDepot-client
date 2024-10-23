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

import { createPinia, setActivePinia } from 'pinia'
import { beforeAll, describe, expect, it } from 'vitest'
import events from '@/__tests__/config/mockData/events.json'
import { useAuthorizationStore } from '@/store/options/authorization'
import { server } from '@/__tests__/config/backend/server'
import { useNotificationStore } from '@/store/options/notifications'
import { EntityModelNewsfeedEventDto } from '@/openapi'

describe('Notifications Store', () => {
  beforeAll(async () => {
    server.listen()
    setActivePinia(createPinia())
    server.resetHandlers()
    const authorizationStore = useAuthorizationStore()
    await authorizationStore.getUserInfo()
    authorizationStore.me.lastLoggedInOn =
      '2024-01-18T13:42:34.341632'
  })

  afterAll(() => {
    server.close()
  })

  it('Starting values', () => {
    const notificationStore = useNotificationStore()
    expect(notificationStore.events).toStrictEqual([])
    expect(
      notificationStore.alreadySeenEvents
    ).toStrictEqual([])
  })

  it('Fetch notifications', async () => {
    const notificationStore = useNotificationStore()
    await notificationStore.getEventsNotifications()
    expect(notificationStore.events).toEqual(
      events.data.content
    )
    expect(notificationStore.newEvents.length).toEqual(4)
    expect(notificationStore.oldEvents.length).toEqual(26)
  })

  it('Read new notifications', async () => {
    const notificationStore = useNotificationStore()
    await notificationStore.getEventsNotifications()
    expect(notificationStore.events).toEqual(
      events.data.content
    )
    notificationStore.alreadySeenEvents =
      events.data.content.slice(
        0,
        5
      ) as EntityModelNewsfeedEventDto[]
    expect(notificationStore.newEvents.length).toEqual(0)
    expect(notificationStore.oldEvents.length).toEqual(30)
  })
})
