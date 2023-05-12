<template>
  <PackagesModal />
  <v-row class="my-3">
    <PackagesFiltrationChips />
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
import PackagesFiltrationChips from '@/components/packages/PackagesFiltrationChips.vue'
</script>
