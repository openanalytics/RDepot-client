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
      <v-btn
        id="replace-button"
        v-bind="props"
        :color="disabled ? 'grey' : 'default'"
        variant="text"
        :icon="replaceIcon"
        @click.stop
        @click="replacePackage"
      ></v-btn>
    </template>
    <div class="tooltip">
      {{ translatedHoverMessage }}
    </div>
  </v-tooltip>
</template>

<script setup lang="ts">
import { useSubmissionStore } from '@/store/options/submission'
import { computed } from 'vue'
import { i18n } from '@/plugins/i18n'
import Icons from '@/maps/Icons'

const componentProps = defineProps({
  file: { type: File, required: true },
  disabled: { type: Boolean, required: true }
})

const submissionsStore = useSubmissionStore()

const translatedHoverMessage = computed(() => {
  return componentProps.disabled
    ? i18n.t('config.replacingPackages')
    : i18n.t('packageDetails.replaceOptionDesc')
})

const replaceIcon = computed(() => {
  return submissionsStore.getReplaceForPackage(
    componentProps.file
  )
    ? Icons.get('checkbox')
    : Icons.get('checkbox-not')
})

function replacePackage() {
  if (!componentProps.disabled) {
    submissionsStore.updateReplaceOptionForPackage(
      componentProps.file
    )
  }
}
</script>

<style lang="scss" scoped>
.tooltip {
  max-width: 300px !important;
  text-align: center;
}
</style>
