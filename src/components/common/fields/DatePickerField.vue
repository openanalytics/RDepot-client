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
  <v-dialog v-model="show" width="auto">
    <v-card v-click-outside="closeModal">
      <v-card-text>
        <v-date-picker
          :model-value="previousDate"
          :allowed-dates="checkAllowedDates"
          @update:model-value="updateDate"
        ></v-date-picker>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :text="t('common.reset')"
          color="error"
          @click="resetDate"
        ></v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :text="t('common.cancel')"
          @click="closeModal"
        ></v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const componentProps = defineProps({
  modelValue: { type: Boolean },
  previousDate: {
    type: Date,
    required: false,
    default: new Date()
  },
  direction: { type: String, default: '' },
  allowedDates: { type: String, default: '' }
})

const emits = defineEmits<{
  (event: 'updateDate', value: Date): void
  (event: 'closeModal'): void
  (event: 'resetDate'): void
  (event: 'update:modelValue', value: any): void
}>()

const { t } = useI18n()
const show = computed({
  get() {
    return componentProps.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})

function checkAllowedDates(val: Date | unknown): boolean {
  if (componentProps.allowedDates) {
    if (
      componentProps.direction === 'to' &&
      val instanceof Date
    ) {
      return (
        val.getTime() >
        new Date(componentProps.allowedDates).getTime()
      )
    } else if (
      componentProps.direction === 'from' &&
      val instanceof Date
    ) {
      return (
        val.getTime() <
        new Date(componentProps.allowedDates).getTime()
      )
    }
  }
  return true
}

function updateDate(value: Date) {
  emits('updateDate', value)
}

function resetDate() {
  emits('resetDate')
}

function closeModal() {
  emits('closeModal')
}
</script>
