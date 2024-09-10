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
  <ModalOverlay
    id="delete-packages-modal"
    @action="performAction()"
  >
    <template #desc>
      <v-virtual-scroll
        :max-height="300"
        :items="packagesStore.packagesToDelete"
      >
        <template #default="{ item }">
          <v-list-item
            :title="`${item.name} v.${item.version}`"
            :subtitle="item.repository?.name"
          >
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </template>
  </ModalOverlay>
</template>

<script setup lang="ts">
import ModalOverlay from '@/components/common/overlay/ModalOverlay.vue'
import { usePackagesStore } from '@/store/options/packages'

const packagesStore = usePackagesStore()

async function performAction() {
  await packagesStore.deletePackages()
}
</script>
