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
      :style="collapsableHover"
      @click="collapse"
    >
      {{ title }}
      <v-icon
        v-if="collapsible"
        size="large"
        color="oa-blue"
        class="collapsibleIcon"
        :icon="collapseIcon"
      />
    </div>
    <div
      class="value"
      :style="showContentStyle"
      v-html="text"
    ></div>
    <v-divider :thickness="boldDivider ? 5 : 3"></v-divider>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  title: string
  value?: string
  split?: boolean
  boldDivider?: boolean
  collapsible: boolean
}>()

const showContent = ref(props.collapsible ? false : true)

const text = computed(() => {
  const commaRegex = /\,\\n+/gi
  const dotRegex = /\.\\n+/gi
  if (props.split) {
    return splitValue()
      ?.replaceAll(commaRegex, ',<br/>')
      .replaceAll(dotRegex, ',<br/>')
      .replaceAll('\\n', ' ')
  }
  return props.value
    ?.replaceAll(commaRegex, ',<br/>')
    .replaceAll(dotRegex, ',<br/>')
    .replaceAll('\\n', ' ')
})

const showContentStyle = computed(() => {
  return showContent.value
    ? 'display: table; overflow: hidden; transition: all 0.5s ease; padding-bottom: 20px;'
    : 'display: block; opacity: 0; max-height: 0px'
})

const collapsableHover = computed(() => {
  return props.collapsible ? 'cursor: pointer;' : ''
})

const collapseIcon = computed(() => {
  return showContent.value
    ? 'mdi-menu-down'
    : 'mdi-menu-right'
})

function splitValue() {
  const RE_GET_EXTENSION = '/,(?!\d+\])/' // /(?:\.([^.]+))?$/

  return props.value?.replaceAll(RE_GET_EXTENSION, '+')
}

function collapse() {
  if (props.collapsible) {
    showContent.value = !showContent.value
  }
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
