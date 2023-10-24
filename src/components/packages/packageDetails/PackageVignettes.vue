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
  <div class="title" v-if="vignettes">
    {{ $t('packages.documentation') }}
  </div>
  <PackageVignette
    v-for="(vignette, index) in vignettes"
    :key="index"
    :fileName="vignette?.fileName"
    :title="vignette?.title"
  >
  </PackageVignette>
  <div v-show="vignettes?.data?.length == 0">
    {{ $t('packages.noVignette') }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ResponseDtoListVignette } from '@/openapi'
import { usePackageDetailsStore } from '@/store/package_details'
import PackageVignette from '@/components/packages/packageDetails/PackageVignette.vue'

const packageDetailsStore = usePackageDetailsStore()

const vignettes = computed<
  ResponseDtoListVignette | undefined
>(() => {
  return packageDetailsStore.vignettes
})
</script>
