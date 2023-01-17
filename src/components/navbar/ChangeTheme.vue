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
