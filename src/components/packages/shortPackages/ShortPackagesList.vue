<template>
  <div>
    <v-expansion-panels
      variant="inset"
      class="v-expansion mx-5"
    >
      <v-expansion-panel>
        <ShortPackageRow :title="true" />
      </v-expansion-panel>
      <v-expansion-panel
        v-for="(item, index) in packages"
        :key="index"
        id="shortpackagelist"
      >
        <v-expansion-panel-title
          id="expansionpaneltitle"
          class="no-icon"
        >
          <ShortPackageRow :packageBag="item" />
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div class="content mt-2">
            {{ item.description }}
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { useRepositoryStore } from '@/store/repositories'
import { computed, onMounted } from 'vue'
import ShortPackageRow from './ShortPackageRow.vue'

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
</style>
