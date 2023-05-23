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

const repository_store = useRepositoryStore()

function updateData(): void {
  repository_store.fetchRepositories()
}
function navigate(repository: EntityModelRRepositoryDto) {
  repository_store.setChosenRepository(repository.id)
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
