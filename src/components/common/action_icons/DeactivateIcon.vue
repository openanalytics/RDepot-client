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
  <VTooltip top>
    <template #activator="{ props }">
      <VIcon
        :id="iconId"
        v-bind="props"
        :color="disabled ? 'grey' : 'oared'"
        @click.stop
        @click="deactivateDialog"
        >{{ Icons.get('cancel') }}</VIcon
      >
    </template>
    <span v-if="!disabled" id="action-deactivate">{{
      $t('common.deactivate')
    }}</span>
    <span v-else>
      {{ translatedHoverMessage }}
    </span>
  </VTooltip>
</template>

<script setup lang="ts">
import { OverlayEnum } from '@/enum/Overlay'
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/common'
import { computed } from 'vue'
import Icons from '@/maps/Icons'

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
  iconId: {
    type: String,
    required: false,
    default: 'deactivate-icon'
  }
})

const commonStore = useCommonStore()

function deactivateDialog() {
  emits('setResourceId')
  commonStore.overlayText = i18n.t(
    'common.deactivateQuestion',
    {
      resource_name: componentProps.name
    }
  )

  commonStore.openOverlay(OverlayEnum.enum.Deactivate)
}

const translatedHoverMessage = computed(() => {
  return (
    componentProps.hoverMessage ||
    i18n.t('common.notAuthorized')
  )
})
</script>
