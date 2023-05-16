<template>
  <MaintainersModal />
  <v-row class="my-3">
    <FiltrationChips
      :store="repository_maintainers_store"
    />
    <FiltrationButtons />
  </v-row>
  <RepositoryMaintainersList />
  <Pagination />
</template>

<script setup lang="ts">
import FiltrationButtons from '@/components/common/FiltrationButtons.vue'
import Pagination from '@/components/common/Pagination.vue'
import FiltrationChips from '@/components/common/chips/FiltrationChips.vue'
import RepositoryMaintainersList from '@/components/repositoryMaintainers/RepositoryMaintainersList.vue'
import MaintainersModal from '@/components/repositoryMaintainers/RepositoryMaintainersModal.vue'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'

const repository_maintainers_store =
  useRepositoryMaintainersStore()
</script>
