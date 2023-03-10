<template>
  <MaintainersModal />
  <FiltrationButtons />
  <PackageMaintainersList />
</template>

<script setup lang="ts">
import FiltrationButtons from '@/components/common/FiltrationButtons.vue'
import PackageMaintainersList from '@/components/packageMaintainers/PackageMaintainersList.vue'
import MaintainersModal from '@/components/packageMaintainers/PackageMaintainersModal.vue'
</script>
