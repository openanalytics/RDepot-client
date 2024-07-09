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
  <v-app>
    <ProgressCircular />
    <router-view />
  </v-app>
</template>

<script setup lang="ts">
import ProgressCircular from './components/common/progress/ProgressCircular.vue'
import { onBeforeMount } from 'vue'
import { useTheme } from 'vuetify/lib/framework.mjs'
import { useAuthorizationStore } from './store/authorization'

onBeforeMount(() => {
  const theme = useTheme()
  theme.global.name.value =
    useAuthorizationStore().me.userSettings?.theme || 'dark'
})
</script>

<style lang="scss">
#tooltip-activator {
  z-index: 100;
}

.mdi-sort-ascending,
.mdi-sort-descending {
  color: rgb(var(--v-theme-oablue));
  margin-left: 2px;
  font-size: 1rem;
}
</style>
