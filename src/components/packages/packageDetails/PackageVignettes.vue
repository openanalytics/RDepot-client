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
  <div v-if="packageDetailsStore.vignettes">
    <div
      v-if="packageDetailsStore.vignettes.length > 0"
      class="title"
    >
      {{ $t('packages.documentation') }}
    </div>
    <PackageVignette
      v-for="(
        vignette, index
      ) in packageDetailsStore.vignettes"
      :key="index"
      :file-name="vignette.fileName"
      :title="vignette.title"
      class="d-flex flex-column"
    >
    </PackageVignette>
    <div v-show="packageDetailsStore.vignettes.length == 0">
      {{ $t('packages.noVignette') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePackageDetailsStore } from '@/store/options/packageDetails'
import PackageVignette from '@/components/packages/packageDetails/PackageVignette.vue'

const packageDetailsStore = usePackageDetailsStore()
</script>
