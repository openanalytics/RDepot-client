<template>
  <v-timeline
    :side="smAndDown ? 'end' : undefined"
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
      :min-height="item ? '30' : '0'"
    >
      <template v-slot:icon>
        <div v-if="!item.eventType" class="dateDot">
          <div v-if="isFullDate(item)" class="day">
            {{ item }}
          </div>
          <div v-if="isYearAndMonthDate(item)">
            <div class="year">
              {{ new Date(item).getFullYear() }}
              <div class="month">
                {{
                  getMonthName(new Date(item).getMonth())
                }}
              </div>
            </div>
          </div>
        </div>
        <v-icon
          :icon="eventsIcons.get(item.eventType)"
          v-else
        >
        </v-icon>
      </template>

      <EventBox
        v-if="item && item.eventType"
        :event="item"
      ></EventBox>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup lang="ts">
import { useEventsStore } from '@/store/events'
import { computed, ref } from 'vue'
import EventBox from './EventBox.vue'
import { eventsIcons } from '@/models/EventTypeIcon'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { EntityModelNewsfeedEventDto } from '@/openapi'

const { lgAndUp, mdAndUp, smAndUp, smAndDown } =
  useDisplay()
const events_store = useEventsStore()

const hiddenDays = ref<string[]>([])
const hiddenMonths = ref<string[]>([])

const eventBoxWidth = computed(() => {
  return lgAndUp
    ? '450'
    : mdAndUp
    ? '450'
    : smAndUp
    ? '400'
    : '250'
})

function getMonthName(monthNumber: number) {
  const date = new Date()
  date.setMonth(monthNumber)

  return date.toLocaleString('en-US', { month: 'short' })
}

function isFullDate(date: string): boolean {
  return date.length == 10
}

function isYearAndMonthDate(date: string): boolean {
  return date.length == 7
}
function getYear(yearMonthDate: string) {
  return yearMonthDate.substring(0, 4)
}

function getDotColor(item: any) {
  return item && !item.eventType ? 'oared' : 'oablue'
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

function getMonthAndYear(date: Date): string {
  return (
    date.getFullYear().toString() +
    '.' +
    padTo2Digits(date.getMonth())
  )
}

const grouped_events = computed(function () {
  const local_events: any[] = []

  const events_grouped_by_date = groupByDate(
    events_store.events
  )

  var [monthAndYear] = events_grouped_by_date.keys()
  var dateTime = new Date(monthAndYear)
  monthAndYear = getMonthAndYear(dateTime)
  local_events.push(false)
  local_events.push(monthAndYear)
  local_events.push(null)
  console.log(monthAndYear)

  events_grouped_by_date.forEach((events, date) => {
    if (monthAndYear != getMonthAndYear(new Date(date))) {
      monthAndYear = getMonthAndYear(new Date(date))
      local_events.push(false)
      local_events.push(monthAndYear)
      local_events.push(false)
    }

    if (hiddenMonths.value.indexOf(monthAndYear) == -1) {
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

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0')
}

function formatDate(date: Date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth()),
    padTo2Digits(date.getDate())
  ].join('.')
}

function getDate(
  event: EntityModelNewsfeedEventDto | undefined
) {
  if (event && event.time) {
    const date = new Date(event.time)
    return formatDate(date)
  }
  return 'null'
}
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
  border-radius: 16px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
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
      border-top: solid 2px #fff;
      border-bottom: solid 2px #fff;
      font-size: 1rem !important;
      padding: 5px 0;
    }
  }
}

.timeline {
  display: flex;
  direction: column;
  justify-content: center;
  align-items: start;
  height: auto !important;
  margin-top: 50px;
}
</style>
