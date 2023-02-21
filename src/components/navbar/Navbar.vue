<template>
  <v-app-bar app color="oared" dark class="navbar">
    <v-row justify="space-around" align="center">
      <v-row justify="start" align="center" class="ml-4">
        <v-app-bar-nav-icon
          v-show="mobile"
          color="oablue-darken-2"
          @click.stop="showSidebar"
        ></v-app-bar-nav-icon>

        <v-img
          src="@/assets/logo.png"
          class="ml-2 logo"
          contain
          height="40"
          width="40"
        />
        <p class="logotext">RDepot</p>
      </v-row>
      <v-row align="center" justify="end" class="my-0 mx-3">
        <ChangeLanguage class="mr-4" />
        <ChangeTheme class="mr-2 ml-3" />
      </v-row>
    </v-row>
  </v-app-bar>
</template>

<script setup lang="ts">
import ChangeLanguage from '@/components/navbar/ChangeLanguage.vue'
import ChangeTheme from '@/components/navbar/ChangeTheme.vue'
import { useCommonStore } from '@/store/common'
import { useDisplay } from 'vuetify/lib/framework.mjs'

const common_store = useCommonStore()
const { width, mobile } = useDisplay()

function showSidebar() {
  common_store.setDrawer(!common_store.drawer)
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
  }
}
</style>
