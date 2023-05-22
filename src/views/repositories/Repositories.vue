<!--
 R Depot
 
 Copyright (C) 2012-2023 Open Analytics NV
 
 ===========================================================================
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the Apache License as published by
 The Apache Software Foundation, either version 2 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 Apache License for more details.
 
 You should have received a copy of the Apache License
 along with this program. If not, see <http://www.apache.org/licenses/>
 
-->

<template>
  <RepositoriesModal />
  <v-row class="my-3">
    <FiltrationChips :store="repositories_store" />
    <FiltrationButtons>
      <template v-slot:prepend
        ><AddButton
          v-if="
            logged_user_store.can('POST', 'repository')
          "
      /></template>
    </FiltrationButtons>
  </v-row>
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
import { useRepositoryStore } from '@/store/repositories'
import FiltrationChips from '@/components/common/chips/FiltrationChips.vue'

const logged_user_store = useLoggedUserStore()
const repositories_store = useRepositoryStore()
</script>
