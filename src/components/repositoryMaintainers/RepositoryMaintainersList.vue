<template>
  <div>
    <v-expansion-panels
      variant="inset"
      class="v-expansion mx-5"
    >
      <RepositoryMaintainersListTitle />
      <RepositoryMaintainerItem
        v-for="(item, index) in package_maintainers"
        :key="index"
        :repositoryMaintainer="item"
      />
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import RepositoryMaintainersListTitle from './RepositoryMaintainersListTitle.vue'
import RepositoryMaintainerItem from './RepositoryMaintainerItem.vue'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'

const repository_maintainers_store =
  useRepositoryMaintainersStore()

const package_maintainers = computed(function () {
  return repository_maintainers_store.maintainers
})

function updateState(): void {
  repository_maintainers_store.fetchMaintainers()
  repository_maintainers_store.fetchRepositories()
}

onMounted(() => {
  updateState()
})
</script>

<style>
.v-expansion {
  max-width: 96% !important;
}
</style>
