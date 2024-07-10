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
    class="my-3"
    style="min-width: 200px; width: 100%"
    @click="getSourceFile"
  >
    {{ $t('packages.downloadButton') }}
  </v-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { EntityModelPythonPackageDto } from '@/openapi'
import { usePackageDetailsStore } from '@/store/packageDetails'

const packageDetailsStore = usePackageDetailsStore()

const packageBag = computed(
  () =>
    packageDetailsStore.packageBag as EntityModelPythonPackageDto
)

async function getSourceFile() {
  if (
    packageBag.value.id &&
    packageBag.value.name &&
    packageBag.value.version &&
    packageBag.value.technology
  ) {
    await packageDetailsStore.downloadSourceFile(
      packageBag.value.id.toString(),
      packageBag.value.name,
      packageBag.value.version,
      packageBag.value.technology
    )
  }
}
</script>
