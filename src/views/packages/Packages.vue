<template>
  <PackagesModal />
  <PackagesButtons />
  <PackagesList />
  <Pagination :page="page" v-on:newPage="nextPage" />
</template>

<script setup lang="ts">
import PackagesList from '@/components/packages/PackagesList.vue'
import Pagination from '@/components/common/Pagination.vue'
import { computed } from 'vue'
import { usePackagesStore } from '@/store/packages'
import PackagesModal from '@/components/packages/PackagesModal.vue'
import PackagesButtons from '@/components/packages/PackagesButtons.vue'

const package_store = usePackagesStore()

const page = computed(function () {
  return package_store.page
})

function nextPage(value: number) {
  package_store.setPage(value)
}
</script>