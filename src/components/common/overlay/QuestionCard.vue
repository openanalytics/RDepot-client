<!--
 R Depot
 
 Copyright (C) 2012-2025 Open Analytics NV
 
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
  <v-card class="pa-5" style="height: 100%">
    <v-card-title>
      {{ componentProps.text }}
    </v-card-title>
    <v-divider />
    <v-card-text>
      <slot name="desc"></slot>
    </v-card-text>
    <CardActions
      :valid="valid"
      @cancel="emits('cancel')"
      @submit="emits('reset')"
    />
  </v-card>
</template>

<script setup lang="ts">
import CardActions from '@/components/common/overlay/CardActions.vue'

const emits = defineEmits(['cancel', 'reset'])

const componentProps = defineProps({
  text: {
    type: String,
    required: true
  },
  valid: {
    type: Boolean,
    required: false,
    default: true
  }
})
</script>
