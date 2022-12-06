<template>
  <div>
    <v-app>
      <notifications group="rdepot" />
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script lang="ts">
  import Login from './views/users/Login.vue'
  import Vue from 'vue'

  export default Vue.extend({
    name: 'App',

    components: {
      Login,
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