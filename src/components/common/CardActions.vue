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
  <v-card-actions>
    <v-row :justify="justify" class="mt-1">
      <template v-for="button in buttons">
        <v-spacer v-if="button.spacer" />
        <v-btn
          :id="button.id"
          :color="color + ' darken-2'"
          @click="button.handler"
          class="mx-1"
        >
          <small>{{ button.text }}</small>
        </v-btn>
      </template>
    </v-row>
  </v-card-actions>
</template>

<script setup lang="ts">
type Justify =
  | 'start'
  | 'end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'

const props = withDefaults(
  defineProps<{
    justify?: Justify
    color?: string
    buttons: {
      id?: string
      spacer?: boolean
      text: string
      handler: Function
    }[]
  }>(),
  { justify: 'space-between', color: 'oablue' }
)
</script>
