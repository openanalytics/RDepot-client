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
  <v-card-actions>
    <v-row :justify="justify" class="mt-1">
      <v-btn
        v-if="cancelButton"
        id="cancel-button"
        color="oablue darken-2"
        class="mx-1"
        @click="cancel"
        >{{ i18n.t('common.cancel') }}</v-btn
      >
      <template v-for="(button, i) in buttons" :key="i">
        <v-btn
          :id="button.id"
          class="mx-1"
          @click="emit('clicked', button.id)"
        >
          <small>{{ button.text }}</small>
        </v-btn>
      </template>
      <v-btn
        v-if="submitButton"
        id="submit-button"
        :disabled="!valid"
        color="oablue darken-2"
        class="mx-1"
        @click="emit('submit')"
        >{{ i18n.t('common.submit') }}</v-btn
      >
    </v-row>
  </v-card-actions>
</template>

<script setup lang="ts">
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/options/common'

const emit = defineEmits(['clicked', 'cancel', 'submit'])
const commonStore = useCommonStore()

type Justify =
  | 'start'
  | 'end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'

withDefaults(
  defineProps<{
    cancelButton?: boolean
    submitButton?: boolean
    submitText?: string
    justify?: Justify
    valid?: boolean
    buttons?: {
      id?: string
      text: string
    }[]
  }>(),
  {
    justify: 'space-between',
    cancelButton: true,
    submitButton: true,
    submitText: i18n.t('common.submit'),
    valid: true,
    buttons: undefined
  }
)

function cancel() {
  commonStore.closeOverlay()
  emit('cancel')
}
</script>
