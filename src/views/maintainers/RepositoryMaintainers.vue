<template>
  <MaintainersModal />
  <v-row class="my-3">
    <RepositoryMaintainersFiltrationChips />
    <FiltrationButtons />
  </v-row>
  <RepositoryMaintainersList />
  <Pagination />
</template>

<script setup lang="ts">
import FiltrationButtons from '@/components/common/FiltrationButtons.vue'
import Pagination from '@/components/common/Pagination.vue'
import RepositoryMaintainersFiltrationChips from '@/components/repositoryMaintainers/RepositoryMaintainersFiltrationChips.vue'
import RepositoryMaintainersList from '@/components/repositoryMaintainers/RepositoryMaintainersList.vue'
import MaintainersModal from '@/components/repositoryMaintainers/RepositoryMaintainersModal.vue'
</script>
