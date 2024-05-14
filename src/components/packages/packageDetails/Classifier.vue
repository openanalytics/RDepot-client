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
  <div v-if="value" class="pt-2">
    <div
      class="title"
      style="cursor: pointer"
      @click="collapse"
    >
      {{ title }}
      <v-icon
        size="large"
        color="oa-blue"
        class="collapsibleIcon"
        :icon="collapseIcon"
      />
    </div>
    <ul :style="showContentStyle">
      <li
        :style="showListStyle"
        class="classifier-value"
        v-for="(val, index) in value"
      >
        {{ val }}
      </li>
    </ul>
    <v-divider :thickness="3"></v-divider>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  title: string
  value?: string[]
}>()

const showContent = ref(false)

const showContentStyle = computed(() => {
  return showContent.value
    ? 'display: table; overflow: hidden; transition: all 0.5s ease; padding-bottom: 20px;'
    : 'display: block; opacity: 0; max-height: 0px'
})

const showListStyle = computed(() => {
  return showContent.value
    ? 'display: list-item;'
    : 'display: list-item; max-height: 0px'
})

const collapseIcon = computed(() => {
  return showContent.value
    ? 'mdi-menu-down'
    : 'mdi-menu-right'
})

function collapse() {
  showContent.value = !showContent.value
}
</script>

<style lang="scss">
$text_color: rgba(var(--v-theme-oablue-darken-2));
$text_color_2: rgba(var(--v-theme-oablue));
$background_color: rgba(var(--v-theme-about-background));

.title {
  color: $text_color_2;
  font-weight: 600;
  font-size: larger;
  display: flex;
  justify-content: space-between;
}

hr_style {
  border-top: $text_color_2 solid 1px !important;
}

.collapsibleIcon {
  justify-self: flex-end;
}
</style>
