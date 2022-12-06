<template>
  <div>
    <v-app>
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
    },

    computed:{
  },

    methods: {
    }
  })
</script>