<!--
 R Depot
 
 Copyright (C) 2012-2023 Open Analytics NV
 
 ===========================================================================
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the Apache License as published by
 The Apache Software Foundation, either version 2 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 Apache License for more details.
 
 You should have received a copy of the Apache License
 along with this program. If not, see <http://www.apache.org/licenses/>
 
-->

<template>
  <v-timeline
    v-if="
      groupedEvents != undefined && groupedEvents.length > 0
    "
    :side="smAndDown ? 'end' : undefined"
    ref="eventsTimeline"
    id="eventsTimeline"
    truncate-line="both"
    class="timeline"
    align="center"
  >
    <v-timeline-item
      v-for="(item, i) in groupedEvents"
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
  <NoEvents
    v-else-if="!commonStore.progressCircularActive"
  />
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
  onBeforeUnmount
} from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { useTheme } from 'vuetify'
import { useDates } from '@/composable/date'
import NoEvents from './NoEvents.vue'
import { useCommonStore } from '@/store/common'
import moment from 'moment'

const { current } = useTheme()
const { lgAndUp, mdAndUp, smAndUp, smAndDown } =
  useDisplay()
const { isYearAndMonthDate, getMonthAndYear, getDate } =
  useDates()

const commonStore = useCommonStore()
const eventsStore = useEventsStore()
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

const groupedEvents = computed(function () {
  if (
    eventsStore.events != undefined &&
    eventsStore.events.length > 0
  ) {
    const localEvents: any[] = []
    const eventsGroupedByDate = groupByDate(
      eventsStore.events
    )

    const dateFormat = 'yyyy.MM.DD'
    var firstDate = eventsGroupedByDate.keys().next().value
    var dateTime = moment(firstDate, dateFormat)
    var monthYear = getMonthAndYear(dateTime)
    localEvents.push(false)
    localEvents.push(monthYear)
    localEvents.push(null)

    eventsGroupedByDate.forEach((events, date) => {
      if (
        monthYear !=
        getMonthAndYear(moment(date, dateFormat))
      ) {
        monthYear = getMonthAndYear(
          moment(date, dateFormat)
        )
        localEvents.push(false)
        localEvents.push(monthYear)
        localEvents.push(false)
      }

      if (hiddenMonths.value.indexOf(monthYear) == -1) {
        localEvents.push(false)
        localEvents.push(date)
        localEvents.push(false)
        if (hiddenDays.value.indexOf(date) == -1) {
          events.forEach(
            (event: EntityModelNewsfeedEventDto) => {
              localEvents.push(event)
            }
          )
        }
      }
    })
    return localEvents
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
    await eventsStore.fetchNextPageEvents()
  }
}

var lastScrollTop = 0

onMounted(async () => {
  await eventsStore.fetchEvents()
  nextTick(() => {
    window.addEventListener('scroll', () => {
      var st =
        window.pageYOffset ||
        document.documentElement.scrollTop
      if (st > lastScrollTop) {
        loadMoreEvents()
      }
      lastScrollTop = st <= 0 ? 0 : st
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
