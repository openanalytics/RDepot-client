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
  <div v-if="props.date" class="dateDot">
    <div v-if="isFullDate(props.date)" class="day">
      {{ props.date }}
    </div>
    <div v-if="isYearAndMonthDate(props.date)">
      <div class="year" v-if="props.date">
        {{ getFullYear(props.date) }}
        <div class="month">
          {{ getMonthName(props.date) }}
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
import moment from 'moment'

const props = defineProps({
  date: String,
  event: Object as () => EntityModelNewsfeedEventDto
})

function getFullYear(date: string) {
  const year = moment()
    .month(parseInt(date.split('.')[1]) - 1)
    .year(parseInt(date.split('.')[0]))
    .startOf('month')
    .year()
  return year
}

function getMonthName(date: string) {
  const monthNumber = moment()
    .startOf('month')
    .month(parseInt(date.split('.')[1]) - 1)
    .year(parseInt(date.split('.')[0]))
    .format('MMMM')
  return monthNumber
}

function isFullDate(date: string): boolean {
  return date.length == 10
}

function isYearAndMonthDate(date: string): boolean {
  return date.length == 7
}
</script>
