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
  <template v-if="packageBag.classifiers">
    <div class="subtitle my-5">
      {{ $t('packages.classifiers') }}
    </div>
    <div class="d-flex" style="flex-direction: column">
      <ul>
        <li
          class="classifier-key"
          v-for="key in Object.keys(categories)"
        >
          <strong>{{ key }}</strong>
          <ul>
            <li
              class="classifier-value"
              v-for="value in categories[key]"
            >
              {{ value }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { EntityModelPythonPackageDto } from '@/openapi'
import { usePackageDetailsStore } from '@/store/package_details'

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

<style lang="scss">
$text_color: rgba(var(--v-theme-about-package));
$background_color: rgba(var(--v-theme-about-background));

.classifier-value {
  display: list-item;
  list-style-type: disc;
  padding-left: 10px;
  margin-left: 20px;
}
</style>
