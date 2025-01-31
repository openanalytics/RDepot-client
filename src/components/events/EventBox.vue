<!--
 R Depot
 
 Copyright (C) 2012-2025 Open Analytics NV
 
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
  <v-card v-ripple class="eventCard elevation-2" rounded>
    <v-icon
      style="
        position: absolute;
        right: 0;
        bottom: 0;
        opacity: 0.4;
        z-index: 100;
      "
      color="oablue"
      size="60"
      class="mb-1 mr-1"
      >{{ getIcon(event?.resourceType)[0] }}</v-icon
    >
    <v-icon
      v-if="getIcon(event?.resourceType).length > 1"
      color="oablue"
      size="40"
      class="mb-1 mr-1 nestedIcon"
      >{{ getIcon(event?.resourceType)[1] }}</v-icon
    >
    <EventBoxDescription
      v-if="eventType && resourceType"
      :event="event"
      :event-type="eventType"
      :resource-type="resourceType"
    />
  </v-card>
</template>

<script setup lang="ts">
import { EntityModelNewsfeedEventDto } from '@/openapi'
import { computed } from 'vue'
import EventBoxDescription from '@/components/events/EventBoxDescription.vue'
import { useIcons } from '@/composable/icons'

const componentProps = defineProps({
  event: {
    type: Object as () => EntityModelNewsfeedEventDto,
    required: true
  }
})

const { getIcon } = useIcons()

const resourceType = computed(() => {
  return componentProps.event?.resourceType?.replaceAll(
    '_',
    ' '
  )
})

const eventType = computed(() => {
  return componentProps.event?.eventType
})
</script>

<style lang="scss">
.eventCard {
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

.nestedIcon {
  position: absolute;
  right: 0;
  bottom: 0;
  opacity: 0.6;
  z-index: 100;
}

.nestedIcon.v-theme--dark {
  color: white;
  text-shadow:
    -1px 0 #000,
    0 1px #000,
    1px 0 #000,
    0 -1px #000;
}

.nestedIcon.v-theme--light {
  color: white;
  text-shadow:
    -1px 0 #000,
    0 1px #000,
    1px 0 #000,
    0 -1px #000;
}
</style>
