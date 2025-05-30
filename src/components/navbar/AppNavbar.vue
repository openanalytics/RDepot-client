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
  <v-app-bar app color="oablue" dark class="navbar">
    <v-row justify="space-around" align="center">
      <v-row justify="start" align="center" class="ml-4">
        <v-app-bar-nav-icon
          v-show="mobile && currentRoute !== 'login'"
          color="oablue-darken-2"
          @click.stop="showSidebar"
        ></v-app-bar-nav-icon>

        <v-row
          v-ripple
          justify="start"
          align="center"
          class="ml-2 logo-container"
          @click="router.push({ name: 'packages' })"
        >
          <v-img
            src="@/assets/logo.png"
            class="ml-2 logo"
            contain
            height="40"
            width="40"
          />
          <div class="logotext">RDepot</div>
        </v-row>
      </v-row>
      <div class="d-flex align-center my-0 mx-12 ga-3">
        <ChangeLanguage />
        <ChangeTheme />
        <EventsNotifications
          v-show="router.currentRoute.value.name != 'login'"
        />
      </div>
    </v-row>
  </v-app-bar>
</template>

<script setup lang="ts">
import ChangeLanguage from '@/components/navbar/ChangeLanguage.vue'
import ChangeTheme from '@/components/navbar/ChangeTheme.vue'
import { useCommonStore } from '@/store/options/common'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import EventsNotifications from './EventsNotifications.vue'

const router = useRouter()
const commonStore = useCommonStore()
const { mobile } = useDisplay()

const currentRoute = computed(() => {
  return router.currentRoute.value.name
})

function showSidebar() {
  commonStore.drawer = !commonStore.drawer
}
</script>

<style scoped lang="scss">
.v-toolbar__content {
  width: 100% !important;
}
.navbar {
  width: 100%;
  height: auto !important;
  box-sizing: content-box;
  .logo {
    max-width: 40px;
  }
  .logotext {
    margin: auto 1em;
    font-size: 1.25em;
    font-weight: 400;
    color: rgb(var(--v-theme-headerText));
    font-weight: 500;
  }
}

.logo-container {
  cursor: pointer;
  max-width: 160px;
}
</style>
