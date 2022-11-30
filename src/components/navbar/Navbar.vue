<template>
  <v-app-bar app color="oablue" dark class="navbar">
    <v-row justify="space-around" align="center">
      <v-row justify="start" class="mx-3">
        <v-img
          :src="require('@/assets/logo.png')"
          class="logo"
          contain
          height="40"
          width="40"
        />
        <p class="logotext">RDepot</p>
      </v-row>
      <v-row align="center" justify="end" class="my-0 mx-3">
        <ChangeLanguageVue />
        <ChangeTheme />
      </v-row>
    </v-row>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import ChangeLanguageVue from '@/components/navbar/ChangeLanguage.vue'
import ChangeTheme from '@/components/navbar/ChangeTheme.vue'

export default Vue.extend({
  name: 'Navbar',
  data: () => ({}),

  components: {
    ChangeLanguageVue,
    ChangeTheme
  }
})
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
