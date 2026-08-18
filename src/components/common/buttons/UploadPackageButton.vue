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
  <v-tooltip v-if="canUpload" location="top">
    <template #activator="{ props: tooltipProps }">
      <div v-bind="tooltipProps">
        <v-btn
          :id="buttonId"
          :variant="variant"
          :color="disabled ? 'grey' : 'primary'"
          :size="size"
          icon
          @click.stop="navigateToUpload"
        >
          <v-icon
            class="icon-animate icon-hover-nudge-up"
            :icon="Icons.get('upload')"
          />
        </v-btn>
      </div>
    </template>
    <span>{{ tooltipText }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import Icons from '@/maps/Icons'
import { i18n } from '@/plugins/i18n'
import { computed, type PropType } from 'vue'
import { useRouter } from 'vue-router'
import { useUploadSubmissionStore } from '@/store/setup/uploadSubmission'
import { usePermissions } from '@/composable/authorities/userAuthorities'

const { has } = usePermissions()

const props = defineProps({
  repo: {
    type: Object,
    required: false,
    default: undefined
  },
  variant: {
    type: String as PropType<
      'text' | 'plain' | 'flat' | 'elevated'
    >,
    required: false,
    default: undefined
  },
  size: {
    type: String as PropType<
      'x-small' | 'small' | 'large' | 'x-large'
    >,
    required: false,
    default: undefined
  }
})

const router = useRouter()
const uploadSubmissionStore = useUploadSubmissionStore()

const canUpload = computed(() => has('submission.create'))

const buttonId = computed(() =>
  props.repo
    ? `upload-package-${props.repo.id}`
    : 'upload-package-button'
)

const disabled = computed(() => props.repo?.deleted)

const tooltipText = computed(() => {
  if (disabled.value && props.repo?.deleted) {
    return i18n.t('messages.general.deleted', {
      resource_name: i18n.t('resources.repository')
    })
  }
  return i18n.t('actions.general.uploadPackages')
})

function navigateToUpload() {
  if (!disabled.value) {
    if (props.repo) {
      uploadSubmissionStore.preselectedRepository = {
        name: props.repo.name,
        technology: props.repo.technology
      }
    }
    router.push({ name: 'addSubmission' })
  }
}
</script>
