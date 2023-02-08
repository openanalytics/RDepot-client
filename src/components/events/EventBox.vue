<template>
  <v-card>
    <!-- <v-card-title
          :class="['text-h6', `bg-${item.color}`]"
        >
          Lorem Ipsum Dolor
        </v-card-title> -->
    <v-card-text class="bg-white text--primary">
      <p>
        {{ props.event?.resourceDescription }}
        {{ props.event?.time }}
        {{ props.event?.user }}
      </p>
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
</script>
