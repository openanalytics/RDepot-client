<template>
  <component
    :is="as"
    v-model="value"
    @blur="handleBlur"
    :error-messages="errors"
  />
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRef } from 'vue'
import { VSelect, VTextField } from 'vuetify/components'
import { z } from 'zod'

const props = defineProps<{
  name: string
  as: Component
}>()

const component = z.enum(['v-text-field', 'v-select'])
type Component = z.infer<typeof component>

const toComponent = new Map<Component, any>([
  [component.enum['v-text-field'], VTextField],
  [component.enum['v-select'], VSelect]
])

const as = toComponent.get(props.as)
const { value, handleBlur, errors } = useField(
  toRef(props, 'name'),
  undefined
)
</script>
