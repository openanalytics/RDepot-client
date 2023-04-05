<template>
  <div style="max-width: 800px !important; width: 100%">
    <StepTtile :e1="e1" />
    <v-window
      v-model="e1"
      class="stepper mx-10"
      :touch="{ left: () => {}, right: () => {} }"
    >
      <v-window-item :value="1">
        <StepFirst v-on:next="changeValue" />
      </v-window-item>
      <v-window-item :value="2">
        <StepSecond v-on:next="changeValue" />
      </v-window-item>
      <v-window-item :value="3">
        <StepThird v-on:next="changeValue" />
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup lang="ts">
import StepTtile from './StepTitle.vue'
import StepFirst from './StepFirst.vue'
import StepSecond from './StepSecond.vue'
import StepThird from './StepThird.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useRepositoryStore } from '@/store/repositories'

const repository_store = useRepositoryStore()

const e1 = ref(1)

function changeValue(event: number) {
  e1.value = event
}

onMounted(() => {
  repository_store.fetchRepositories()
})
</script>

<style scoped lang="scss">
.stepper {
  max-width: 96% !important;
}
</style>
