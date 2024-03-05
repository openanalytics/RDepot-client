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
    <template v-slot:activator="{ props }">
      <v-btn
        id="replace-button"
        v-bind="props"
        @click="
          submissionsStore.updateReplaceOptionForPackage(
            file
          )
        "
        :icon="
          submissionsStore.getReplaceForPackage(file)
            ? 'mdi-file-replace'
            : 'mdi-file-replace-outline'
        "
        variant="plain"
        class="mr-8"
        color="oablue"
        size="small"
      >
      </v-btn>
    </template>
    <div class="tooltip">
      {{ $t('packages.replaceOptionDesc') }}
    </div>
  </v-tooltip>
</template>

<script setup lang="ts">
import { useSubmissionStore } from '@/store/submission'

const props = defineProps({
  file: { type: File, required: true }
})

const submissionsStore = useSubmissionStore()
</script>

<style lang="scss" scoped>
.tooltip {
  max-width: 300px !important;
  text-align: center;
}
</style>
