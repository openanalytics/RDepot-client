<template>
  <div>
    <v-expansion-panels
      variant="inset"
      class="v-expansion mx-5"
    >
      <v-expansion-panel class="py-3">
        <RepositoryMaintainerRow title />
      </v-expansion-panel>
      <EmptyListing
        v-show="
          repository_maintainers === undefined ||
          !repository_maintainers.length
        "
      />
      <v-expansion-panel
        v-for="(item, index) in repository_maintainers"
        :key="index"
      >
        <v-expansion-panel-title
          readonly
          id="expansionpaneltitle"
          class="no-icon"
        >
          <RepositoryMaintainerRow
            :repositoryMaintainer="item"
          />
        </v-expansion-panel-title>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'
import RepositoryMaintainerRow from './RepositoryMaintainerRow.vue'
import EmptyListing from '@/components/common/EmptyListing.vue'

const repository_maintainers_store =
  useRepositoryMaintainersStore()

const repository_maintainers = computed(function () {
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
.v-expansion-panel-title__icon {
  display: none !important;
}
</style>
