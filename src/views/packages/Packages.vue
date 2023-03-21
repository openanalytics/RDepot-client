<template>
  <PackagesModal />
  <FiltrationButtons />
  <PackagesList />
  <Pagination
    v-on:newPage="nextPage($event)"
    v-on:newPageSize="newPageSize($event)"
  />
</template>

<script setup lang="ts">
import PackagesList from '@/components/packages/PackagesList.vue'
import Pagination from '@/components/common/Pagination.vue'
import { computed } from 'vue'
import { usePackagesStore } from '@/store/packages'
import PackagesModal from '@/components/packages/PackagesModal.vue'
import FiltrationButtons from '@/components/common/FiltrationButtons.vue'
import { useCommonStore } from '@/store/common'

const package_store = usePackagesStore()
const common_store = useCommonStore()

const page = computed(function () {
  return package_store.page
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
