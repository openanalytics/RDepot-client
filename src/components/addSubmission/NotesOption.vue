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
        id="notes-button"
        :icon="notesIcon"
        variant="text"
        v-bind="props"
        class="mx-8"
        @click.stop
        @click="notesPackage"
      ></v-btn>
    </template>
    <span id="tooltip-wait">{{
      $t('packages.notes')
    }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { useSubmissionStore } from '@/store/options/submission'
import { computed, defineEmits } from 'vue'
import Icons from '@/maps/Icons'

const emit = defineEmits(['expandNotes'])
const componentProps = defineProps({
  file: { type: File, required: true }
})

const submissionsStore = useSubmissionStore()

const notesIcon = computed(() => {
  return submissionsStore.getNotesForPackageBool(
    componentProps.file
  )
    ? Icons.get('checkbox')
    : Icons.get('checkbox-not')
})

function notesPackage() {
  submissionsStore.updateNotesOptionForPackage(
    componentProps.file
  )
  emit('expandNotes', componentProps.file)
}
</script>

<style lang="scss" scoped>
.tooltip {
  max-width: 300px !important;
  text-align: center;
}
</style>
