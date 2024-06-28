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
    <v-expansion-panels v-if="collapsible">
      <v-expansion-panel>
        <v-expansion-panel-title class="panel-subtitle">
          {{ title }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div v-dompurify-html="text" class="value"></div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <div v-else>
      <div class="title">
        {{ title }}
      </div>
      <div v-dompurify-html="text" class="value"></div>
      <v-divider
        v-if="showDivider"
        :thickness="boldDivider ? 5 : 3"
      ></v-divider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const componentProps = defineProps<{
  title: string
  value?: string
  split?: boolean
  boldDivider?: boolean
  collapsible: boolean
  showDivider?: boolean
}>()

const text = computed(() => {
  const commaRegex = /,\\n+/gi
  const dotRegex = /\.\\n+/gi
  if (componentProps.split) {
    return splitValue()
      ?.replaceAll(commaRegex, ',<br/>')
      .replaceAll(dotRegex, ',<br/>')
      .replaceAll('\\n', ' ')
  }
  return componentProps.value
    ?.replaceAll(commaRegex, ',<br/>')
    .replaceAll(dotRegex, ',<br/>')
    .replaceAll('\\n', ' ')
})

function splitValue() {
  const RE_GET_EXTENSION = '/,(?!d+])/' // /(?:\.([^.]+))?$/

  return componentProps.value?.replaceAll(
    RE_GET_EXTENSION,
    '+'
  )
}
</script>

<style lang="scss">
$text_color: rgba(var(--v-theme-oablue-darken-2));
$text_color_2: rgba(var(--v-theme-oablue));
$background_color: rgba(var(--v-theme-about-background));
$background_color_2: rgba(var(--v-theme-about-package));

.title {
  color: $text_color_2;
  font-weight: 600;
  font-size: 1.25rem;
  display: flex;
  justify-content: space-between;
}

hr_style {
  border-top: $text_color_2 solid 1px !important;
}

.panel-subtitle {
  color: $background_color_2;
  font-weight: 600;
  display: flex;
  font-size: 1.2rem !important;
}
</style>
