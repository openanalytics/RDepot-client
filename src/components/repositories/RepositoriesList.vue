<template>
  <v-expansion-panels
    variant="inset"
    class="v-expansion mx-5"
  >
    <v-expansion-panel class="py-3">
      <repository-row :title="true" />
    </v-expansion-panel>
    <EmptyListing
      v-show="
        repositories === undefined || !repositories.length
      "
    />
    <v-expansion-panel
      class="px-5"
      v-for="(item, index) in repositories"
      :key="index"
    >
      <v-expansion-panel-title
        @click="navigate(item)"
        readonly
        id="expansion-panel-title"
        class="no-icon"
      >
        <RepositoryRow :repository="item" />
      </v-expansion-panel-title>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { EntityModelRRepositoryDto } from '@/openapi'
import router from '@/router'
import { useRepositoryStore } from '@/store/repositories'
import { computed, onBeforeMount } from 'vue'
import RepositoryRow from './RepositoryRow.vue'
import EmptyListing from '@/components/common/EmptyListing.vue'

const repository_store = useRepositoryStore()

const repositories = computed(function () {
  return repository_store.repositories
})

function updateState(): void {
  repository_store.fetchRepositories()
}
function navigate(repository: EntityModelRRepositoryDto) {
  router.replace({
    name: 'repositoryDetails',
    params: {
      name: repository.name
    }
  })
}

onBeforeMount(() => {
  updateState()
})
</script>

<style lang="scss">
.v-expansion {
  max-width: 96% !important;
}
.v-expansion {
  max-width: 96% !important;
}

.content {
  text-align: justify;
  font-size: 14px;
  padding: 0 40px 0 0;
}

.v-expansion-panel-title__icon {
  display: none !important;
}

.v-expansion-panel-title {
  padding: 0 !important;
}

.v-col {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.v-input__details {
  display: none !important;
}
</style>
