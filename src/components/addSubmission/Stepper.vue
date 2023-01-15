<template>
  <div style="max-width: 800px !important; width: 100%">
    <StepTtile :e1="e1" />
    <v-window
      v-model="e1"
      class="stepper mx-10"
      direction="vertical"
    >
      <StepFirst v-on:next="changeValue" />
      <StepSecond v-on:next="changeValue" />
      <StepThird v-on:next="changeValue" />
    </v-window>
  </div>
</template>

<script setup lang="ts">
import StepTtile from './StepTitle.vue'
import StepFirst from './StepFirst.vue'
import StepSecond from './StepSecond.vue'
import StepThird from './StepThird.vue'
import { ref } from 'vue'

const e1 = ref(1)

function changeValue(event: number) {
  console.log('true')
  e1.value = event
}
</script>

<style scoped lang="scss">
.stepper {
  max-width: 96% !important;
}
</style>
