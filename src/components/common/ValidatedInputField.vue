<template>
  <component
    :is="as"
    v-model="value"
    @blur="handleBlur"
    :error-messages="errors"
    v-bind="attrs"
  />
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRef } from 'vue'
import {
  VSelect,
  VSwitch,
  VTextField
} from 'vuetify/components'
import { z } from 'zod'
import AutocompleteField from '@/components/common/fields/AutocompleteField.vue'

const props = defineProps<{
  name: string
  as: Component
  attrs?: Object
}>()

const component = z.enum([
  'v-text-field',
  'v-select',
  'v-switch',
  'autocomplete'
])
type Component = z.infer<typeof component>

const toComponent = new Map<Component, any>([
  [component.enum['v-text-field'], VTextField],
  [component.enum['v-select'], VSelect],
  [component.enum['v-switch'], VSwitch],
  [component.enum['autocomplete'], AutocompleteField]
])

const as = toComponent.get(props.as)
const { value, handleBlur, errors } = useField(
  toRef(props, 'name'),
  undefined
)
</script>
