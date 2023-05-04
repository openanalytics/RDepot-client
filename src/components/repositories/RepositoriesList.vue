<template>
  <ResourcesList
    :resources="repository_store.repositories"
    :onClickAction="navigate"
  >
    <template #title>
      <RepositoryRow title />
    </template>
    <template #expansion-row="slotProps">
      <RepositoryRow :repository="slotProps.resource" />
    </template>
  </ResourcesList>
</template>

<script setup lang="ts">
import { EntityModelRRepositoryDto } from '@/openapi'
import router from '@/router'
import { useRepositoryStore } from '@/store/repositories'
import { onBeforeMount } from 'vue'
import RepositoryRow from '@/components/repositories/RepositoryRow.vue'
import ResourcesList from '@/components/common/resources/ResourcesList.vue'
import { usePackagesStore } from '@/store/packages'

const package_store = usePackagesStore()
const repository_store = useRepositoryStore()

function updateData(): void {
  repository_store.fetchRepositories()
}
function navigate(repository: EntityModelRRepositoryDto) {
  router.push({
    name: 'repositoryDetails',
    params: {
      name: repository.name
    }
  })
}

onBeforeMount(() => {
  updateData()
})
</script>
