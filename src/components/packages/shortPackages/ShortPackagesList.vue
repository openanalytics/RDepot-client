<template>
  <div>
    <v-expansion-panels
      variant="inset"
      class="v-expansion mx-5"
    >
      <ShortPackagesListTitle />
      <ShortPackageItem
        v-for="(item, index) in packages"
        :key="index"
        :packageBag="item"
      />
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { useRepositoryStore } from '@/store/repositories'
import { computed, onMounted } from 'vue'
import ShortPackageItem from '@/components/packages/shortPackages/ShortPackageItem.vue'
import ShortPackagesListTitle from '@/components/packages/shortPackages/ShortPackagesListTitle.vue'

const repository_store = useRepositoryStore()

const packages = computed(function () {
  return repository_store.repositoryPackages
})

function updateState(): void {
  repository_store.fetchPackages()
}

onMounted(() => {
  updateState()
})
</script>

<style>
.v-expansion {
  max-width: 96% !important;
}

/* .v-checkbox .v-selection-control {
    min-height: auto !important;
  } */
</style>
