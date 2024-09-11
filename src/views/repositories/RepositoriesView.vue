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
  <DeleteRepositoryModal v-if="commonStore.isDelete" />
  <CreateRepositoryModal v-if="commonStore.isCreate" />
  <EditRepositoryModal v-if="commonStore.isEdit" />
  <FiltrationBar />
  <RepositoriesList :key="componentKey" />
</template>

<script setup lang="ts">
import RepositoriesList from '@/components/repositories/RepositoriesList.vue'
import FiltrationBar from '@/components/repositories/FiltrationBar.vue'
import { computed } from 'vue'
import { useCommonStore } from '@/store/options/common'
import DeleteRepositoryModal from '@/components/repositories/modals/DeleteRepositoryModal.vue'
import CreateRepositoryModal from '@/components/repositories/modals/CreateRepositoryModal.vue'
import EditRepositoryModal from '@/components/repositories/modals/EditRepositoryModal.vue'

const commonStore = useCommonStore()
const componentKey = computed(() => {
  return commonStore.key
})
</script>
