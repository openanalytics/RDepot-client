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
  <v-btn class="my-3" width="250" @click="getVignette">
    {{ props.title }}
  </v-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { EntityModelPythonPackageDto } from '@/openapi'
import { usePackageDetailsStore } from '@/store/package_details'

var props = defineProps<{
  fileName?: string
  title?: string
}>()

const packageDetailsStore = usePackageDetailsStore()

const packageBag = computed(
  () =>
    packageDetailsStore.packageBag as EntityModelPythonPackageDto
)

async function getVignette() {
  if (packageBag.value.id && props.fileName) {
    await packageDetailsStore.downloadVignette(
      packageBag.value.id.toString(),
      props.fileName.split('.html')[0]
    )
  }
}
</script>
