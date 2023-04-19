<template>
  <v-text-field
    v-if="type === 'text'"
    v-model="value"
    @blur="handleBlur"
    :label="label"
    :error-messages="errors"
  />
  <v-select
    v-if="type === 'select'"
    v-model="value"
    @blur="handleBlur"
    :items="items"
    :label="label"
    :error-messages="errors"
  />
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { ref, toRef } from 'vue'

const props = defineProps<{
  name: string
  type: string
  label: string
  items?: string[]
}>()

const items = ref(props.items)
const { value, handleBlur, errors } = useField(
  toRef(props, 'name'),
  undefined
)
</script>
