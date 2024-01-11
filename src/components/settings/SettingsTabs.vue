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
  <v-card>
    <div class="d-flex flex-row">
      <v-tabs
        v-model="tab"
        direction="vertical"
        color="oablue"
      >
        <v-tab>
          <v-icon start icon="mdi-key-variant" />
          {{ t('settings.tab.token') }}
        </v-tab>
        <v-tab>
          <v-icon start icon="mdi-table" />
          {{ t('settings.tab.table') }}
        </v-tab>
      </v-tabs>
      <v-window v-model="tab" style="width: 100%">
        <v-window-item>
          <TokenSettings />
        </v-window-item>
        <v-window-item>
          <TableSettings />
        </v-window-item>
      </v-window>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import TableSettings from '@/components/settings/TableSettings.vue'
import TokenSettings from '@/components/settings/TokenSettings.vue'
import { useSettingsStore } from '@/store/settings'

const { t } = useI18n()
const tab = ref(0)
const settingsStore = useSettingsStore()

function updateData() {
  settingsStore.fetchSettings()
}

onBeforeMount(() => {
  updateData()
})
</script>
