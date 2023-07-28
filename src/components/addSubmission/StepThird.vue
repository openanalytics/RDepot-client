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
  <v-card class="mb-12 px-10 py-3 step text-center">
    <v-card-text class="mb-1">
      <div class="text-overline">repository</div>
      <div id="repository-name" class="text-h4 mb-2">
        {{ chosenRepository?.name }}
      </div>
      <v-divider></v-divider>
      <div class="text-overline">packages</div>
      <v-list class="text-left">
        <v-list-item
          id="submission-package"
          v-for="(file, i) in submissions_store.packages"
          :key="i"
          class="justify-start hoverable"
        >
          <template v-slot:prepend>
            <v-icon color="white" icon="mdi-file" />
          </template>

          <template v-slot:append>
            <v-list-item-title>
              {{ file.name }}
            </v-list-item-title>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
  <div class="d-flex justify-space-between">
    <v-btn
      id="back-button"
      color="oablue"
      @click="backStep"
    >
      {{ $t('common.goBack') }}
    </v-btn>

    <v-btn
      id="submit-button"
      color="oablue"
      @click="submit"
      :disabled="disableSubmit"
    >
      submit
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useSubmissionStore } from '@/store/submission'
import { computed, ref } from 'vue'

const emits = defineEmits(['next'])
const disableSubmit = ref(false)
const submissionsStore = useSubmissionStore()
const chosenRepository = computed(() => {
  return submissionsStore.repository
})
function backStep() {
  emits('next', 2)
}

async function submit() {
  await submissionsStore.addSubmissionRequests()
  // disableSubmit.value = true
  emits('next', 1)
}
</script>

<style lang="scss">
.hoverable {
  transition: background-color 0.5s ease;
  &:hover {
    background-color: rgb(var(--v-theme-docsblue));
  }
}
</style>
