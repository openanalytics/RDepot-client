<template>
  <MaintainersModal />
  <v-row class="my-3">
    <FiltrationChips
      :values="package_maintainers_store.filtration"
    />
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
import FiltrationChips from '@/components/packages/FiltrationChips.vue'
import { usePackageMaintainersStore } from '@/store/package_maintainers'

const package_maintainers_store =
  usePackageMaintainersStore()
</script>
