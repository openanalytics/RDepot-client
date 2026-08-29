<!--
 R Depot

 Copyright (C) 2012-2026 Open Analytics NV

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
  <Transition name="banner">
    <v-alert
      v-if="isVisible"
      id="connection-banner"
      :type="isLost ? 'warning' : 'success'"
      variant="tonal"
      density="compact"
      class="connection-banner"
    >
      <template #prepend>
        <v-progress-circular
          v-if="isLost"
          indeterminate
          size="22"
          width="2"
        />
        <v-icon v-else icon="mdi-check-circle" />
      </template>
      {{ bannerText }}
      <template #append>
        <v-btn
          v-tooltip="
            isLost
              ? t('messages.connection.retry')
              : t('messages.connection.reloadPage')
          "
          icon="mdi-refresh"
          size="small"
          variant="text"
          @click="isLost ? retryNow() : reloadPage()"
        />
        <v-btn
          v-if="!isLost"
          icon="$close"
          size="small"
          variant="text"
          @click="dismiss"
        />
      </template>
    </v-alert>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCommonStore } from '@/store/options/common'
import { useHealthCheck } from '@/composable/healthCheck'

const { countdown, connectionRestored, retryNow } =
  useHealthCheck()

const { t } = useI18n()
const commonStore = useCommonStore()

const isLost = computed(() => commonStore.connectionLost)
const isVisible = computed(
  () => isLost.value || connectionRestored.value
)

const bannerText = computed(() =>
  isLost.value
    ? `${t('messages.connection.lost')} ${t('messages.connection.retryIn', { seconds: countdown.value })}`
    : t('messages.connection.restored')
)

function reloadPage() {
  window.location.reload()
}

function dismiss() {
  connectionRestored.value = false
}
</script>

<style scoped lang="scss">
.connection-banner {
  border-radius: 0;
}

.banner-enter-active,
.banner-leave-active {
  transition: all 0.3s ease;
}

.banner-enter-from,
.banner-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>

<style>
.v-alert__prepend {
  align-self: center !important;
}
</style>
