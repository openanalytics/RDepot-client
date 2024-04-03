<!--
 R Depot
 
 Copyright (C) 2012-2024 Open Analytics NV
 
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
  <MaintainersModal />
  <v-row class="my-3">
    <v-spacer />
    <div class="mr-12 pr-5">
      <AddMaintainerButton
        v-if="
          authorizationStore.can(
            'POST',
            'repositoryMaintainers'
          )
        "
      />
    </div>
  </v-row>
  <FiltrationBar />
  <RepositoryMaintainersList :key="componentKey" />
  <Pagination />
</template>

<script setup lang="ts">
import FiltrationBar from '@/components/repositoryMaintainers/FiltrationBar.vue'
import Pagination from '@/components/common/Pagination.vue'
import RepositoryMaintainersList from '@/components/repositoryMaintainers/RepositoryMaintainersList.vue'
import MaintainersModal from '@/components/repositoryMaintainers/RepositoryMaintainersModal.vue'
import { computed } from 'vue'
import { useCommonStore } from '@/store/common'
import { useAuthorizationStore } from '@/store/authorization'
import AddMaintainerButton from '@/components/common/AddMaintainerButton.vue'
import { useMeStore } from '@/store/userMe'

const commonStore = useCommonStore()
const componentKey = computed(() => {
  return commonStore.key
})
const authorizationStore = useMeStore()
</script>
