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
import { EventsFiltration } from '@/models/Filtration'
import FiltrationChips from '@/components/common/chips/FiltrationChips.vue'
import EventsFiltrationChips from '@/components/events/EventsFiltrationChips.vue'
import { Technologies } from '@/enum/Technologies'
import { useEventsStore } from '@/store/events'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let events_store: any

const example_events_filtration = EventsFiltration.parse({
  technologies: [
    Technologies.enum.R,
    Technologies.enum.Python
  ],
  userId: '3',
  resourceId: '4',
  eventType: 'update',
  resourceType: 'repository'
})

beforeAll(() => {
  global.ResizeObserver = ResizeObserver
})

beforeEach(async () => {
  setActivePinia(createPinia())
  events_store = useEventsStore()
  events_store.setFiltration(example_events_filtration)
  wrapper = mount(EventsFiltrationChips, {
    global: globalConfig
  })
})

describe('Events - chips', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('show chips', () => {
    expect(
      wrapper.findComponent(FiltrationChips).isVisible()
    ).toBe(true)
  })

  it('click on chip causes filtration update', async () => {
    const technologiesChip = wrapper.find('#technologies')
    const userIdChip = wrapper.find('#user_id')
    const resourceIdChip = wrapper.find('#resource_id')
    const eventTypeChip = wrapper.find('#event_type')
    const resourceTypeChip = wrapper.find('#resource_type')

    expect(technologiesChip.isVisible()).toBeTruthy()
    expect(userIdChip.isVisible()).toBeTruthy()
    expect(resourceIdChip.isVisible()).toBeTruthy()
    expect(eventTypeChip.isVisible()).toBeTruthy()
    expect(resourceTypeChip.isVisible()).toBeTruthy()

    await technologiesChip.trigger('click')
    await userIdChip.trigger('click')
    await resourceIdChip.trigger('click')
    await eventTypeChip.trigger('click')
    await resourceTypeChip.trigger('click')

    expect(events_store.filtration.userId).toBe(undefined)
    expect(events_store.filtration.resourceId).toBe(
      undefined
    )
    expect(events_store.filtration.eventType).toBe(
      undefined
    )
    expect(events_store.filtration.resourceType).toBe(
      undefined
    )
    expect(
      events_store.filtration.technologies
    ).toStrictEqual(['Python'])
  })
})
