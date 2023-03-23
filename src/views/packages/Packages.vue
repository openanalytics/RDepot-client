<template>
  <PackagesModal />
  <FiltrationButtons />
  <PackagesList />
  <Pagination
    :howManyPages="howManyPages"
    :pageSize="pageSize"
    :page="page"
    v-on:newPage="nextPage($event)"
    v-on:newPageSize="newPageSize($event)"
  />
</template>

<script setup lang="ts">
import PackagesList from '@/components/packages/PackagesList.vue'
import Pagination from '@/components/common/Pagination.vue'
import PackagesModal from '@/components/packages/PackagesModal.vue'
import FiltrationButtons from '@/components/common/FiltrationButtons.vue'
import { computed } from 'vue'
import { useCommonStore } from '@/store/common'
import { usePackagesStore } from '@/store/packages'

const package_store = usePackagesStore()
const common_store = useCommonStore()

const pageSize = computed(() => {
  return package_store.pageSize
})

const page = computed({
  get: () => {
    if (package_store.page) return package_store.page + 1
  },
  set: (value) => {
    if (value) nextPage(value - 1)
  }
})

const howManyPages = computed(function () {
  if (package_store.totalNumber && package_store.pageSize) {
    return Math.ceil(
      package_store.totalNumber / package_store.pageSize
    )
  }
})

function nextPage(value: number) {
  package_store.setPage(value)
  common_store.updateKey()
}

function newPageSize(value: number) {
  package_store.setPageSize(value)
  common_store.updateKey()
}
</script>
