<!--
 R Depot
 
 Copyright (C) 2012-2025 Open Analytics NV
 
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
  <div>
    {{ message }}

    <hr class="my-5" color="#777" />

    <div class="d-flex align-center justify-end ga-2 mt-5">
      <span v-if="copied"
        >{{ $t('messages.general.copied') }}!</span
      >

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.25rem"
        height="1.25rem"
        viewBox="0 0 24 24"
        @click="copy(message)"
      >
        <path
          fill="currentColor"
          d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12z"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ToastOptions } from 'vue3-toastify'
import type { PropType } from 'vue'
import { BackendError } from '@/models/errors/BackendError'
import { i18n } from '@/plugins/i18n'
import { useClipboard } from '@vueuse/core'
import { computed } from 'vue'

const componentProps = defineProps({
  closeToast: {
    type: Function as PropType<(e?: MouseEvent) => void>,
    required: false,
    default: undefined
  },
  toastProps: {
    type: Object as PropType<ToastOptions<BackendError>>,
    required: false,
    default: undefined
  }
})

const { copy, copied } = useClipboard()

const message = computed(() =>
  i18n.t('messages.errors.message.500', {
    traceId:
      componentProps.toastProps?.data?.response.data.data
        .traceId,
    timestamp:
      componentProps.toastProps?.data?.response.data.data
        .timestamp
  })
)
</script>

<style scoped>
span {
  font-size: 0.9rem;
}
</style>
