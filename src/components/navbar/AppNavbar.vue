<!--
 R Depot
 
 Copyright (C) 2012-2026 Open Analytics NV
 
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
  <v-app-bar
    id="navbar"
    app
    color="primary"
    dark
    class="navbar"
    :height="navbarHeight"
    elevation="0"
  >
    <v-row
      justify="space-around"
      align="center"
      no-gutters
      class="mx-7"
    >
      <div
        id="navbar-start"
        class="navbar-section d-flex align-center ga-3"
      >
        <v-app-bar-nav-icon
          v-show="mobile && currentRoute !== 'login'"
          color="primary-darken-2"
          @click.stop="showSidebar"
        ></v-app-bar-nav-icon>

        <div
          v-ripple
          justify="start"
          align="center"
          class="d-flex ga-2"
          @click="router.push({ name: 'packages' })"
        >
          <v-img
            v-if="logoUrl"
            :src="logoUrl"
            :class="logoClasses"
            contain
            :height="logoHeight"
            :width="logoWidth"
            :style="logoStyle"
          />
          <div class="logotext">{{ navbarTitle }}</div>
        </div>
      </div>
      <div
        id="navbar-center"
        class="navbar-section d-flex align-center justify-center ga-3"
      ></div>
      <div
        id="navbar-end"
        class="navbar-section d-flex align-center justify-end ga-3"
      >
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
import { useDisplay } from 'vuetify'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import EventsNotifications from './EventsNotifications.vue'
import getEnv from '@/utils/env'
import { NavbarReadyEvent } from '@/utils/NavbarReadyEvent'

const router = useRouter()
const commonStore = useCommonStore()
const { mobile } = useDisplay()

const currentRoute = computed(() => {
  return router.currentRoute.value.name
})

const navbarHeight = getEnv('VITE_NAVBAR_HEIGHT', '64')
const logoUrl = getEnv(
  'VITE_LOGO_SMALL_URL',
  '/images/logo.png'
)
const logoHeight = getEnv('VITE_LOGO_SMALL_HEIGHT', '64')
const logoWidth = getEnv('VITE_LOGO_SMALL_WIDTH', '64')
const logoClasses = getEnv('VITE_LOGO_SMALL_CLASSES')
const logoStyle = getEnv('VITE_LOGO_SMALL_STYLE')
const navbarTitle = getEnv('VITE_NAVBAR_TITLE', 'RDepot')

onMounted(() => {
  document.dispatchEvent(
    new NavbarReadyEvent({
      navbarId: 'navbar',
      navbarStartId: 'navbar-start',
      navbarCenterId: 'navbar-center',
      navbarEndId: 'navbar-end'
    })
  )
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
  box-sizing: content-box;

  .logotext {
    margin: auto;
    font-size: 1.25em;
    font-weight: 400;
    color: rgb(var(--v-theme-headerText));
    font-weight: 500;
  }
}

.navbar-section {
  flex: 1 1 0;
  min-width: 0;
}

.logo-container {
  cursor: pointer;
}
</style>
