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
  <template v-if="packageBag.classifiers">
    <h2 class="my-5">
      {{ $t('packages.classifiers') }}
    </h2>
    <div class="d-flex pb-5" style="flex-direction: column">
      <ul>
        <div
          class="classifier-key"
          v-for="(key, index) in Object.keys(categories)"
        >
          <div
            class="title"
            :style="collapsableHover"
            @click="collapse(index)"
          >
            {{ key }}
            <v-icon
              size="large"
              color="oa-blue"
              class="collapsibleIcon"
              :icon="collapseIcon[index]"
            />
          </div>
          <ul class="py-2" :style="showContentStyle[index]">
            <li
              class="classifier-value"
              v-for="value in categories[key]"
            >
              {{ value }}
            </li>
          </ul>
          <v-divider
            :thickness="3"
            class="py-2"
          ></v-divider>
        </div>
      </ul>
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
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

const showContent = ref(
  new Array<boolean>(
    Object.keys(categories.value).length
  ).fill(false)
)

const collapseIcon = ref(
  new Array(Object.keys(categories.value).length).fill(
    'mdi-menu-right'
  )
)

const showContentStyle = ref(
  new Array(Object.keys(categories.value).length).fill(
    'display: block; opacity: 0; max-height: 0px'
  )
)

const collapsableHover = computed(() => {
  return 'cursor: pointer;'
})

function collapse(index: number) {
  showContent.value[index] = !showContent.value[index]
  collapseIcon.value[index] = showContent.value[index]
    ? 'mdi-menu-down'
    : 'mdi-menu-right'
  showContentStyle.value[index] = showContent.value[index]
    ? 'display: table; overflow: hidden; transition: all 0.5s ease; padding-bottom: 20px;'
    : 'display: block; opacity: 0; max-height: 0px'
}
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
