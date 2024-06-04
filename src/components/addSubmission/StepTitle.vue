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
  <v-timeline direction="horizontal" side="start">
    <v-timeline-item
      v-for="(t, index) in steps"
      :key="index"
      :dot-color="
        e1 >= index + 1 ? 'oablue' : 'oablue-darken-2'
      "
      :size="e1 !== index + 1 ? 'small' : 'default'"
    >
      <div>
        <div class="text-h6" dot-color="oablue-darken-2">
          {{ t }}
        </div>
        <p></p>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup lang="ts">
import { i18n } from '@/plugins/i18n'
import { useSubmissionStore } from '@/store/submission'
import { computed } from 'vue'

defineProps({
  e1: {
    type: Number,
    required: true
  }
})

const submissionsStore = useSubmissionStore()

const steps = computed(() => {
  return [
    i18n.t('addSubmission.step1Title'),
    i18n.t('addSubmission.step2Title', [
      submissionsStore.repository?.technology
    ]),
    i18n.t('addSubmission.step3Title')
  ]
})
</script>

<style lang="scss" scoped>
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
