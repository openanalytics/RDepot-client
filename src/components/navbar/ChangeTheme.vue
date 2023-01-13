<template>
  <v-btn icon @click="toggleDarkMode">
    <v-icon color="text">mdi-theme-light-dark</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify/lib/framework.mjs';
const theme = useTheme()
  function toggleDarkMode() {
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
      console.log('after theme change ', theme)
      localStorage.setItem(
        'theme', theme.global.current.value.dark.toString()
      )
    }
</script>
