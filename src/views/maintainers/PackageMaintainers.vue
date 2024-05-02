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
            'packageMaintainers'
          )
        "
      />
    </div>
  </v-row>
  <FiltrationBar />
  <PackageMaintainersList :key="componentKey" />
</template>

<script setup lang="ts">
import MaintainersModal from '@/components/packageMaintainers/PackageMaintainersModal.vue'
import PackageMaintainersList from '@/components/packageMaintainers/PackageMaintainersList.vue'
import FiltrationBar from '@/components/packageMaintainers/FiltrationBar.vue'
import { computed } from 'vue'
import { useCommonStore } from '@/store/common'
import { useAuthorizationStore } from '@/store/authorization'
import AddMaintainerButton from '@/components/common/AddMaintainerButton.vue'

const commonStore = useCommonStore()
const componentKey = computed(() => {
  return commonStore.key
})

const authorizationStore = useAuthorizationStore()
</script>
