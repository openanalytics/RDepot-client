<template>
  <ResourcesList :resources="package_store.packages" expand>
    <template #title>
      <ShortPackageRow title />
    </template>
    <template #expansion-row="slotProps">
      <ShortPackageRow :packageBag="slotProps.resource" />
    </template>
    <template #expansion-text="slotProps">
      {{ getDescription(slotProps.resource) }}
    </template>
  </ResourcesList>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import ShortPackageRow from '@/components/packages/shortPackages/ShortPackageRow.vue'
import ResourcesList from '@/components/common/resources/ResourcesList.vue'
import { usePaginationStore } from '@/store/pagination'
import { usePackagesStore } from '@/store/packages'

const package_store = usePackagesStore()
const pagination = usePaginationStore()
pagination.setPage(0)

function getDescription(item: any) {
  if (item.hasOwnProperty('description')) {
    return item['description']
  }
  return null
}

function getFirstPage(): void {
  package_store.fetchPackages()
}

onBeforeMount(() => {
  getFirstPage()
})
</script>
