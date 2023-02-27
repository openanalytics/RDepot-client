<template>
  <div v-if="props.date" class="dateDot">
    <div v-if="isFullDate(props.date)" class="day">
      {{ props.date }}
    </div>
    <div v-if="isYearAndMonthDate(props.date)">
      <div class="year" v-if="props.date">
        {{ new Date(props.date).getFullYear() }}
        <div class="month">
          {{
            getMonthName(new Date(props.date).getMonth())
          }}
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="props.event && props.event?.eventType">
    <v-icon
      size="20"
      center
      :icon="eventsIcons.get(props.event.eventType)"
    >
    </v-icon>
  </div>
</template>

<script setup lang="ts">
import { eventsIcons } from '@/models/EventTypeIcon'
import { EntityModelNewsfeedEventDto } from '@/openapi'

const props = defineProps({
  date: String,
  event: Object as () => EntityModelNewsfeedEventDto
})

function getMonthName(monthNumber: number) {
  const date = new Date()
  date.setMonth(monthNumber)
  return date.toLocaleString('en-US', { month: 'long' })
}

function isFullDate(date: string): boolean {
  return date.length == 10
}

function isYearAndMonthDate(date: string): boolean {
  return date.length == 7
}
</script>
