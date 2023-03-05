<template>
  <div>
    <v-expansion-panels
      variant="inset"
      class="v-expansion mx-5"
    >
      <PackageMaintainersListTitle />
      <PackageMaintainerItem
        v-for="(item, index) in package_maintainers"
        :key="index"
        :packageMaintainer="item"
      />
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import { computed, onMounted } from 'vue'
import PackageMaintainersListTitle from '@/components/packageMaintainers/PackageMaintainersListTitle.vue'
import PackageMaintainerItem from '@/components/packageMaintainers/PackageMaintainerItem.vue'

const package_mainatainers_store =
  usePackageMaintainersStore()

const package_maintainers = computed(function () {
  return package_mainatainers_store.maintainers
})

function updateState(): void {
  package_mainatainers_store.fetchMaintainers()
  package_mainatainers_store.fetchReposiotires()
  package_mainatainers_store.fetchPackages()
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
