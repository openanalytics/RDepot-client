<template>
  <div>
    <v-app>
      <notifications group="rdepot" />
      <ProgressCircular />
      <Navbar />
      <div class="d-flex">
        <Sidebar style="flex: 40%" />
        <router-view class="mainApp"></router-view>
      </div>
    </v-app>
  </div>
</template>

<script lang="ts">
import Login from './views/users/Login.vue'
import Vue from 'vue'
import Navbar from '@/components/navbar/Navbar.vue'
import Keycloak from 'keycloak-js'
import HomeView from './views/HomeView.vue'
import ProgressCircular from './components/progress/ProgressCircular.vue'
import Sidebar from '@/components/navbar/Sidebar.vue'

export default Vue.extend({
  name: 'App',

  components: {
    Login,
    Navbar,
    HomeView,
    ProgressCircular,
    Sidebar
  },
  props: {
    keycloak: Keycloak
  },
  mounted() {
    document.addEventListener(
      'backbutton',
      this.goBack,
      false
    )
    const theme = localStorage.getItem('darkTheme')
    if (theme) {
      if (theme === 'true') {
        this.$vuetify.theme.dark = true
      } else {
        this.$vuetify.theme.dark = false
      }
    }
    {
      this.$vuetify.theme.dark = true
      localStorage.setItem(
        'darkTheme',
        this.$vuetify.theme.dark.toString()
      )
    }
  },

  computed: {},

  methods: {
    setUserInfo() {
      this.$vuetify.theme.dark = true
    },
    goBack() {
      console.log('here')
      this.$router.go(-1)
    }
  },

  created() {
    this.setUserInfo()
  }
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Cantarell:wght@400;700&display=swap');

div {
  font-size: 16px;
  font-family: 'Cantarell', sans-serif;

  @media only screen and (max-width: 700px) {
    font-size: 14px !important;
  }
}

.mainApp {
  margin-top: 80px;
}
</style>
