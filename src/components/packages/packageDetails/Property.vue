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
    <div class="title">
      {{ title }}
    </div>
    <div class="value">
      {{ text }}
    </div>
    <v-divider :thickness="boldDivider ? 5 : 3"></v-divider>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  value?: string
  split?: boolean
  boldDivider?: boolean
}>()

const text = computed(() => {
  if (props.split) {
    return splitValue()
  }
  return props.value
})

function splitValue() {
  const RE_GET_EXTENSION = '/,(?!\d+\])/' // /(?:\.([^.]+))?$/

  return props.value?.replaceAll(RE_GET_EXTENSION, '+')
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
}
.value {
  padding-bottom: 20px;
}

hr_style {
  border-top: $text_color_2 solid 1px !important;
}
</style>
