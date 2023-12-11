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
  <Overlay @action="performAction()">
    <template #props="{ closeModal }">
      <Filtration
        v-if="commonStore.isFiltration()"
        @closeModal="closeModal"
      />
      <RepositoryMaintainerEdit
        v-if="commonStore.isEdit()"
        :blocked-field="editBlockedField"
        @closeModal="closeModal"
      />
    </template>
  </Overlay>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common'
import Overlay from '@/components/common/Overlay.vue'
import Filtration from '@/components/repositoryMaintainers/Filtration.vue'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'
import RepositoryMaintainerEdit from '@/components/repositoryMaintainers/RepositoryMaintainerEdit.vue'

const maintainersStore = useRepositoryMaintainersStore()
const commonStore = useCommonStore()

const props = defineProps({
  editBlockedField: {
    required: false,
    default: 'user',
    type: String
  }
})

async function performAction() {
  if (commonStore.isFiltration()) {
    await maintainersStore.clearFiltrationAndFetch()
  } else if (commonStore.isDelete()) {
    await maintainersStore.softDelete()
  }
}
</script>
