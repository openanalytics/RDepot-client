<template>
  <div>
    <hello-world />
    {{repositories}}
  </div>
</template>

<script lang="ts">
  import Keycloak from 'keycloak-js'
import Vue from 'vue'
  import HelloWorld from '../components/HelloWorld.vue'

  export default Vue.extend({
    name: 'Home',
    props: ['keycloak'],
    components: {
      HelloWorld,
    },

    mounted() {
      // this.updateState()
    },

    computed:{
      repositories() {
        // return this.$store.state.repositories.repositories
    },
  },

    methods: {
      updateState(): void{
        this.$store.dispatch('fetchRepositories');
      }
    }
  })
</script>
