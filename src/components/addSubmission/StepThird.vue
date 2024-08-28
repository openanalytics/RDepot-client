<!--
 R Depot
 
 Copyright (C) 2012-2024 Open Analytics NV
 
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
      <div class="text-overline">
        {{ $t('columns.repository.name') }}
      </div>
      <div id="repository-name" class="text-h4 mb-2">
        {{ chosenRepository?.name }}
      </div>
      <v-divider></v-divider>
      <v-list class="text-left">
        <v-list-item class="text-overline">
          <template #prepend>
            {{ $t('columns.package.name') }}
          </template>
          <template
            v-if="
              submissionsStore.repository?.technology !=
              Technologies.enum.Python
            "
            #append
          >
            {{ $t('addSubmission.generateManual') }}
          </template>
        </v-list-item>
        <template
          v-for="(promise, i) in submissionsStore.promises"
        >
          <UploadSummary
            v-if="promise.packageBag"
            :key="i"
            :promise="promise"
            :generate-manual="
              submissionsStore.getGenerateManualForPackage(
                promise.packageBag
              )
            "
            :technology="
              submissionsStore.repository?.technology
            "
          />
        </template>
      </v-list>
    </v-card-text>
  </v-card>
  <div class="d-flex justify-center">
    <v-tooltip
      v-if="!submissionsStore.resolved"
      location="center"
    >
      <template #activator="{ props }">
        <div id="tooltip-activator" v-bind="props">
          <v-btn
            id="back-button-disabled"
            color="oablue"
            style="pointer-events: none"
            disabled
          >
            {{ $t('submissions.addAnotherSubmission') }}
          </v-btn>
        </div>
      </template>
      <span id="tooltip-wait">{{
        $t('submissions.waitForAllRequestsToFulfill')
      }}</span>
    </v-tooltip>
    <v-btn
      v-else
      id="back-button"
      color="oablue"
      @click="emits('next', 1)"
    >
      {{ $t('submissions.addAnotherSubmission') }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useSubmissionStore } from '@/store/submission'
import { computed } from 'vue'
import UploadSummary from '@/components/addSubmission/UploadSummary.vue'
import { Technologies } from '@/enum/Technologies'

const emits = defineEmits(['next'])

const submissionsStore = useSubmissionStore()
const chosenRepository = computed(() => {
  return submissionsStore.repository
})
</script>

<style lang="scss">
.hoverable {
  transition: background-color 0.5s ease;
  &:hover {
    background-color: rgb(var(--v-theme-docsblue));
  }
}
</style>
