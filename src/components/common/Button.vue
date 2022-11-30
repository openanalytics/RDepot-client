<template>
  <v-btn color="oablue" dark dense @click="sendEvent">
    {{ title }}
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'clearForm',
  props: {
    title: String
  },
  methods: {
    sendEvent() {
      this.$emit('buttonClicked')
    }
  }
})
</script>
