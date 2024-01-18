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
  <v-card class="pa-5" width="400">
    <v-card-title> {{ props.title }} </v-card-title>
    <v-divider></v-divider>
    <v-card-text :class="{ customHeight: !long }">
      <slot> </slot>
    </v-card-text>
    <v-divider></v-divider>
    <card-actions :buttons="buttons"></card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { i18n } from '@/plugins/i18n'
import CardActions from '@/components/common/CardActions.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  long: {
    type: Boolean,
    required: false,
    default: false
  }
})

const buttons = [
  {
    id: 'cancel-button',
    text: i18n.t('common.cancel'),
    handler: () => cancel()
  },
  {
    id: 'create-button',
    text: i18n.t('common.apply'),
    handler: () => createToken()
  }
]

const emit = defineEmits<{
  (event: 'closeModal'): Promise<void>
  (event: 'cancel'): void
  (event: 'createToken'): Promise<void>
}>()

async function createToken() {
  await emit('createToken')
}

function cancel() {
  emit('cancel')
}
</script>

<style>
.customHeight {
  height: 300px;
}
</style>
