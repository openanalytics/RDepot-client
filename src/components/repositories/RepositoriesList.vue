<template>
  <div>
    <v-expansion-panels class="v-expansion mx-5">
      <RepositoriesListTitle />
      <RepositoryItem
        v-for="(item, index) in repositories"
        :key="index"
        :repository="item"
      />
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { useRepositoryStore } from '@/store/repositories'
import { computed, onMounted } from 'vue'
import RepositoriesListTitle from './RepositoriesListTitle.vue'
import RepositoryItem from './RepositoryItem.vue'

const repository_store = useRepositoryStore()

const repositories = computed(function () {
  return repository_store.repositories
})

function updateState(): void {
  repository_store.fetchRepositories()
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
