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
  <div
    v-if="date"
    class="dateDot"
    @click="emit('hideDate', date)"
  >
    <div v-if="isFullDate(date)">
      <v-chip color="primary" variant="elevated">
        {{ date }}</v-chip
      >
    </div>
    <div v-if="isYearAndMonthDate(date)">
      <v-card elevation="2">
        <div
          v-if="date"
          class="year d-flex align-center flex-column px-2 pt-2 pb-3"
        >
          {{ getFullYear(date) }}
          <div class="month py-1 px-0">
            <v-chip color="primary" variant="elevated">
              {{ getMonthName(date) }}</v-chip
            >
          </div>
        </div>
      </v-card>
    </div>
  </div>
  <div v-else-if="event && event?.eventType">
    <v-tooltip location="bottom">
      <template #activator="{ props }">
        <v-icon
          size="20"
          center
          v-bind="props"
          :icon="Icons.get(event.eventType)"
        >
        </v-icon>
      </template>
      {{ event.eventType }}
    </v-tooltip>
  </div>
</template>

<script setup lang="ts">
import Icons from '@/maps/Icons'
import { EntityModelNewsfeedEventDto } from '@/openapi'
import moment from 'moment'
import 'moment/dist/locale/pl'
import { i18n } from '@/plugins/i18n'

const emit = defineEmits(['hideDate'])

defineProps({
  date: { type: String, required: false, default: null },
  event: {
    type: Object as () => EntityModelNewsfeedEventDto,
    required: false,
    default: () => {
      return {}
    }
  }
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
    .locale(i18n.locale.value)
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
