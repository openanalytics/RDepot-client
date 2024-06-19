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
  <template
    v-for="({ translation, value }, idx) in details"
    :key="idx"
  >
    <Property
      :title="$t(translation)"
      :value="value || 'not provided'"
      :collapsible="false"
      showDivider
    />
  </template>
</template>

<script setup lang="ts">
import { EntityModelRPackageDto } from '@/openapi'
import { computed } from 'vue'
import { usePackageDetailsStore } from '@/store/package_details'
import Property from '@/components/packages/packageDetails/PackageProperty.vue'

const packageDetailsStore = usePackageDetailsStore()

const packageBag = computed<EntityModelRPackageDto>(
  () =>
    packageDetailsStore.packageBag as EntityModelRPackageDto
)

const details = computed(() => {
  return [
    {
      translation: 'packages.version',
      value: packageBag.value.version
    },
    {
      translation: 'packages.systemRequirements',
      value: packageBag.value.systemRequirements
    },
    {
      translation: 'packages.license',
      value: packageBag.value.license
    },
    {
      translation: 'packages.url',
      value: packageBag.value.url
    }
  ]
})
</script>
