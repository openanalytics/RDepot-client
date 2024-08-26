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
  <v-btn
    v-tooltip:start="tooltip"
    class="my-3"
    style="min-width: 200px; width: 100%"
  >
    {{ formattedName }}

    <v-menu open-on-hover activator="parent">
      <v-list>
        <v-list-item value="open" @click="openVignette">
          <template #prepend>
            <v-icon icon="mdi-open-in-new"></v-icon>
          </template>
          <v-list-item-title>{{
            i18n.t('packages.vignette.open')
          }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          value="download"
          @click="downloadVignette"
        >
          <template #prepend>
            <v-icon icon="mdi-download"></v-icon>
          </template>
          <v-list-item-title>{{
            i18n.t('packages.vignette.download')
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { EntityModelPythonPackageDto } from '@/openapi'
import { usePackageDetailsStore } from '@/store/packageDetails'
import { i18n } from '@/plugins/i18n'
import { useFiles } from '@/composable/file'

const componentProps = defineProps<{
  fileName?: string
  title?: string
}>()

const packageDetailsStore = usePackageDetailsStore()

const packageBag = computed(
  () =>
    packageDetailsStore.packageBag as EntityModelPythonPackageDto
)

const { formatCutFilename } = useFiles()

const formattedName = computed(() => {
  return formatCutFilename(componentProps.fileName || '')
})

const tooltip = computed(() => {
  return {
    text: componentProps.fileName,
    'content-class': 'custom-tooltip',
    'max-width': '400'
  }
})

async function openVignette() {
  if (packageBag.value.id && componentProps.fileName) {
    await packageDetailsStore.openVignette(
      packageBag.value.id.toString(),
      componentProps.fileName
    )
  }
}

async function downloadVignette() {
  if (packageBag.value.id && componentProps.fileName) {
    await packageDetailsStore.getVignette(
      packageBag.value.id.toString(),
      componentProps.fileName
    )
  }
}
</script>
