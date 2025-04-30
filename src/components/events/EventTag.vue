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
  <v-snackbar v-model="copied" location="right bottom">{{
    $t('messages.general.copied')
  }}</v-snackbar>
  <v-tooltip :disabled="disableTooltip || !hoverMessage">
    <template #activator="{ props }">
      <v-chip
        id="eventTag"
        :prepend-icon="prependIcon"
        :append-icon="appendIcon"
        :color="color"
        :size="size"
        :variant="variant"
        v-bind="props"
        @click="disableCopying || !value ? '' : copy(value)"
      >
        {{
          tagType === 'date'
            ? formatDate(new Date(value))
            : value
        }}
      </v-chip>
    </template>
    <span>{{ hoverMessage }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { PropType } from 'vue'
import { z } from 'zod'
import { useDates } from '@/composable/date'

const { formatDate } = useDates()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const allowedVariants = z.enum([
  'tonal',
  'flat',
  'text',
  'elevated',
  'outlined',
  'plain'
])

type AllowedVariants = z.infer<typeof allowedVariants>

defineProps({
  value: {
    type: String,
    required: false,
    default: () => {}
  },
  hoverMessage: {
    type: String,
    required: false,
    default: () => {
      return ''
    }
  },
  color: {
    type: String,
    required: false,
    default: 'oablue'
  },
  size: {
    type: String,
    required: false,
    default: 'x-small'
  },
  disableTooltip: {
    type: Boolean,
    required: false,
    default: false
  },
  disableCopying: {
    type: Boolean,
    required: false,
    default: false
  },
  prependIcon: {
    type: String,
    required: false,
    default: ''
  },
  appendIcon: {
    type: String,
    required: false,
    default: ''
  },
  variant: {
    type: String as PropType<AllowedVariants>,
    required: false,
    default: 'tonal'
  },
  tagType: {
    type: String,
    required: false,
    default: 'string'
  }
})

const { copy, copied } = useClipboard()
</script>
