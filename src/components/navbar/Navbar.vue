<template>
  <v-app-bar
    app
    color="oablue"
    dark
    class="navbar d-flex justify-space-between"
  >
    <div
      class="logo d-flex align-center mx-2 justify-start"
    >
      <v-img
        :src="require('@/assets/logo.png')"
        class="m-3"
        contain
        height="40"
        width="40"
      />
      <div class="logotext">RDepot</div>
    </div>
    <div class="d-flex justify-end">
      <ChangeLanguageVue class="mx-2" />
      <ChangeTheme class="mx-2" />
    </div>
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
    max-width: 300px;

    .logotext {
      margin: auto 1em;
      font-size: 1.25em;
      font-weight: 400;
    }
  }
}
</style>
