<!--
 R Depot
 
 Copyright (C) 2012-2023 Open Analytics NV
 
 ===========================================================================
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the Apache License as published by
 The Apache Software Foundation, either version 2 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 Apache License for more details.
 
 You should have received a copy of the Apache License
 along with this program. If not, see <http://www.apache.org/licenses/>
 
-->

<template>
  <div style="max-width: 800px !important; width: 100%">
    <StepTitle :e1="el" />
    <v-window
      v-model="el"
      class="stepper mx-10"
      :touch="{ left: () => {}, right: () => {} }"
    >
      <v-window-item :value="el">
        <component
          :key="submissionStore.stepperKey"
          :is="components[el - 1]"
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
import { useSubmissionStore } from '@/store/submission'

const repositoryStore = useRepositoryStore()
const submissionStore = useSubmissionStore()
const components = [StepFirst, StepSecond, StepThird]

const el = ref(1)

function changeValue(event: number) {
  el.value = event
  if (el.value == 1) {
    submissionStore.$reset()
  }
}

onMounted(() => {
  repositoryStore.fetchRepositories()
})
</script>

<style scoped lang="scss">
.stepper {
  max-width: 96% !important;
}
</style>
