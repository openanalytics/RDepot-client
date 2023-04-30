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
      {{ getDescription(slotProps.resource) }}
    </template>
  </ResourcesList>
</template>

<script setup lang="ts">
import { usePackagesStore } from '@/store/packages'
import PackageRow from '@/components/packages/PackageRow.vue'
import ResourcesList from '@/components/common/resources/ResourcesList.vue'
import { onBeforeMount } from 'vue'

const packages_store = usePackagesStore()

function updateData(): void {
  packages_store.fetchPackages()
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
