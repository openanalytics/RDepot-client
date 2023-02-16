<template>
  <v-card class="eventCard elevation-2" v-ripple rounded>
    <v-card-title
      style="padding: 0"
      class="d-flex justify-space-between align-items-start"
    >
      <div class="title">
        {{ resourceType }} - {{ eventType }}
      </div>
      <div class="date">
        <div>
          {{ time }}
        </div>
      </div>
    </v-card-title>
    <v-card-text class="eventCard">
      <div class="by-user d-flex">
        <span class="subtitle"> author</span>
        <p class="value">
          {{ login }} <br />
          {{ email }}
        </p>
      </div>
      <v-divider></v-divider>
      <div class="desc d-flex">
        <span class="subtitle"> description</span>
        <p class="value">
          {{ description }}
        </p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { EntityModelNewsfeedEventDto } from '@/openapi'
import { computed } from 'vue'
import { useDates } from '@/composable/date'

const props = defineProps({
  event: Object as () => EntityModelNewsfeedEventDto
})

const { padTo2Digits } = useDates()

const time = computed(function () {
  if (props.event?.time) {
    let date: Date = new Date(props.event.time)
    let time: String =
      padTo2Digits(date.getHours()) +
      ':' +
      date.getMinutes()
    return time
  } else {
    return null
  }
})

const resourceType = computed(() => {
  return props.event?.resourceType?.replaceAll('_', ' ')
})

const eventType = computed(() => {
  return props.event?.eventType
})

const login = computed(() => {
  return props.event?.user?.login
})

const email = computed(() => {
  return props.event?.user?.email
})

const description = computed(() => {
  return props.event?.resourceDescription
})
</script>

<style lang="scss">
.eventCard {
  max-width: 500px;

  .title {
    padding: 0.5em;
    margin-left: 10px;
  }

  .date {
    font-size: 12px;
    border-left: solid rgb(var(--v-theme-oablue)) 1px;
    border-bottom: solid rgb(var(--v-theme-oablue)) 1px;
    border-bottom-left-radius: 16px;
    padding: 10px 10px 10px 10px;
    max-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .subtitle {
    font-size: 1.2em;
    margin: 10px 5px;
    flex-basis: 30%;
  }
  .value {
    flex-basis: 70%;
    margin: 10px 0;
  }
}
</style>
