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
  <component
    :is="isas"
    v-model="value"
    :initial-value="value"
    :error-messages="errors"
    v-bind="attrs"
    color="primary"
    :template="template"
    :style="{
      maxWidth: fieldMaxWidth + 'px'
    }"
    :no-data-text="$t('datatable.noDataAvailable')"
    @blur="handleBlur"
    @set-value="update"
  >
    <template
      v-if="template && isas !== 'autocomplete'"
      #item="{ item, props }"
    >
      <slot name="item" :item="item" :props="props"> </slot>
    </template>
  </component>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRef, watch } from 'vue'
import {
  VCombobox,
  VSelect,
  VSwitch,
  VTextField,
  VTextarea,
  VCheckbox
} from 'vuetify/components'
import { z } from 'zod'
import AutocompleteField from '@/components/common/fields/AutocompleteField.vue'
import ComboboxField from '@/components/common/fields/ComboboxField.vue'
import { computed } from 'vue'
import SwitchField from './SwitchField.vue'

const componentProps = defineProps<{
  name: string
  as: Component
  attrs?: object
  template?: boolean
  maxWidth?: number | string
  cancel?: boolean
  errormsg?: string
}>()

const emits = defineEmits(['change'])

const fieldMaxWidth = computed(
  () => componentProps.maxWidth || 250
)

function update(value: boolean | string | undefined) {
  setValue(value)
  emits('change')
}

const component = z.enum([
  'v-text-field',
  'v-select',
  'v-switch',
  'switch-indeterminate',
  'v-combobox',
  'autocomplete',
  'combobox',
  'v-textarea',
  'v-checkbox'
])
type Component = z.infer<typeof component>

const toComponent = new Map<Component, any>([
  [component.enum['v-text-field'], VTextField],
  [component.enum['v-select'], VSelect],
  [component.enum['switch-indeterminate'], SwitchField],
  [component.enum['v-switch'], VSwitch],
  [component.enum['v-combobox'], VCombobox],
  [component.enum['autocomplete'], AutocompleteField],
  [component.enum['combobox'], ComboboxField],
  [component.enum['v-textarea'], VTextarea],
  [component.enum['v-checkbox'], VCheckbox]
])

watch(
  () => componentProps.errormsg,
  () => {
    if (componentProps.errormsg) {
      setErrors(componentProps.errormsg)
    }
  }
)

const isas = toComponent.get(componentProps.as)
const { value, handleBlur, errors, setValue, setErrors } =
  useField(toRef(componentProps, 'name'), undefined)
</script>
