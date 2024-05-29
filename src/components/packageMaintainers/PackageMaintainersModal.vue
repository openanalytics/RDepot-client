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
  <ModalOverlay @action="overlayEvent()">
    <template #props="{ closeModal }">
      <PackageMaintainerEdit
        v-if="commonStore.isEdit()"
        @close-modal="closeModal"
      />
      <PackageMaintainerCreate
        v-if="commonStore.isCreate()"
        @close-modal="closeModal"
      />
    </template>
  </ModalOverlay>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common'
import ModalOverlay from '@/components/common/overlay/ModalOverlay.vue'
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import PackageMaintainerEdit from '@/components/packageMaintainers/PackageMaintainerEdit.vue'
import PackageMaintainerCreate from '@/components/packageMaintainers/PackageMaintainerCreate.vue'

const maintainersStore = usePackageMaintainersStore()
const commonStore = useCommonStore()

async function overlayEvent() {
  if (commonStore.isReset()) {
    await maintainersStore.clearFiltrationAndFetch()
  } else if (commonStore.isDelete()) {
    maintainersStore.softDelete()
  }
}
</script>
