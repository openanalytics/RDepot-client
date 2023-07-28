<!--
 R Depot
 
 Copyright (C) 2012-2023 Open Analytics NV
 
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
    <template v-slot:activator="{ props }">
      <VIcon
        id="delete-icon"
        @click.stop
        @click="deleteDialog"
        v-bind="props"
        color="oared"
        class="ml-3"
        >mdi-trash-can</VIcon
      >
    </template>
    <span id="action-delete">{{
      $t('common.delete')
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
  }
})

const commonStore = useCommonStore()

function deleteDialog() {
  props.setResourceId()
  commonStore.setOverlayText(
    i18n.t('common.deleteQuestion', {
      resource_name: props.name
    })
  )
  commonStore.setOverlayModel(true)
  commonStore.setOverlayOpacity(0.8)
  commonStore.setOverlayComponent(OverlayEnum.enum.Delete)
}
</script>
