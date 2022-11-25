<template>
  <div>
    PACKAGE DETAILS
    <p>
      {{ name }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    name: String
  },
  data() {
    return {
      filtrationDialog: false
    }
  }
})
</script>

<style scoped lang="scss"></style>
