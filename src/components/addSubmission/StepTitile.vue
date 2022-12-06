<template>
  <v-stepper-step
    :complete="e1 > step"
    :step="step"
    color="oablue"
  >
    {{ title }}
  </v-stepper-step>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    step: Number,
    title: String,
    e1: Number
  }
})
</script>

<style lang="scss">
span {
  font-size: 1.25em !important;
}
span.v-stepper__step__step {
  padding: 15px !important;
}
.v-stepper__label {
  font-size: 1.125em;
}
</style>