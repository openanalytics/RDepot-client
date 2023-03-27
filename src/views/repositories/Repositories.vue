<template>
  <RepositoriesModal />
  <FiltrationButtons />
  <RepositoriesList />
  <Pagination />
</template>

<script setup lang="ts">
import RepositoriesModal from '@/components/repositories/RepositoriesModal.vue'
import RepositoriesList from '@/components/repositories/RepositoriesList.vue'
import FiltrationButtons from '@/components/common/FiltrationButtons.vue'
import Pagination from '@/components/common/Pagination.vue'
</script>
