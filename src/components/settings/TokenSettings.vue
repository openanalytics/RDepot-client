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
  <v-card flat>
    <v-card-title>
      <AddToken />
    </v-card-title>
    <v-card-text>
      <!-- TODO make table with tokens and possible actions - deactivate, delete -->
      <ResourcesList :resources="settingsStore.tokens">
        <template #title>
          <TokenRow title />
        </template>
        <template #expansion-row="slotProps">
          <TokenRow :submission="slotProps.resource" />
        </template>
      </ResourcesList>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import ResourcesList from '@/components/common/resources/ResourcesList.vue'
import TokenRow from '@/components/settings/TokenRow.vue'
import AddToken from '@/components/settings/AddToken.vue'
import { useSettingsStore } from '@/store/settings'

const settingsStore = useSettingsStore()

function updateData(): void {
  settingsStore.fetchTokens()
}

onBeforeMount(() => {
  updateData()
})
</script>
