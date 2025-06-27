<!--
 R Depot
 
 Copyright (C) 2012-2025 Open Analytics NV
 
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
  <div class="ml-auto pr-5 py-5">
    <v-btn
      id="save-changes"
      class="ml-6"
      color="primary"
      size="small"
      @click="saveSettings"
      >{{ $t('actions.general.save') }}</v-btn
    >
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/store/options/settings'
import { useAuthorizationStore } from '@/store/options/authorization'
import { UserSettingsProjection } from '@/openapi/models/user-settings-projection'
import { useTheme } from 'vuetify'
import { useCommonStore } from '@/store/options/common'
import langs from '@/locales/index'

const t = useI18n()
const theme = useTheme()
const commonStore = useCommonStore()

const authorizationStore = useAuthorizationStore()
const settingsStore = useSettingsStore()

async function saveSettings() {
  await authorizationStore.updateSettings(
    authorizationStore.getCurrentSettings(),
    settingsStore.newSettings as UserSettingsProjection
  )
  if (settingsStore.newSettings?.theme) {
    theme.global.name.value =
      settingsStore.newSettings.theme
    commonStore.updateThemeKey()
  }
  if (settingsStore.newSettings?.language) {
    t.locale.value = langs.filter(
      (x) => x.name === settingsStore.newSettings?.language
    )[0].abbreviation
  }
  settingsStore.saveChanges()
}
</script>
