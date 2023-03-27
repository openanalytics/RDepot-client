<template>
  <RepositoriesModal />
  <FiltrationButtons />
  <RepositoriesList />
  <Pagination
    :howManyPages="howManyPages"
    :pageSize="pageSize"
    :page="page"
    v-on:newPage="nextPage($event)"
    v-on:newPageSize="newPageSize($event)"
  />
</template>

<script setup lang="ts">
import RepositoriesModal from '@/components/repositories/RepositoriesModal.vue'
import RepositoriesList from '@/components/repositories/RepositoriesList.vue'
import FiltrationButtons from '@/components/common/FiltrationButtons.vue'
import Pagination from '@/components/common/Pagination.vue'
import { useCommonStore } from '@/store/common'
import { computed } from 'vue'
import { useRepositoryStore } from '@/store/repositories'

const common_store = useCommonStore()
const repository_store = useRepositoryStore()

const pageSize = computed(() => {
  return repository_store.pageSize
})

const page = computed({
  get: () => {
    if (repository_store.page)
      return repository_store.page + 1
  },
  set: (value) => {
    if (value) nextPage(value - 1)
  }
})

const howManyPages = computed(function () {
  if (
    repository_store.totalNumber &&
    repository_store.pageSize
  ) {
    return Math.ceil(
      repository_store.totalNumber /
        repository_store.pageSize
    )
  }
})

function nextPage(value: number) {
  repository_store.setPage(value)
  common_store.updateKey()
}

function newPageSize(value: number) {
  repository_store.setPageSize(value)
  common_store.updateKey()
}
</script>
