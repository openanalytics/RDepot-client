<template>
  <div>
    <v-app>
      <notifications group="rdepot" />
      <Navbar/>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script lang="ts">
  import Login from './views/users/Login.vue'
  import Vue from 'vue'
import Navbar from '@/components/navbar/Navbar.vue';

  export default Vue.extend({
    name: 'App',

    components: {
    Login,
    Navbar,
},

    mounted() {
      const theme = localStorage.getItem("darkTheme");
      if (theme) {
          if (theme === "true") {
              this.$vuetify.theme.dark = true;
          } else {
              this.$vuetify.theme.dark = false;
          }
      } {
          this.$vuetify.theme.dark = true;
          localStorage.setItem(
              "darkTheme",
              this.$vuetify.theme.dark.toString()
          );
      }
    },

    computed:{
  },

    methods: {
      
      setUserInfo(){
        this.$vuetify.theme.dark = true;
      },
    },

    created(){
      this.setUserInfo();
    }
  })
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Cantarell:wght@400;700&display=swap');

  div{
    font-size: 16px;
    font-family: 'Cantarell', sans-serif;

    @media only screen and (max-width: 700px) {
      font-size: 14px !important;
}
  }
</style>