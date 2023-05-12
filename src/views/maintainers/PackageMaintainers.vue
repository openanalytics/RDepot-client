<template>
  <MaintainersModal />
  <v-row class="my-3">
    <PackageMaintainersFiltrationChips />
    <FiltrationButtons />
  </v-row>
  <PackageMaintainersList />
  <Pagination />
</template>

<script setup lang="ts">
import FiltrationButtons from '@/components/common/FiltrationButtons.vue'
import PackageMaintainersList from '@/components/packageMaintainers/PackageMaintainersList.vue'
import MaintainersModal from '@/components/packageMaintainers/PackageMaintainersModal.vue'
import Pagination from '@/components/common/Pagination.vue'
import PackageMaintainersFiltrationChips from '@/components/packageMaintainers/PackageMaintainersFiltrationChips.vue'
</script>
