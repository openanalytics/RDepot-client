<!--
 R Depot
 
 Copyright (C) 2012-2023 Open Analytics NV
 
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
  <v-row class="ml-10 mt-5">
    <div
      v-for="(field, i) in store.filtration"
      :key="i"
      v-show="field != undefined"
    >
      <chip
        v-if="typeof field == 'boolean' && field != false"
        :label="store.labels?.get(i)"
        v-on:update="updateFiltration(i, !field)"
      />
      <chip
        v-else-if="
          typeof field == 'string' ||
          typeof field == 'number'
        "
        :label="store.labels?.get(i)"
        v-on:update="updateFiltration(i)"
        :value="field"
      />
      <span
        v-else-if="typeof field == 'object'"
        v-for="(value, index) in field"
        :key="index"
      >
        <chip
          :label="store.labels?.get(i)"
          :value="value.toString()"
          v-on:update="updateFiltration(i, value, field)"
        />
      </span>
    </div>
  </v-row>
</template>

<script setup lang="ts">
import { useUtilities } from '@/composable/utilities'
import Chip from './Chip.vue'

const props = defineProps<{
  store: {
    filtration: Record<
      string,
      string | boolean | string[] | number | undefined
    >
    labels: Map<string, string>
    setFiltration: Function
  }
}>()

const { deepCopy } = useUtilities()
function updateFiltration(
  fieldName: string,
  value?: string | boolean,
  field?: string[]
) {
  const localFiltration = deepCopy(props.store.filtration)
  let newValue: string | boolean | string[] | undefined =
    undefined
  if (field && value) {
    field = field.filter((fieldValue) => {
      return fieldValue != value
    })
    newValue = field
  } else if (value != undefined) {
    newValue = value
  }
  localFiltration[fieldName] = newValue
  props.store.setFiltration(localFiltration)
}
</script>
