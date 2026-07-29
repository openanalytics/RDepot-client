<!--
 R Depot
 
 Copyright (C) 2012-2026 Open Analytics NV
 
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
        {{ i18n.t('resources.repository') }}
      </div>
      <div id="repository-name" class="text-h4 mb-2">
        {{ repository?.title }}
      </div>
      <v-divider></v-divider>
      <v-list class="text-left">
        <v-list-item class="text-overline">
          <template #prepend>
            {{ i18n.t('forms.general.name') }}
          </template>
          <template
            v-if="technology != Technologies.enum.Python"
            #append
          >
            {{ i18n.t('fields.files.generateManual') }}
          </template>
        </v-list-item>
        <template
          v-for="(
            promise, i
          ) in uploadSubmissionStore.promises"
        >
          <UploadSummary
            v-if="promise.packageBag"
            :key="i"
            :promise="promise"
            :generate-manual="
              promise.generateManual ?? false
            "
          />
        </template>
      </v-list>
    </v-card-text>
  </v-card>
  <div class="d-flex justify-center ga-4">
    <v-tooltip
      v-for="action in actions"
      :key="action.id"
      :disabled="!action.disabled"
      location="bottom"
    >
      <template #activator="{ props }">
        <div v-bind="props">
          <v-btn
            :id="action.id"
            color="primary"
            :disabled="action.disabled"
            @click="action.onClick"
          >
            {{ i18n.t(action.label) }}
          </v-btn>
        </div>
      </template>
      <span>{{ i18n.t(action.tooltip) }}</span>
    </v-tooltip>
  </div>
</template>

<script setup lang="ts">
import UploadSummary from '@/components/addSubmission/UploadSummary.vue'
import { Technologies } from '@/enum/Technologies'
import { useField } from 'vee-validate'
import { i18n } from '@/plugins/i18n'
import { useUploadSubmissionStore } from '@/store/setup/uploadSubmission'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const emits = defineEmits(['next'])
const router = useRouter()

const { value: repository } = useField<{ title: string }>(
  'repository'
)
const { value: technology } = useField('technology')

const uploadSubmissionStore = useUploadSubmissionStore()

const waitForAllRequestsToFulfillTooltip =
  'messages.submissions.waitForAllRequestsToFulfill'

const actions = computed(() => [
  {
    id: 'upload-another-button',
    label: 'messages.submissions.addAnotherSubmission',
    tooltip: waitForAllRequestsToFulfillTooltip,
    disabled: !uploadSubmissionStore.resolved,
    onClick: () => emits('next', 1)
  },
  {
    id: 'show-submissions-button',
    label: 'messages.submissions.showSubmissions',
    tooltip: !uploadSubmissionStore.resolved
      ? waitForAllRequestsToFulfillTooltip
      : 'messages.submissions.noSubmissionPassed',
    disabled:
      !uploadSubmissionStore.resolved ||
      !uploadSubmissionStore.hasAnyUploaded,
    onClick: () => router.push({ name: 'submissions' })
  }
])
</script>

<style lang="scss">
.hoverable {
  transition: background-color 0.5s ease;

  &:hover {
    background-color: rgb(var(--v-theme-docsblue));
  }
}
</style>
