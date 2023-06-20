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
  <v-timeline direction="horizontal" side="start">
    <v-timeline-item
      :dot-color="e1 >= 1 ? 'oablue' : 'oablue-darken-2'"
      :size="e1 !== 1 ? 'small' : 'default'"
    >
      <div>
        <div class="text-h6" dot-color="oablue-darken-2">
          {{ $t('addSubmission.step1Title') }}
        </div>
        <p></p>
      </div>
    </v-timeline-item>
    <v-timeline-item
      :dot-color="e1 >= 2 ? 'oablue' : 'oablue-darken-2'"
      :size="e1 !== 2 ? 'small' : 'default'"
    >
      <div>
        <div class="text-h6" dot-color="oablue-darken-2">
          {{
            $t('addSubmission.step2Title', [
              submissions_store.repository?.technology
            ])
          }}
        </div>
        <p></p>
      </div>
    </v-timeline-item>
    <v-timeline-item
      :dot-color="e1 >= 3 ? 'oablue' : 'oablue-darken-2'"
      :size="e1 !== 3 ? 'small' : 'default'"
    >
      <div>
        <div class="text-h6" dot-color="oablue-darken-2">
          {{ $t('addSubmission.step3Title') }}
        </div>
        <p></p>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup lang="ts">
import { useSubmissionStore } from '@/store/submission'
defineProps({
  e1: {
    type: Number,
    required: true
  }
})
const submissions_store = useSubmissionStore()
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
