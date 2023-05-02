<template>
  <MaintainersModal />
  <FiltrationButtons />
  <RepositoryMaintainersList />
  <Pagination />
</template>

<script setup lang="ts">
import FiltrationButtons from '@/components/common/FiltrationButtons.vue'
import Pagination from '@/components/common/Pagination.vue'
import RepositoryMaintainersList from '@/components/repositoryMaintainers/RepositoryMaintainersList.vue'
import MaintainersModal from '@/components/repositoryMaintainers/RepositoryMaintainersModal.vue'
</script>
