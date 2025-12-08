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
  <v-switch
    :key="key"
    v-model="value"
    :indeterminate="indeterminate"
    @click="update"
  >
  </v-switch>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
const componentProps = defineProps<{
  initialValue?: boolean
}>()
const emits = defineEmits(['setValue'])

const indeterminate = computed(
  () => value.value === undefined || value.value === null
)

const value = ref<boolean | undefined>(
  componentProps.initialValue
)
const previousValue = ref(!value.value)
const key = ref(1)

function update() {
  if (value.value != undefined) {
    previousValue.value = value.value
    value.value = undefined
  } else {
    value.value = !previousValue.value
  }
  key.value = ++key.value % 100
  emits('setValue', value.value)
}
</script>
