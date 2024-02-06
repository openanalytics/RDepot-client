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
    <v-card-title>
      {{ $t('settings.newToken') }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <div class="code mb-2 mt-4 mr-2 ml-1">
        <code class="d-flex justify-lg-space-between pt-5">
          {{ settingsStore.newToken }}
          <v-tooltip location="right">
            <template #activator="{ props }">
              <div
                id="tooltip-activator"
                v-bind="props"
                class="pl-3"
              >
                <v-icon
                  @click="copyContent()"
                  icon="mdi-content-copy"
                  size="large"
                  start
                />
              </div>
            </template>
            <span id="tooltip-wait">{{
              $t('packages.copy')
            }}</span>
          </v-tooltip>
        </code>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <card-actions :buttons="buttons"></card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/store/settings'
import CardActions from '@/components/common/CardActions.vue'
import { useClipboard } from '@vueuse/core'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { copy } = useClipboard()
const toasts = useToast()
const settingsStore = useSettingsStore()

const emit = defineEmits<{
  (event: 'closeModal'): Promise<void>
}>()

function copyContent() {
  try {
    if (settingsStore.newToken) {
      copy(settingsStore.newToken)
      toasts.success(t('common.copied'))
    }
  } catch (error) {
    toasts.error(t('common.errors.copyFailed'))
  }
}

const buttons = [
  {
    id: 'ok-button',
    text: t('common.ok'),
    handler: () => closeModal()
  }
]

function closeModal() {
  emit('closeModal')
  settingsStore.resetNewToken()
}
</script>

<style scoped lang="scss">
$code_color: rgba(var(--v-theme-code));

.code {
  background-color: $code_color;
  padding: 20px;
  line-height: 1.5;
  border-radius: 8px;
  -webkit-box-shadow: 4px 4px 12px 0px #42445a;
  -moz-box-shadow: 4px 4px 12px 0px rgba(66, 68, 90, 1);
  box-shadow: 2px 2px 6px 0px rgba(66, 68, 90, 1);
  max-width: 1200px;
  font-size: 0.9em;
}
</style>
