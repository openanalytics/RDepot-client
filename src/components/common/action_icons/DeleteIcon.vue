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
  <VTooltip location="top">
    <template #activator="{ props }">
      <VIcon
        :id="id"
        v-bind="props"
        :color="disabled ? 'grey' : 'oared'"
        @click.stop
        @click="deleteDialog"
        >{{ Icons.get('delete') }}</VIcon
      >
    </template>
    <span v-if="!disabled" id="action-delete">{{
      i18n.t('actions.general.delete')
    }}</span>
    <span v-else>
      {{ translatedHoverMessage }}
    </span>
  </VTooltip>
</template>

<script setup lang="ts">
import Icons from '@/maps/Icons'
import { i18n } from '@/plugins/i18n'
import { computed } from 'vue'

const emits = defineEmits(['setResourceId'])

const componentProps = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  hoverMessage: {
    type: String,
    required: false,
    default: ''
  },
  overlayText: {
    type: String,
    required: false,
    default: ''
  },
  id: {
    type: String,
    required: false,
    default: 'delete-icon'
  }
})

function deleteDialog() {
  if (!componentProps.disabled) {
    emits('setResourceId')
  }
}

const translatedHoverMessage = computed(() => {
  return (
    componentProps.hoverMessage ||
    i18n.t('messages.general.notAuthorized')
  )
})
</script>
