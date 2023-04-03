<template>
  <ResourcesList
    :resources="repository_store.repositoryPackages"
    expand
  >
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
import ShortPackageRow from './ShortPackageRow.vue'
import ResourcesList from '@/components/common/ResourcesList.vue'
import { useRepositoryStore } from '@/store/repositories'
import { usePaginationStore } from '@/store/pagination'

const repository_store = useRepositoryStore()
const pagination = usePaginationStore()
pagination.setPage(0)

function getDescription(item: any) {
  if (item.hasOwnProperty('description')) {
    return item['description']
  }
  return null
}

function getFirstPage(): void {
  repository_store.fetchPackages()
}

onBeforeMount(() => {
  getFirstPage()
})
</script>
