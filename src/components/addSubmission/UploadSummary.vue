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
  <v-list-item
    v-if="promise.packageBag"
    id="submission-package"
  >
    <template #title>
      {{ formatFilename(promise.packageBag.name) }}
    </template>

    <template #prepend>
      <v-progress-circular
        v-if="promise.state == 'pending'"
        indeterminate="disable-shrink"
        color="oablue"
        class="mr-5"
      ></v-progress-circular>
      <v-icon
        v-if="promise.state == 'success'"
        id="submission-success-icon"
        size="large"
        color="green"
        :icon="Icons.get('success')"
      />
      <v-tooltip
        v-if="promise.state == 'error'"
        max-width="400"
        location="left"
        content-class="custom-tooltip"
      >
        <template #activator="{ props }">
          <v-icon
            v-bind="props"
            id="submission-error-icon"
            color="red"
            class="hover"
            size="large"
            :icon="Icons.get('error')"
          ></v-icon>
        </template>
        <div
          v-for="(error, idx) in promise.error"
          :key="idx"
        >
          {{ error }}
        </div>
      </v-tooltip>

      <v-tooltip
        v-if="promise.state == 'warning'"
        max-width="400"
        location="left"
        content-class="custom-tooltip warning-tooltip"
      >
        <template #activator="{ props }">
          <v-icon
            id="submission-success-icon"
            size="large"
            color="warning"
            :icon="Icons.get('success')"
            class="hover"
            v-bind="props"
          ></v-icon>
        </template>
        {{
          $t(
            `messages.submissions.warnings.${promise.messageCode}`
          )
        }}
      </v-tooltip>
    </template>

    <template
      v-if="technology != Technologies.enum.Python"
      #append
    >
      <v-btn
        v-if="generateManual"
        id="generate-manual-icon-marked"
        disabled
        :icon="Icons.get('checkbox')"
        variant="text"
      ></v-btn>
      <v-btn
        v-else
        id="generate-manual-icon-blank"
        :icon="Icons.get('checkbox-not')"
        variant="text"
        disabled
      >
      </v-btn>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { PackagePromise } from '@/store/options/submission'
import { useFiles } from '@/composable/file'
import Icons from '@/maps/Icons'
import { Technologies } from '@/enum/Technologies'

defineProps<{
  promise: PackagePromise
  generateManual: boolean
  technology?: string
}>()

const { formatFilename } = useFiles()
</script>

<style lang="scss">
.custom-tooltip {
  opacity: 0.8 !important;
  background-color: rgb(var(--v-theme-oared)) !important;
  color: white !important;
  font-size: 18px !important;
  border-radius: 16px !important;
  padding: 10px 30px !important;
}

.warning-tooltip {
  background-color: rgb(var(--v-theme-warning)) !important;
}
.hover {
  cursor: pointer;
}
</style>
