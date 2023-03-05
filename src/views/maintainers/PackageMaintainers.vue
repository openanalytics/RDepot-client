<template>
  <MaintainersModal />
  <MaintainersButtons />
  <PackageMaintainersList />
</template>

<script setup lang="ts">
import MaintainersButtons from '@/components/packageMaintainers/PackageMaintainersButtons.vue'
import PackageMaintainersList from '@/components/packageMaintainers/PackageMaintainersList.vue'
import MaintainersModal from '@/components/packageMaintainers/PackageMaintainersModal.vue'
</script>
