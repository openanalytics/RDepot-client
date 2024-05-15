<!--
 R Depot
 
 Copyright (C) 2012-2024 Open Analytics NV
 
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
    v-if="eventsStore.eventsGroupedByMonthAndDay.size > 0"
    :side="smAndDown ? 'end' : undefined"
    ref="eventsTimeline"
    id="eventsTimeline"
    truncate-line="both"
    class="timeline"
    align="center"
  >
    <template
      v-for="(
        monthEvents, i
      ) in eventsStore.eventsGroupedByMonthAndDay"
      :key="i"
    >
      <v-timeline-item
        dot-color="rgba(0,0,0,0)"
        min-height="100"
      >
        <template #icon>
          <EventIcon
            :event="undefined"
            :date="monthEvents[0]"
            @click="hideMonth(monthEvents[0])"
          />
        </template>
      </v-timeline-item>
      <v-timeline-item hide-dot />

      <template
        v-for="(dayEvents, j) in monthEvents[1]"
        :key="j"
        v-if="!hiddenMonths.includes(monthEvents[0])"
      >
        <v-timeline-item dot-color="rgba(0,0,0,0)">
          <template #icon>
            <EventIcon
              :event="undefined"
              :date="dayEvents[0]"
              @click="hideDay(dayEvents[0])"
            />
          </template>
        </v-timeline-item>
        <v-timeline-item hide-dot />
        <v-timeline-item
          v-for="(event, idx) in dayEvents[1]"
          :key="idx"
          v-if="!hiddenDays.includes(dayEvents[0])"
          :dot-color="getDotColor(event)"
          :width="eventBoxWidth"
        >
          <template #icon>
            <EventIcon
              :event="event.eventType ? event : undefined"
            />
          </template>
          <EventBox
            :event="event"
            v-if="event && event.eventType"
          ></EventBox>
        </v-timeline-item>
      </template>
    </template>
  </v-timeline>
  <NoEvents
    v-else-if="!commonStore.progressCircularActive"
  />
</template>

<script setup lang="ts">
import EventBox from './EventBox.vue'
import EventIcon from './EventIcon.vue'
import { useEventsStore } from '@/store/events'
import {
  computed,
  ref,
  onMounted,
  nextTick,
  onBeforeUnmount
} from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import NoEvents from './NoEvents.vue'
import { useCommonStore } from '@/store/common'

const { xlAndUp, lgAndUp, mdAndUp, smAndDown } =
  useDisplay()

const commonStore = useCommonStore()
const eventsStore = useEventsStore()
const hiddenDays = ref<string[]>([])
const hiddenMonths = ref<string[]>([])

const eventBoxWidth = computed(() => {
  return xlAndUp.value
    ? '650'
    : lgAndUp.value
    ? '500'
    : mdAndUp.value
    ? '450'
    : '400'
})

function getDotColor(item: any) {
  return item && !item.eventType
    ? 'rgba(0, 0, 0, 0)'
    : 'oablue'
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
  background-color: rgba(var(--v-theme-background));
  opacity: 0.8;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  .year {
    font-size: 2em;
    .month {
      font-size: 1rem !important;
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
