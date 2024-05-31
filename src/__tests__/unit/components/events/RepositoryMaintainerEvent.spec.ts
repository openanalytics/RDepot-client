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

import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll
} from 'vitest'

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { ResizeObserver } from '@/__tests__/config/ResizeObserver'
import { createPinia, setActivePinia } from 'pinia'
import { useMeStore } from '@/store/me'
import me from '@/__tests__/config/mockData/me.json'
import events from '@/__tests__/config/mockData/events.json'
import {
  EntityModelNewsfeedEventDto,
  EntityModelRepositoryMaintainerDto
} from '@/openapi'
import { useDates } from '@/composable/date'
import { i18n } from '@/plugins/i18n'
import UpdateDescription from '@/components/events/resources/UpdateDescription.vue'
import RepositoryMaintainerEvent from '@/components/events/resources/RepositoryMaintainerEvent.vue'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let meStore: any
const event: EntityModelNewsfeedEventDto = events.data
  .content[20] as EntityModelNewsfeedEventDto
let chips: any
const relatedResource: EntityModelRepositoryMaintainerDto =
  event.relatedResource as EntityModelRepositoryMaintainerDto

beforeAll(() => {
  global.ResizeObserver = ResizeObserver
})

describe('Events - Repository Maintainer', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    meStore = useMeStore()
    meStore.me = me.data
    wrapper = mount(RepositoryMaintainerEvent, {
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
    expect(chips.length).toEqual(5)
  })

  it('display user name', () => {
    expect(wrapper.text()).toContain(
      `${relatedResource.user?.name} (${relatedResource.user?.login})`
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
      i18n
        .t('resourceType.repositoryMaintainer')
        .toUpperCase()
    )
  })

  it('display repo name', () => {
    expect(chips[2].exists()).toBeTruthy()
    expect(chips[2].text()).toBe(
      relatedResource.repository?.name
    )
  })

  it('display publication uri', () => {
    expect(chips[3].exists()).toBeTruthy()
    expect(chips[3].text()).toBe(
      relatedResource.repository?.publicationUri
    )
  })

  it('display email', () => {
    expect(chips[4].exists()).toBeTruthy()
    expect(chips[4].text()).toBe(
      relatedResource.user?.email
    )
  })

  it('!display changes', () => {
    expect(
      wrapper.findComponent(UpdateDescription).exists()
    ).toBeFalsy()
  })
})
