<template>
  <div>
    <v-expansion-panels
      variant="inset"
      class="v-expansion mx-5"
    >
      <v-expansion-panel class="py-3">
        <PackageMaintainerRow title />
      </v-expansion-panel>
      <v-expansion-panel
        v-for="(item, index) in package_maintainers"
        :key="index"
      >
        <v-expansion-panel-title
          readonly
          id="expansionpaneltitle"
          class="no-icon"
        >
          <PackageMaintainerRow :packageMaintainer="item" />
        </v-expansion-panel-title>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import { computed, onMounted } from 'vue'
import PackageMaintainerRow from './PackageMaintainerRow.vue'

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
.v-expansion-panel-title__icon {
  display: none !important;
}
</style>
