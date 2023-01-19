<template>
  <div>
    <v-expansion-panels
      inset
      class="v-expansion mt-8 mx-10"
    >
      <PackagesListTitle />
      <PackageItem
        v-for="(item, index) in packages"
        :key="index"
        :packageBag="item"
      />
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { usePackagesStore } from '@/store/packages'
import { computed, onMounted } from 'vue'
import PackageItem from './PackageItem.vue'
import PackagesListTitle from './PackagesListTitle.vue'

const packages_store = usePackagesStore()

const packages = computed(function () {
  return packages_store.packages
})

function updateState(): void {
  packages_store.fetchPackages()
}

onMounted(() => {
  updateState()
})
</script>

<style scoped>
.v-expansion {
  max-width: 96% !important;
}
</style>
