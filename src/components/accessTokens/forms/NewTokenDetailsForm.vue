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
  <v-card id="newTokenDetails" class="pa-5" width="400">
    <v-card-title>
      {{ $t('settings.newToken') }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <div class="code mt-5 mb-5">
        <code class="d-flex justify-lg-space-between pt-2">
          {{ accessTokensStore.newToken }}
          <v-tooltip location="right">
            <template #activator="{ props }">
              <div
                id="tooltip-activator"
                v-bind="props"
                class="pl-3"
              >
                <v-icon
                  :icon="Icons.get('copy')"
                  size="large"
                  start
                  @click="copyContent()"
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
    <v-alert
      variant="tonal"
      color="oablue"
      class="mb-5"
      border="start"
    >
      {{ t('settings.token.copyWarning') }}
    </v-alert>
    <v-divider></v-divider>
    <CardActions
      :cancel-button="false"
      :submit-text="i18n.t('common.ok')"
      @submit="closeModal"
    />
  </v-card>
</template>

<script setup lang="ts">
import CardActions from '@/components/common/overlay/CardActions.vue'
import { useClipboard } from '@vueuse/core'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'
import { useAccessTokensStore } from '@/store/options/accessTokens'
import { useCommonStore } from '@/store/options/common'
import { i18n } from '@/plugins/i18n'
import Icons from '@/maps/Icons'

const { t } = useI18n()
const { copy } = useClipboard()
const toasts = useToast()
const accessTokensStore = useAccessTokensStore()
const commonStore = useCommonStore()

function copyContent() {
  try {
    if (accessTokensStore.newToken) {
      copy(accessTokensStore.newToken)
      toasts.success(t('common.copied'))
    }
  } catch {
    toasts.error(t('common.errors.copyFailed'))
  }
}

function closeModal() {
  commonStore.closeOverlay()
  accessTokensStore.reset()
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

<style lang="scss">
#newTokenDetails {
  .v-card-text {
    padding: 1rem 0 !important;
  }
}
</style>
