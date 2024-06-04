<!--
 R Depot
 
 Copyright (C) 2012-2024 Open Analytics NV
 
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
  <v-tooltip :disabled="isDisabled">
    <template #activator="{ props }">
      <div class="ml-2" v-bind="props">
        {{ displayValue }}
      </div>
    </template>
    <span>{{ value }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { i18n } from '@/plugins/i18n'
import { computed } from 'vue'

const componentProps = defineProps({
  value: {
    type: String,
    required: true
  },
  maxLength: {
    type: Number,
    required: false,
    default: 30
  }
})

const isDisabled = computed<boolean>(
  () =>
    componentProps.value.length < componentProps.maxLength
)
const displayValue = computed<string>(() => {
  if (
    componentProps.value.length > componentProps.maxLength
  ) {
    return (
      componentProps.value.substring(
        0,
        componentProps.maxLength
      ) + '...'
    )
  } else
    return (
      componentProps.value ||
      i18n.t('updatedProperties.unset')
    )
})
</script>
