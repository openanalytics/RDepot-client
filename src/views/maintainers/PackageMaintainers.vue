<template>
  <RepositoriesModal />
  <RepositoriesButtons />
  <PackageMaintainersList />
</template>

<script setup lang="ts">
import RepositoriesModal from '@/components/repositories/RepositoriesModal.vue'
import RepositoriesButtons from '@/components/repositories/RepositoriesButtons.vue'
import PackageMaintainersList from '@/components/maintainers/PackageMaintainersList.vue'
</script>
