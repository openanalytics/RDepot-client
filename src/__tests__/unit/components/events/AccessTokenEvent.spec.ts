/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
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
import { useAuthorizationStore } from '@/store/options/authorization'
import me from '@/__tests__/config/mockData/me.json'
import events from '@/__tests__/config/mockData/events.json'
import AccessTokenEvent from '@/components/events/resources/AccessTokenEvent.vue'
import {
  EntityModelAccessTokenDto,
  EntityModelNewsfeedEventDto
} from '@/openapi'
import { useDates } from '@/composable/date'
import { i18n } from '@/plugins/i18n'
import UpdateDescription from '@/components/events/resources/UpdateDescription.vue'

const { formatDate } = useDates()
let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let authorizationStore: any
let event: EntityModelNewsfeedEventDto = events.data
  .content[1] as EntityModelNewsfeedEventDto
let chips: any
let relatedResource: EntityModelAccessTokenDto =
  event.relatedResource as EntityModelAccessTokenDto

describe('Events - Access Token (active, !deleted)', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    authorizationStore = useAuthorizationStore()
    authorizationStore.me = me.data
    wrapper = mount(AccessTokenEvent, {
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
    expect(chips.length).toEqual(8)
  })

  it('display token name', () => {
    expect(wrapper.text()).toContain(relatedResource.name)
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
      i18n.t('resourceType.accessToken').toUpperCase()
    )
  })

  it('display active tag', () => {
    expect(chips[2].exists()).toBeTruthy()
    expect(chips[2].text()).toBe(
      i18n.t('columns.tokens.active')
    )
  })

  it('display token creation date', () => {
    expect(chips[3].exists()).toBeTruthy()
    expect(chips[3].text()).toBe(
      formatDate(
        new Date(
          relatedResource.creationDate || '2025-01-19'
        )
      )
    )
  })

  it('display token expiration date', () => {
    expect(chips[4].exists()).toBeTruthy()
    expect(chips[4].text()).toBe(
      formatDate(
        new Date(
          relatedResource.expirationDate || '2124-12-31'
        )
      )
    )
  })

  it('display token owner username', () => {
    expect(chips[5].exists()).toBeTruthy()
    expect(chips[5].text()).toBe(relatedResource.user?.name)
  })

  it('display token owner name', () => {
    expect(chips[6].exists()).toBeTruthy()
    expect(chips[6].text()).toBe(
      relatedResource.user?.login
    )
  })

  it('display token owner email', () => {
    expect(chips[7].exists()).toBeTruthy()
    expect(chips[7].text()).toBe(
      relatedResource.user?.email
    )
  })

  it('!display changes', () => {
    expect(
      wrapper.findComponent(UpdateDescription).exists()
    ).toBeFalsy()
  })
})

describe('Events - Access Token (!active, !deleted)', () => {
  beforeAll(() => {
    event = events.data
      .content[5] as EntityModelNewsfeedEventDto
    relatedResource =
      event.relatedResource as EntityModelAccessTokenDto
  })

  beforeEach(async () => {
    setActivePinia(createPinia())
    authorizationStore = useAuthorizationStore()
    authorizationStore.me = me.data
    wrapper = mount(AccessTokenEvent, {
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

  it('!display active tag', () => {
    expect(chips[2].exists()).toBeTruthy()
    expect(chips[2].text()).not.toBe(
      i18n.t('columns.tokens.active')
    )
  })

  it('display changes', () => {
    expect(
      wrapper.findComponent(UpdateDescription).exists()
    ).toBeTruthy()
  })
})

describe('Events - Access Token (active, deleted)', () => {
  beforeAll(() => {
    event = events.data
      .content[2] as EntityModelNewsfeedEventDto
    relatedResource =
      event.relatedResource as EntityModelAccessTokenDto
  })

  beforeEach(async () => {
    setActivePinia(createPinia())
    authorizationStore = useAuthorizationStore()
    authorizationStore.me = me.data
    wrapper = mount(AccessTokenEvent, {
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
    expect(chips.length).toEqual(9)
  })

  it('!display active tag', () => {
    expect(chips[2].exists()).toBeTruthy()
    expect(chips[2].text()).toBe(
      i18n.t('columns.tokens.deleted')
    )
  })

  it('!display active tag', () => {
    expect(chips[3].exists()).toBeTruthy()
    expect(chips[3].text()).toBe(
      i18n.t('columns.tokens.active')
    )
  })
})
