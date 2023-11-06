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
  <v-btn class="my-3" width="250">
    {{ props.fileName }}

    <v-menu open-on-hover activator="parent">
      <v-list>
        <v-list-item @click="openVignette" value="open">
          <template v-slot:prepend>
            <v-icon icon="mdi-open-in-new"></v-icon>
          </template>
          <v-list-item-title>{{
            i18n.t('packages.vignette.open')
          }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="downloadVignette"
          value="download"
        >
          <template v-slot:prepend>
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
import { usePackageDetailsStore } from '@/store/package_details'
import { i18n } from '@/plugins/i18n'

var props = defineProps<{
  fileName: string
}>()

const packageDetailsStore = usePackageDetailsStore()

const packageBag = computed(
  () =>
    packageDetailsStore.packageBag as EntityModelPythonPackageDto
)

async function openVignette() {
  if (packageBag.value.id && props.fileName) {
    await packageDetailsStore.openVignette(
      packageBag.value.id.toString(),
      props.fileName.split('.html')[0]
    )
  }
}

async function downloadVignette() {
  if (packageBag.value.id && props.fileName) {
    await packageDetailsStore.downloadVignette(
      packageBag.value.id.toString(),
      props.fileName.split('.html')[0]
    )
  }
}
</script>
