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
  <v-table id="package-classifiers-properties">
    <template
      v-if="
        packageBag.technology == Technologies.Values.Python
      "
    >
      <tr
        v-for="(key, idx) in Object.keys(categories)"
        :key="idx"
        class="classifier-key"
      >
        <td>
          {{ key }}
        </td>
        <td>
          <v-chip
            v-for="(val, id) in categories[key]"
            :key="id"
            class="classifier-value mt-1 mr-1"
            size="small"
          >
            {{ val }}
          </v-chip>
        </td>
      </tr>
    </template>
  </v-table>
</template>

<script setup lang="ts">
import { Technologies } from '@/enum/Technologies'
import { EntityModelPythonPackageDto } from '@/openapi'
import { usePackageDetailsStore } from '@/store/options/packageDetails'
import { computed } from 'vue'

const packageDetailsStore = usePackageDetailsStore()
const packageBag = computed(
  () =>
    packageDetailsStore.packageBag as EntityModelPythonPackageDto
)

const categories = computed(() => {
  let classifiers: string =
    packageBag.value.classifiers || ''
  let categories: Record<string, Array<string>> = {}
  classifiers
    ?.split(',')
    .forEach((classifierAndVal: string) => {
      let splitIndex = classifierAndVal.indexOf('::')
      let classifier = classifierAndVal.substring(
        0,
        splitIndex
      )
      let value = classifierAndVal.substring(
        splitIndex + 2,
        classifierAndVal.length
      )
      if (categories[classifier]) {
        categories[classifier].push(value)
      } else {
        categories[classifier] = [value]
      }
    })
  return categories
})
</script>
