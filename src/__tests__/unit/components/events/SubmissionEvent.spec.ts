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
import {
  EntityModelNewsfeedEventDto,
  EntityModelSubmissionDto
} from '@/openapi'
import { useDates } from '@/composable/date'
import { i18n } from '@/plugins/i18n'
import UpdateDescription from '@/components/events/resources/UpdateDescription.vue'
import SubmissionEvent from '@/components/events/resources/SubmissionEvent.vue'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let authorizationStore: any
const event: EntityModelNewsfeedEventDto = events.data
  .content[10] as EntityModelNewsfeedEventDto
let chips: any
const relatedResource: EntityModelSubmissionDto =
  event.relatedResource as EntityModelSubmissionDto

describe('Events - Package', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    authorizationStore = useAuthorizationStore()
    authorizationStore.me = me.data
    wrapper = mount(SubmissionEvent, {
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
    expect(chips.length).toEqual(10)
  })

  it('display package name', () => {
    expect(wrapper.text()).toContain(
      relatedResource.packageBag?.name
    )
  })

  it('display package version', () => {
    expect(chips[0].exists()).toBeTruthy()
    expect(chips[0].text()).toBe(
      `v ${relatedResource.packageBag?.version}`
    )
  })

  it('display related technology', () => {
    expect(chips[1].exists()).toBeTruthy()
    expect(chips[1].text()).toBe(relatedResource.technology)
  })

  it('display event creation date', () => {
    const { getTime } = useDates()
    expect(chips[2].exists()).toBeTruthy()
    expect(chips[2].text()).toBe(getTime(event))
  })

  it('display event type', () => {
    expect(chips[3].exists()).toBeTruthy()
    expect(chips[3].text()).toBe(event.eventType)
  })

  it('display resource type', () => {
    expect(wrapper.text()).toContain(
      i18n.t('resourceType.submission').toUpperCase()
    )
  })

  it('display submission state', () => {
    expect(chips[4].exists()).toBeTruthy()
    expect(chips[4].text()).toBe(relatedResource.state)
  })

  it('display maintainer', () => {
    expect(chips[5].exists()).toBeTruthy()
    expect(chips[5].text()).toBe(
      relatedResource?.packageBag?.user?.login
    )
  })

  it('display repo name', () => {
    expect(chips[6].exists()).toBeTruthy()
    expect(chips[6].text()).toBe(
      relatedResource?.packageBag?.repository?.name
    )
  })

  it('display published tag', () => {
    expect(chips[7].exists()).toBeTruthy()
    expect(chips[7].text()).toBe(
      i18n.t('columns.repository.published')
    )
  })

  it('display active tag', () => {
    expect(chips[8].exists()).toBeTruthy()
    expect(chips[8].text()).toBe(i18n.t('columns.active'))
  })

  it('display source', () => {
    expect(chips[9].exists()).toBeTruthy()
    expect(chips[9].text()).toBe(
      relatedResource.packageBag?.source
    )
  })

  it('display changes', () => {
    expect(
      wrapper.findComponent(UpdateDescription).exists()
    ).toBeFalsy()
  })
})
