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
  <v-card class="pa-5" width="400">
    <v-card-title>
      {{ $t('settings.deactivate') }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <p>{{ $t('settings.deactivateQuestion') }}</p>
    </v-card-text>
    <v-divider></v-divider>
    <card-actions :buttons="buttons"></card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/store/settings'
import CardActions from '@/components/common/CardActions.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const settingsStore = useSettingsStore()

const emit = defineEmits<{
  (event: 'closeModal'): Promise<void>
  (event: 'deactivateToken'): Promise<void>
}>()

const buttons = [
  {
    id: 'cancel-button',
    text: t('common.cancel'),
    handler: () => closeModal()
  },
  {
    id: 'ok-button',
    text: t('common.ok'),
    handler: () => deactivateToken()
  }
]

function closeModal() {
  emit('closeModal')
}
function deactivateToken() {
  emit('deactivateToken')
}
</script>
