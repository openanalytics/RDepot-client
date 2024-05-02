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
  <component
    :is="as"
    v-model="value"
    @blur="handleBlur"
    :error-messages="errors"
    v-bind="attrs"
    color="oablue"
    :template="template"
    :style="{
      maxWidth: fieldMaxWidth + 'px'
    }"
  >
    <template
      v-if="template && as !== 'autocomplete'"
      #item="{ item, props }"
    >
      <slot name="item" :item="item" :props="props"> </slot>
    </template>
  </component>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRef } from 'vue'
import {
  VCombobox,
  VSelect,
  VSwitch,
  VTextField
} from 'vuetify/components'
import { z } from 'zod'
import AutocompleteField from '@/components/common/fields/AutocompleteField.vue'
import ComboboxField from '@/components/common/fields/ComboboxField.vue'
import { computed } from 'vue'

const props = defineProps<{
  name: string
  as: Component
  attrs?: Object
  template?: boolean
  maxWidth?: number | string
}>()

const fieldMaxWidth = computed(() => props.maxWidth || 250)

const component = z.enum([
  'v-text-field',
  'v-select',
  'v-switch',
  'v-combobox',
  'autocomplete',
  'combobox'
])
type Component = z.infer<typeof component>

const toComponent = new Map<Component, any>([
  [component.enum['v-text-field'], VTextField],
  [component.enum['v-select'], VSelect],
  [component.enum['v-switch'], VSwitch],
  [component.enum['v-combobox'], VCombobox],
  [component.enum['autocomplete'], AutocompleteField],
  [component.enum['combobox'], ComboboxField]
])

const as = toComponent.get(props.as)
const { value, handleBlur, errors } = useField(
  toRef(props, 'name'),
  undefined
)
</script>
