<template>
  <div style="max-width: 800px !important; width: 100%">
    <StepTitle :e1="e1" />
    <v-window
      v-model="e1"
      class="stepper mx-10"
      :touch="{ left: () => {}, right: () => {} }"
    >
      <v-window-item :value="e1">
        <component
          :is="components[e1 - 1]"
          v-on:next="changeValue"
        ></component>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup lang="ts">
import StepTitle from './StepTitle.vue'
import StepFirst from './StepFirst.vue'
import StepSecond from './StepSecond.vue'
import StepThird from './StepThird.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useRepositoryStore } from '@/store/repositories'

const repository_store = useRepositoryStore()
const components = [StepFirst, StepSecond, StepThird]

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