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
  <v-tooltip location="top">
    <template #activator="{ props }">
      <v-icon
        :id="iconId"
        v-bind="props"
        :color="disabled ? 'grey' : 'oablue'"
        @click.stop
        @click="edit"
        >{{ Icons.get('edit') }}</v-icon
      >
    </template>
    <span v-if="!disabled" id="action-delete">{{
      text
    }}</span>
    <span v-else>
      {{ translatedHoverMessage }}
    </span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { OverlayEnum } from '@/enum/Overlay'
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/options/common'
import { computed } from 'vue'
import Icons from '@/maps/Icons'

const componentProps = defineProps({
  text: {
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
  iconId: {
    type: String,
    required: false,
    default: 'pencil-icon'
  }
})

const emits = defineEmits(['setEntity'])
const commonStore = useCommonStore()

function edit() {
  if (!componentProps.disabled) {
    emits('setEntity')
    commonStore.overlayText = componentProps.text
    commonStore.openOverlay(OverlayEnum.enum.Edit)
  }
}

const translatedHoverMessage = computed(() => {
  return (
    componentProps.hoverMessage ||
    i18n.t('common.notAuthorized')
  )
})
</script>
