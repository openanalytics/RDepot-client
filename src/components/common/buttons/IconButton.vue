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
  <v-tooltip location="top">
    <template #activator="{ props }">
      <div
        id="tooltip-activator"
        v-bind="props"
        class="pl-3"
      >
        <v-btn
          :id="id"
          :color="color"
          :icon="icon"
          :size="size"
          @click="emit('click')"
        />
      </div>
    </template>
    <span id="tooltip-wait">{{
      componentProps.tooltip
    }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import Icons from '@/maps/Icons'

const componentProps = defineProps({
  tooltip: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: false,
    default: Icons.get('accept')
  },
  color: {
    type: String,
    required: false,
    default: 'default'
  },
  size: {
    type: String,
    required: false,
    default: 'small'
  },
  id: {
    type: String,
    required: false,
    default: 'icon-button'
  }
})

const emit = defineEmits<{
  (event: 'click'): void
}>()
</script>

<style lang="scss"></style>
