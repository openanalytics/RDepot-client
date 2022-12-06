<template>
  <div>
    <hello-world />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from '../components/HelloWorld.vue'

export default Vue.extend({
  name: 'Home',
  props: ['keycloak'],
  components: {
    HelloWorld,
  },

  mounted() {
  },

  methods: {
  }
})
</script>
