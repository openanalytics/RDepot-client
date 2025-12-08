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
  <v-tooltip location="left">
    <template #activator="{ props }">
      <div
        id="tooltip-activator"
        v-bind="props"
        class="ml-n3"
      >
        <v-btn
          id="refresh-button"
          color="primary"
          dark
          dense
          size="x-small"
          icon
          class="mx-3"
          @click="refresh"
        >
          <v-icon :icon="Icons.get('republish')" />
        </v-btn>
      </div>
    </template>
    <span id="tooltip-wait">
      {{ i18n.t('actions.general.refresh') }}</span
    >
  </v-tooltip>
</template>

<script setup lang="ts">
import Icons from '@/maps/Icons'
import { i18n } from '@/plugins/i18n'

const emits = defineEmits(['refresh'])
async function refresh() {
  emits('refresh')
}
</script>
