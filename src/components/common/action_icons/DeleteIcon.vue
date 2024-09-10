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
      $t('common.delete')
    }}</span>
    <span v-else>
      {{ translatedHoverMessage }}
    </span>
  </VTooltip>
</template>

<script setup lang="ts">
import { OverlayEnum } from '@/enum/Overlay'
import Icons from '@/maps/Icons'
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/options/common'
import { computed } from 'vue'

const emits = defineEmits(['setResourceId'])

const componentProps = defineProps({
  name: {
    type: String,
    required: true
  },
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

const commonStore = useCommonStore()

function deleteDialog() {
  if (!componentProps.disabled) {
    emits('setResourceId')
    commonStore.overlayText =
      componentProps.overlayText ||
      i18n.t('common.deleteQuestion', {
        resource_name: componentProps.name
      })
    commonStore.openOverlay(OverlayEnum.enum.Delete)
  }
}

const translatedHoverMessage = computed(() => {
  return (
    componentProps.hoverMessage ||
    i18n.t('common.notAuthorized')
  )
})
</script>
