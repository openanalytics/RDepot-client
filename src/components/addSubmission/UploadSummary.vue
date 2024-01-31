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
  <v-list-item id="submission-package">
    <template #title :color="getColor">
      {{ promise.packageBag.name }}
    </template>

    <template #prepend>
      <v-progress-circular
        indeterminate="disable-shrink"
        v-if="promise.state == 'pending'"
        model-value="20"
        class="mr-5"
      ></v-progress-circular>
      <v-icon
        v-if="promise.state == 'success'"
        size="large"
        color="green"
        id="submission-success-icon"
        icon="mdi-check-circle-outline"
      />
      <v-tooltip
        v-if="promise.state == 'error'"
        max-width="400"
        location="left"
        content-class="custom-tooltip"
      >
        <template #activator="{ props }">
          <v-icon
            color="red"
            v-bind="props"
            class="hover"
            size="large"
            id="submission-error-icon"
            icon="mdi-close-circle-outline"
          ></v-icon>
        </template>
        <div v-for="error in promise.error">
          {{ error }}
        </div>
      </v-tooltip>
    </template>

    <template #append v-if="technology != 'Python'">
      <v-btn
        v-if="
          !generateManual &&
          promise.error.length == 0 &&
          promise.response &&
          promise.response[0].id
        "
        icon="mdi-download"
        variant="text"
        id="download-manual-icon"
        @click="
          downloadManual(promise.response[0].id.toString())
        "
      ></v-btn>
      <v-btn
        v-if="!generateManual"
        disabled
        icon="mdi-checkbox-marked-outline"
        variant="text"
        id="generate-manual-icon-marked"
      ></v-btn>
      <v-btn
        v-else
        icon="mdi-checkbox-blank-outline"
        id="generate-manual-icon-blank"
        variant="text"
        disabled
      >
      </v-btn>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { PackagePromise } from '@/store/submission'
import { computed } from 'vue'
import { usePackagesStore } from '@/store/packages'

var props = defineProps<{
  promise: PackagePromise
  generateManual: boolean
  technology?: string
}>()

const packagesStore = usePackagesStore()

const getColor = computed(() => {
  return props.promise.state == 'success'
    ? 'green'
    : props.promise.state == 'error'
    ? 'red'
    : 'primary'
})

function downloadManual(id: string) {
  packagesStore.downloadManual(id)
}
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

.hover {
  cursor: pointer;
}
</style>
