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
import { useTheme } from 'vuetify/lib/framework.mjs'
const theme = useTheme()
function changeTheme() {
  theme.global.name.value = theme.global.current.value.dark
    ? 'light'
    : 'dark'
  localStorage.setItem(
    'theme',
    theme.global.current.value.dark.toString()
  )
}
</script>
