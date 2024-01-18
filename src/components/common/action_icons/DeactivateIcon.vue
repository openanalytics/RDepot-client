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
        id="cancel-icon"
        @click.stop
        @click="deactivateDialog"
        v-bind="props"
        color="oared"
        :class="class"
        >mdi-cancel</VIcon
      >
    </template>
    <span id="action-deactivate">{{
      $t('common.deactivate')
    }}</span>
  </VTooltip>
</template>

<script setup lang="ts">
import { OverlayEnum } from '@/enum/Overlay'
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/common'

const props = defineProps({
  name: {
    type: String
  },
  setResourceId: {
    type: Function,
    required: true
  },
  class: {
    type: String,
    default: 'ml-3'
  }
})

const commonStore = useCommonStore()

function deactivateDialog() {
  props.setResourceId()
  commonStore.setOverlayText(
    i18n.t('common.deactivateQuestion', {
      resource_name: props.name
    })
  )
  commonStore.setOverlayModel(true)
  commonStore.setOverlayOpacity(0.8)
  commonStore.setOverlayComponent(
    OverlayEnum.enum.Deactivate
  )
}
</script>
