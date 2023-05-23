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
import { usePackagesStore } from '@/store/packages'
import { useRepositoryStore } from '@/store/repositories'

const package_store = usePackagesStore()
const repositories_store = useRepositoryStore()

function getDescription(item: any) {
  if (item.hasOwnProperty('description')) {
    return item['description']
  }
  return null
}

function updateData(): void {
  package_store.fetchPackages({repository: repositories_store.chosenRepository.name, deleted: false })
}

onBeforeMount(() => {
  updateData()
})
</script>
