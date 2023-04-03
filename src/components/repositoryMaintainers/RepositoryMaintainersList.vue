<template>
  <ResourcesList
    :resources="repository_maintainers_store.maintainers"
  >
    <template #title>
      <RepositoryMaintainerRow title />
    </template>
    <template #expansion-row="slotProps">
      <RepositoryMaintainerRow
        :repositoryMaintainer="slotProps.resource"
      />
    </template>
  </ResourcesList>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'
import RepositoryMaintainerRow from '@/components/repositoryMaintainers/RepositoryMaintainerRow.vue'
import ResourcesList from '../common/ResourcesList.vue'

const repository_maintainers_store =
  useRepositoryMaintainersStore()

function updateData(): void {
  repository_maintainers_store.fetchMaintainers()
}

onBeforeMount(() => {
  updateData()
})
</script>