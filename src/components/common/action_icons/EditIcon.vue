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
      <v-icon
        id="pencil-icon"
        @click.stop
        @click="edit"
        v-bind="props"
        class="ml-3"
        :color="disabled ? 'grey' : 'oablue'"
        >mdi-pencil</v-icon
      >
    </template>
    <span id="action-delete" v-if="!disabled">{{
      text
    }}</span>
    <span v-else>
      {{ hoverMessage }}
    </span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { OverlayEnum } from '@/enum/Overlay'
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/common'

const props = defineProps({
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
    reqiured: false,
    default: i18n.t('common.notAuthorized')
  }
})

const emits = defineEmits(['setEntity'])
const commonStore = useCommonStore()

function edit() {
  if (!props.disabled) {
    emits('setEntity')
    commonStore.setOverlayText(props.text)
    commonStore.openOverlay(OverlayEnum.enum.Edit)
  }
}
</script>
