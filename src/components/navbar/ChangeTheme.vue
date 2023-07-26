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
  <v-btn icon @click="changeTheme">
    <v-icon color="text">mdi-theme-light-dark</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { useUtilities } from '@/composable/utilities'
import { useLoggedUserStore } from '@/store/logged_user'
import { useTheme } from 'vuetify/lib/framework.mjs'

const theme = useTheme()
const logged_user_store = useLoggedUserStore()
const { deepCopy } = useUtilities()

const changeTheme = () => {
  const new_theme = theme.global.current.value.dark
    ? 'light'
    : 'dark'

  theme.global.name.value = new_theme
  var new_settings = logged_user_store.getCurrentSettings()
  new_settings.theme = new_theme
  logged_user_store.updateSettings(
    logged_user_store.getCurrentSettings(),
    new_settings
  )
}
</script>
