<template>
  <!-- <v-timeline align="center" :side="xs ? 'end' : undefined"> -->
  <!-- {{ events }} -->
  <div v-for="(eventDate, index) in events" :key="index">
    <v-timeline
      align="center"
      :side="xs ? 'end' : undefined"
    >
      <v-timeline-item
        v-for="(event, i) in eventDate"
        :key="i"
        dot-color="oablue"
        :icon="
          (event.eventType &&
            eventsIcons.get(event.eventType)) ||
          'mdi-buffer'
        "
        fill-dot
      >
        <EventBox :event="event"></EventBox>
      </v-timeline-item>
      <v-timeline-item
        dot-color="oablue"
        icon="mdi-buffer'"
        fill-dot
      >
      </v-timeline-item>
    </v-timeline>
  </div>
  <!-- <v-timeline-item
      v-for="(event, i) in events"
      :key="i"
      dot-color="oablue"
      :icon="
        (event.eventType &&
          eventsIcons.get(event.eventType)) ||
        'mdi-buffer'
      "
      fill-dot
    >
      <EventBox :event="event"></EventBox>
    </v-timeline-item> -->
  <!-- </v-timeline> -->
</template>

<script setup lang="ts">
import { useEventsStore } from '@/store/events'
import { onMounted, computed } from 'vue'
import EventBox from './EventBox.vue'
import { eventsIcons } from '@/models/EventTypeIcon'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { EntityModelNewsfeedEventDto } from '@/openapi'
import { e } from 'vitest/dist/index-1cfc7f58'

const { xs } = useDisplay()
const events_store = useEventsStore()
const events = computed(function () {
  return groupByDayAndMonth(events_store.events)
})

function groupByDayAndMonth(
  events: EntityModelNewsfeedEventDto[]
) {
  console.log(events)
  const groupedMap = events
    .reduce(
      (entryMap, e) =>
        entryMap.set(getDate(e), [
          ...(entryMap.get(getDate(e)) || []),
          e
        ]),
      new Map()
    )
    .values()
  console.log(groupedMap)
  return groupedMap
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0')
}

function formatDate(date: Date) {
  return [
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
    padTo2Digits(date.getDate())
  ].join('/')
}

function getDate(
  event: EntityModelNewsfeedEventDto | undefined
) {
  if (event && event.time) {
    const date = new Date(event.time)
    const day = date.getDay()
    const month = date.getMonth()
    const year = date.getFullYear()
    // return day + ' ' + month + ' ' + year
    return formatDate(date)
  }
  return 'null'
}

async function updateState() {
  await events_store.fetchNextPageEvents()
}

// onMounted(() => {
//   updateState()
// })
</script>
