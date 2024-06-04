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
  <ModalOverlay @action="performAction()">
    <template #props="{ closeModal }">
      <Creation
        v-if="commonStore.isCreate()"
        @close-modal="closeModal"
      />
      <Edit
        v-if="commonStore.isEdit()"
        @close-modal="closeModal"
      />
    </template>
  </ModalOverlay>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common'
import ModalOverlay from '@/components/common/overlay/ModalOverlay.vue'
import Creation from '@/components/repositories/CreateRepository.vue'
import { useRepositoryStore } from '@/store/repositories'
import Edit from './EditRepository.vue'

const repositoriesStore = useRepositoryStore()
const commonStore = useCommonStore()

async function performAction() {
  if (commonStore.isDelete()) {
    await repositoriesStore.softDelete()
  }
}
</script>
