<template>
  <div>
    <v-app>
      <notifications group="rdepot" />
      <ProgressCircular />
      <Navbar />
      <router-view class="mainApp"></router-view>
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

export default Vue.extend({
  name: 'App',

  components: {
    Login,
    Navbar,
    HomeView,
    ProgressCircular
  },
  props: {
    keycloak: Object as () => Keycloak
  },
  mounted() {
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
  .app {
    margin-top: 100px;
  }

  @media only screen and (max-width: 700px) {
    font-size: 14px !important;
  }
}

.mainApp {
  margin-top: 80px;
}
</style>
