<template>
  <v-card class="eventCard">
    <v-card-title
      style="padding: 0"
      class="d-flex justify-space-between align-items-start"
    >
      <div class="title">
        {{
          props.event?.resourceType?.replaceAll('_', ' ')
        }}
      </div>
      <div class="date">
        {{ shortDate }}
      </div>
    </v-card-title>
    <v-card-text class="eventCard">
      <div class="d-flex justify-beteen align-items-start">
        <div class="description">
          {{ props.event?.resourceDescription }}
          {{ props.event?.time }}
          {{ props.event?.user }}
        </div>
      </div>
      <p></p>
      <!-- :color="item.color" -->
      <v-btn variant="outlined">
        {{ props.event?.eventType }}
      </v-btn>
      <v-btn variant="outlined" v-if="props.event?.time">
        {{ date?.getDay() }}
        {{ date?.getDate() }}
        {{ date?.getMonth() }}
        {{ date?.getFullYear() }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { EntityModelNewsfeedEventDto } from '@/openapi'
import { computed } from 'vue'
const props = defineProps({
  event: Object as () => EntityModelNewsfeedEventDto
})
const date = computed(function () {
  if (props.event?.time) {
    return new Date(props.event.time)
  } else {
    return null
  }
})

const shortDate = computed(function () {
  if (props.event?.time) {
    let date: string = new Date(props.event.time).toString()
    return date.substring(4, date.indexOf(' GMT'))
  } else {
    return null
  }
})
</script>

<style lang="scss">
.eventCard {
  max-width: 500px;

  .title {
    padding: 0.5em;
  }

  .date {
    font-size: 12px;
    border-left: solid rgb(var(--v-theme-oablue)) 1px;
    border-bottom: solid rgb(var(--v-theme-oablue)) 1px;
    border-bottom-left-radius: 16px;
    padding: 4px 10px;
    // line-height: 1;
    max-height: 40px;
  }

  .description {
    margin-top: 10px;
  }
}
</style>
