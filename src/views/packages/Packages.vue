<template>
  <PackagesModal />
  <v-row class="my-3">
    <FiltrationChips :values="packages_store.filtration" />
    <FiltrationButtons />
  </v-row>
  <PackagesList />
  <Pagination />
</template>

<script setup lang="ts">
import PackagesList from '@/components/packages/PackagesList.vue'
import Pagination from '@/components/common/Pagination.vue'
import PackagesModal from '@/components/packages/PackagesModal.vue'
import FiltrationButtons from '@/components/common/FiltrationButtons.vue'
import FiltrationChips from '@/components/packages/FiltrationChips.vue'
import { usePackagesStore } from '@/store/packages'

const packages_store = usePackagesStore()
</script>
