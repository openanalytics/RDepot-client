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
  <v-card flat>
    <v-card-text>
      <v-row>
        <v-col cols="2">
          <v-text-field
            id="page-size-input"
            v-model="currentSettings.pageSize"
            type="number"
            color="text"
            aria-valuemin="1"
            :label="$t('pagination.size')"
            @change="changedData"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-select
            id="language-input"
            v-model="currentSettings.language"
            :label="$t('settings.lang')"
            :items="languages"
            @update:model-value="changedData"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-select
            id="theme-input"
            v-model="currentSettings.theme"
            :label="$t('settings.theme')"
            :items="themes"
            @update:model-value="changedData"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer />
        <SaveChanges v-if="settingsStore.changes" />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import langs from '@/locales/index'
import { useSettingsStore } from '@/store/options/settings'
import { useAuthorizationStore } from '@/store/options/authorization'
import SaveChanges from '@/components/settings/SaveChangesButton.vue'

const { t } = useI18n()

const settingsStore = useSettingsStore()
const authorizationStore = useAuthorizationStore()

const currentSettings = ref(
  authorizationStore.getCurrentSettings()
)

const themes = computed(() => {
  return [
    { title: t('settings.themes.dark'), value: 'dark' },
    { title: t('settings.themes.light'), value: 'light' }
  ]
})

const languages = computed(() => {
  return langs.map((lang) => {
    return { title: lang.display, value: lang.name }
  })
})

function changedData() {
  settingsStore.changes = true
  settingsStore.newSettings = {
    pageSize: currentSettings.value.pageSize,
    language: currentSettings.value.language,
    theme: currentSettings.value.theme
  }
}
</script>
