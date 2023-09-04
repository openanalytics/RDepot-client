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
  <ResourcesList :resources="packagesStore.packages" expand>
    <template #title>
      <PackageRow title />
    </template>
    <template #expansion-row="slotProps">
      <PackageRow :packageBag="slotProps.resource" />
    </template>
    <template #expansion-text="slotProps">
      {{ getDescription(slotProps.resource) }}
    </template>
  </ResourcesList>
</template>

<script setup lang="ts">
import { usePackagesStore } from '@/store/packages'
import PackageRow from '@/components/packages/PackageRow.vue'
import ResourcesList from '@/components/common/resources/ResourcesList.vue'
import { onBeforeMount } from 'vue'

const packagesStore = usePackagesStore()

function updateData(): void {
  packagesStore.fetchPackages()
}

function getDescription(item: any) {
  if (item.hasOwnProperty('description')) {
    return item['description']
  }
  return null
}

onBeforeMount(() => {
  updateData()
})
</script>
