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

import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthorizationStore } from '@/store/authorization'
import me from '@/__tests__/config/mockData/me.json'
import events from '@/__tests__/config/mockData/events.json'
import {
  EntityModelNewsfeedEventDto,
  EntityModelUserDto
} from '@/openapi'
import { useDates } from '@/composable/date'
import { i18n } from '@/plugins/i18n'
import UpdateDescription from '@/components/events/resources/UpdateDescription.vue'
import UserEvent from '@/components/events/resources/UserEvent.vue'

const { formatDate } = useDates()
let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let authorizationStore: any
const event: EntityModelNewsfeedEventDto = events.data
  .content[29] as EntityModelNewsfeedEventDto
let chips: any
const relatedResource: EntityModelUserDto =
  event.relatedResource as EntityModelUserDto

describe('Events - User', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    authorizationStore = useAuthorizationStore()
    authorizationStore.me = me.data
    wrapper = mount(UserEvent, {
      props: {
        event: event
      },
      global: globalConfig
    })
    chips = wrapper.findAll('#eventTag')
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('correct no of chips', () => {
    expect(chips.length).toEqual(7)
  })

  it('display user name', () => {
    expect(wrapper.text()).toContain(
      `${relatedResource.name} (${relatedResource.login})`
    )
  })

  it('display event creation date', () => {
    const { getTime } = useDates()
    expect(chips[0].exists()).toBeTruthy()
    expect(chips[0].text()).toBe(getTime(event))
  })

  it('display event type', () => {
    expect(chips[1].exists()).toBeTruthy()
    expect(chips[1].text()).toBe(event.eventType)
  })

  it('display resource type', () => {
    expect(wrapper.text()).toContain(
      i18n.t('resourceType.user').toUpperCase()
    )
  })

  it('display active tag', () => {
    expect(chips[2].exists()).toBeTruthy()
    expect(chips[2].text()).toBe(
      i18n.t('columns.tokens.active')
    )
  })

  it('display role', () => {
    expect(chips[3].exists()).toBeTruthy()
    expect(chips[3].text()).toBe(relatedResource.role)
  })

  it('display email', () => {
    expect(chips[4].exists()).toBeTruthy()
    expect(chips[4].text()).toBe(relatedResource.email)
  })

  it('display last logged in date', () => {
    expect(chips[5].exists()).toBeTruthy()
    expect(chips[5].text()).toBe(
      formatDate(new Date(relatedResource.lastLoggedInOn))
    )
  })

  it('display user creation date', () => {
    expect(chips[6].exists()).toBeTruthy()
    expect(chips[6].text()).toBe(
      formatDate(new Date(relatedResource.createdOn))
    )
  })

  it('display changes', () => {
    expect(
      wrapper.findComponent(UpdateDescription).exists()
    ).toBeTruthy()
  })
})
