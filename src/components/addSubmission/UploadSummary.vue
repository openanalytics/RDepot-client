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
        icon="mdi-check-circle-outline"
      />
      <v-icon
        v-if="promise.state == 'error'"
        id="submission-error-icon"
        v-tooltip:left="tooltipError"
        color="red"
        class="hover"
        size="large"
        icon="mdi-close-circle-outline"
      ></v-icon>
      <v-icon
        v-if="promise.state == 'warning'"
        id="submission-success-icon"
        v-tooltip:left="tooltipWarning"
        size="large"
        color="warning"
        icon="mdi-check-circle-outline"
        class="hover"
      ></v-icon>
    </template>

    <template v-if="technology != 'Python'" #append>
      <v-btn
        v-if="
          !generateManual &&
          promise.error.length == 0 &&
          promise.response &&
          promise.response[0].id
        "
        id="download-manual-icon"
        icon="mdi-download"
        variant="text"
        @click="
          promise &&
          promise.response &&
          promise.response[0].id
            ? downloadManual(
                promise.response[0].id.toString(),
                `${promise.response[0].packageBag?.name}_${promise.response[0].packageBag?.version}_manual`
              )
            : null
        "
      ></v-btn>
      <v-btn
        v-if="!generateManual"
        id="generate-manual-icon-marked"
        disabled
        icon="mdi-checkbox-marked-outline"
        variant="text"
      ></v-btn>
      <v-btn
        v-else
        id="generate-manual-icon-blank"
        icon="mdi-checkbox-blank-outline"
        variant="text"
        disabled
      >
      </v-btn>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { PackagePromise } from '@/store/submission'
import { usePackagesStore } from '@/store/packages'
import { useFiles } from '@/composable/file'
import { computed } from 'vue'
import { i18n } from '@/plugins/i18n'

const componentProps = defineProps<{
  promise: PackagePromise
  generateManual: boolean
  technology?: string
}>()

const packagesStore = usePackagesStore()

const { formatFilename } = useFiles()

const tooltipWarning = computed(() => {
  return {
    text: i18n.t('submissions.replace.duplication'),
    'content-class': 'custom-tooltip warning-tooltip',
    'max-width': '400'
  }
})

const tooltipError = computed(() => {
  return {
    text: componentProps.promise.error.join('\n'),
    'content-class': 'custom-tooltip',
    'max-width': '400'
  }
})

function downloadManual(id: string, fileName: string) {
  packagesStore.getManual(id, fileName)
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

.warning-tooltip {
  background-color: rgb(var(--v-theme-warning)) !important;
}
.hover {
  cursor: pointer;
}
</style>
