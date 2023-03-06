<template>
  <MaintainersModal />
  <MaintainersButtons />
  <RepositoryMaintainersList />
</template>

<script setup lang="ts">
import MaintainersButtons from '@/components/repositoryMaintainers/RepositoryMaintainersButtons.vue'
import RepositoryMaintainersList from '@/components/repositoryMaintainers/RepositoryMaintainersList.vue'
import MaintainersModal from '@/components/repositoryMaintainers/RepositoryMaintainersModal.vue'
</script>
