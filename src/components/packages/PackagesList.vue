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
  <ResourcesList
    :resources="packages_store.packages"
    expand
  >
    <template #title>
      <PackageRow title />
    </template>
    <template #expansion-row="slotProps">
      <PackageRow :packageBag="slotProps.resource" />
    </template>
    <template #expansion-text="slotProps">
      <template
        v-if="'R' == getTechnology(slotProps.resource)"
      >
        {{ getDescription(slotProps.resource) }}
      </template>
      <template
        v-if="'Python' == getTechnology(slotProps.resource)"
      >
        <MarkdownDescription
          :description="getDescription(slotProps.resource)"
          short_version
        ></MarkdownDescription>
      </template>
    </template>
  </ResourcesList>
</template>

<script setup lang="ts">
import { usePackagesStore } from '@/store/packages'
import PackageRow from '@/components/packages/PackageRow.vue'
import ResourcesList from '@/components/common/resources/ResourcesList.vue'
import { onBeforeMount } from 'vue'
import MarkdownDescription from '../common/MarkdownDescription.vue'

const packages_store = usePackagesStore()

function updateData(): void {
  packages_store.fetchPackages()
}

function getDescription(item: any): string {
  if (item.hasOwnProperty('description')) {
    return item['description']
  }
  return ''
}

function getTechnology(item: any): string {
  if (item.hasOwnProperty('technology')) {
    return item['technology']
  }
  return ''
}

onBeforeMount(() => {
  updateData()
})
</script>
