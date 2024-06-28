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
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title class="panel-subtitle">
          {{ title }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <ul>
            <li
              v-for="(val, idx) in value"
              :key="idx"
              class="classifier-value"
            >
              {{ val }}
            </li>
          </ul>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value?: string[]
  showDivider?: boolean
}>()
</script>

<style lang="scss">
$text_color: rgba(var(--v-theme-oablue-darken-2));
$text_color_2: rgba(var(--v-theme-oablue));
$background_color: rgba(var(--v-theme-about-background));
$background_color_2: rgba(var(--v-theme-about-package));

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

.panel-subtitle {
  color: $background_color_2;
  font-weight: 600;
  display: flex;
  font-size: 1.2rem !important;
}
</style>
