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
  <div>
    <v-icon
      id="change-theme-icon"
      :key="commonStore.themeKey"
      v-tooltip="$t('settings.changeTheme')"
      :icon="
        getTheme
          ? Icons.get('light-theme')
          : Icons.get('dark-theme')
      "
      color="text"
      @click="changeTheme"
    />
  </div>
</template>

<script setup lang="ts">
import Icons from '@/maps/Icons'
import { useAuthorizationStore } from '@/store/options/authorization'
import { useCommonStore } from '@/store/options/common'
import { onUpdated, computed } from 'vue'
import { useTheme } from 'vuetify/lib/framework.mjs'

const theme = useTheme()
const commonStore = useCommonStore()
const authorizationStore = useAuthorizationStore()

async function changeTheme() {
  const new_theme = theme.global.current.value.dark
    ? 'light'
    : 'dark'

  theme.global.name.value = new_theme
  var new_settings = authorizationStore.getCurrentSettings()
  new_settings.theme = new_theme
  if (await authorizationStore.isUserLoggedIn()) {
    await authorizationStore.updateSettings(
      authorizationStore.getCurrentSettings(),
      new_settings
    )
  }
  commonStore.updateThemeKey()
}

const getTheme = computed(() => {
  return theme.global.current.value.dark
})

onUpdated(() => {
  if (authorizationStore.me.userSettings?.theme)
    theme.global.name.value =
      authorizationStore.me.userSettings.theme
})
</script>
