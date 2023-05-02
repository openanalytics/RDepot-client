<template>
  <RepositoriesModal />
  <FiltrationButtons>
    <template v-slot:prepend
      ><AddButton
        v-if="logged_user_store.can('POST', 'repository')"
    /></template>
  </FiltrationButtons>
  <RepositoriesList />
  <Pagination />
</template>

<script setup lang="ts">
import RepositoriesModal from '@/components/repositories/RepositoriesModal.vue'
import RepositoriesList from '@/components/repositories/RepositoriesList.vue'
import FiltrationButtons from '@/components/common/FiltrationButtons.vue'
import AddButton from '@/components/common/AddButton.vue'
import Pagination from '@/components/common/Pagination.vue'
import { useLoggedUserStore } from '@/store/logged_user'

const logged_user_store = useLoggedUserStore()
</script>
