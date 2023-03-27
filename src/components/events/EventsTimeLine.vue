<template>
  <v-timeline
    :side="smAndDown ? 'end' : undefined"
    ref="eventsTimeline"
    id="eventsTimeline"
    truncate-line="both"
    class="timeline"
    align="center"
  >
    <v-timeline-item
      v-for="(item, i) in grouped_events"
      :key="i"
      :dot-color="getDotColor(item)"
      class="default"
      :class="{
        day: item && !item.eventType
      }"
      @click="clickDot(item)"
      :width="eventBoxWidth"
      :hide-dot="!item"
      :min-height="
        item ? (isYearAndMonthDate(item) ? '90' : '0') : '0'
      "
    >
      <template v-slot:icon>
        <EventIcon
          :event="item.eventType ? item : undefined"
          :date="!item.eventType ? item : undefined"
        />
      </template>
      <EventBox
        v-if="item && item.eventType"
        :event="item"
      ></EventBox>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup lang="ts">
import EventBox from './EventBox.vue'
import EventIcon from './EventIcon.vue'
import { EntityModelNewsfeedEventDto } from '@/openapi'
import { useEventsStore } from '@/store/events'
import {
  computed,
  ref,
  onMounted,
  nextTick,
  onBeforeUnmount,
  onActivated
} from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { useTheme } from 'vuetify'
import { useDates } from '@/composable/date'

const { current } = useTheme()
const { lgAndUp, mdAndUp, smAndUp, smAndDown } =
  useDisplay()
const { isYearAndMonthDate, getMonthAndYear, getDate } =
  useDates()
const events_store = useEventsStore()
const hiddenDays = ref<string[]>([])
const hiddenMonths = ref<string[]>([])

const eventBoxWidth = computed(() => {
  return lgAndUp
    ? '650'
    : mdAndUp
    ? '450'
    : smAndUp
    ? '400'
    : '250'
})

function getDotColor(item: any) {
  return item && !item.eventType
    ? current.value.colors.background
    : 'oablue'
}

function clickDot(item: any) {
  item && item.eventType ? ' ' : hideDates(item)
}

function hideDates(date: string) {
  if (date.toString() != 'false') {
    if (date.length == 10) {
      hideDay(date)
    } else {
      hideMonth(date)
    }
  }
}

function hideDay(day: string) {
  if (hiddenDays.value.indexOf(day) == -1) {
    hiddenDays.value.push(day)
  } else {
    hiddenDays.value.splice(
      hiddenDays.value.indexOf(day),
      1
    )
  }
}

function hideMonth(date: string) {
  if (hiddenMonths.value.indexOf(date) == -1) {
    hiddenMonths.value.push(date)
  } else {
    hiddenMonths.value.splice(
      hiddenMonths.value.indexOf(date),
      1
    )
  }
}

const grouped_events = computed(function () {
  if (
    events_store.events != undefined &&
    events_store.events.length > 0
  ) {
    const local_events: any[] = []
    const events_grouped_by_date = groupByDate(
      events_store.events
    )

    var firstDate = events_grouped_by_date
      .keys()
      .next().value
    var dateTime = new Date(firstDate)
    var monthYear = getMonthAndYear(dateTime)
    local_events.push(false)
    local_events.push(monthYear)
    local_events.push(null)

    events_grouped_by_date.forEach((events, date) => {
      if (monthYear != getMonthAndYear(new Date(date))) {
        monthYear = getMonthAndYear(new Date(date))
        local_events.push(false)
        local_events.push(monthYear)
        local_events.push(false)
      }

      if (hiddenMonths.value.indexOf(monthYear) == -1) {
        local_events.push(false)
        local_events.push(date)
        local_events.push(false)
        if (hiddenDays.value.indexOf(date) == -1) {
          events.forEach(
            (event: EntityModelNewsfeedEventDto) => {
              local_events.push(event)
            }
          )
        }
      }
    })
    return local_events
  }
})

function groupByDate(
  events: EntityModelNewsfeedEventDto[]
) {
  const groupedMap = events.reduce(
    (entryMap, e) =>
      entryMap.set(getDate(e), [
        ...(entryMap.get(getDate(e)) || []),
        e
      ]),
    new Map()
  )
  return groupedMap
}

const eventsTimeline = ref<HTMLDivElement>()

async function loadMoreEvents() {
  let element: HTMLElement | null = document.getElementById(
    'eventsTimeline'
  )

  if (
    element != null &&
    element.getBoundingClientRect().bottom <
      window.innerHeight
  ) {
    await events_store.fetchNextPageEvents()
  }
}

  nextTick(() => {
    window.addEventListener('scroll', () => {
    })
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', () => {
    loadMoreEvents()
  })
})
</script>

<style lang="scss">
.v-timeline--vertical.v-timeline.v-timeline--side-end
  .v-timeline-item
  .v-timeline-item__opposite {
  @media screen and (max-width: 700px) {
    display: none !important;
  }
}

.dateBox {
  text-align: center;
}

.dateDot {
  width: 200px;
  background-color: rgb(var(--v-theme-oared));
  opacity: 0.8;
  border-radius: 16px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  .day {
    padding: 10px;
  }
  .year {
    font-size: 2em;
    padding: 5px 5px 10px 5px;
    .month {
      text-align: center;
      border-top: solid 2px;
      border-bottom: solid 2px;
      font-size: 1rem !important;
      padding: 5px 0;
    }
  }
}

.timeline {
  justify-content: center;
  align-items: start;
  height: auto !important;
  margin-top: 50px;
  margin-bottom: 100px;
}

.v-timeline .v-timeline-divider__dot {
  background: none !important;
}
</style>
