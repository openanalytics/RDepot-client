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
  <div class="ml-auto">
    <v-btn
      class="ml-6"
      color="oablue"
      @click="saveSettings"
      >{{ t('settings.save') }}</v-btn
    >
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/store/settings'
import { useAuthorizationStore } from '@/store/authorization'
import { useUtilities } from '@/composable/utilities'

const { t } = useI18n()
const { deepCopy } = useUtilities()

const authorizationStore = useAuthorizationStore()
const settingsStore = useSettingsStore()

function saveSettings() {
  const newSettings = deepCopy(
    authorizationStore.getCurrentSettings()
  )
  newSettings.pageSize = settingsStore.newPageSize
  authorizationStore.updateSettings(
    authorizationStore.getCurrentSettings(),
    newSettings
  )
  settingsStore.saveChanges()
}
</script>
