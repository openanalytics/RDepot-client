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
  <v-switch
    :key="key"
    v-model="value"
    :indeterminate="isIndeterminate"
    @click="update"
  >
  </v-switch>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
const componentProps = defineProps<{
  initialValue?: boolean
  indeterminate?: boolean
}>()
const emits = defineEmits(['setValue'])

const isIndeterminate = computed(
  () => value.value === undefined || value.value === null
)

const value = ref<boolean | undefined>(
  componentProps.initialValue
)

const key = ref(1)

function update() {
  const states = componentProps.indeterminate
    ? [false, undefined, true]
    : [false, true]
  const currentIndex = states.indexOf(value.value)

  const nextIndex =
    currentIndex === -1
      ? 0
      : (currentIndex + 1) % states.length

  value.value = states[nextIndex]

  key.value = (key.value + 1) % 100
  emits('setValue', value.value)
}

watch(
  () => componentProps.initialValue,
  (newVal) => {
    value.value = newVal
  }
)
</script>
