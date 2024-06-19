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
  <div
    v-if="
      packageDetailsStore.packageBag?.technology ==
      Technologies.enum.R
    "
    class="document"
    @click="getManual"
  >
    <v-btn
      class="my-3"
      style="min-width: 200px; width: 100%"
    >
      {{ $t('packages.referenceManual') }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { Technologies } from '@/enum/Technologies'
import { usePackageDetailsStore } from '@/store/package_details'

const packageDetailsStore = usePackageDetailsStore()

async function getManual() {
  if (
    packageDetailsStore.packageBag &&
    packageDetailsStore.packageBag.id
  ) {
    await packageDetailsStore.downloadManual(
      packageDetailsStore.packageBag.id.toString(),
      `${packageDetailsStore.packageBag.name}_${packageDetailsStore.packageBag.version}_manual`
    )
  }
}
</script>
