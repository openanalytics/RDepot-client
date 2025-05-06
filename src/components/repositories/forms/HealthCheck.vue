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
  <v-icon
    :id="id"
    v-tooltip="tooltip"
    :icon="icon"
    :color="color"
    class="mb-4 ml-2"
    @click="runServerAddressHealthCheck"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRepositoryStore } from '@/store/options/repositories'
import Icons from '@/maps/Icons'
import { i18n } from '@/plugins/i18n'

const componentProps = defineProps({
  serverAddress: {
    type: String,
    required: true
  }
})

const serverAddress = computed(
  () => componentProps.serverAddress
)

const healthCheckActual = ref<boolean>(false)
const repositoryStore = useRepositoryStore()
const serverAddressHealthCheck = ref<boolean | undefined>(
  undefined
)

const shouldCheckAddress = computed(
  () =>
    serverAddressHealthCheck.value == undefined ||
    !healthCheckActual.value
)

const icon = computed(() =>
  shouldCheckAddress.value
    ? Icons.get('healthCheckUndefined')
    : serverAddressHealthCheck.value
      ? Icons.get('healthCheckCorrect')
      : Icons.get('healthCheckIncorrect')
)
const color = computed(() =>
  shouldCheckAddress.value
    ? 'oablue'
    : serverAddressHealthCheck.value
      ? 'success'
      : 'oared'
)
const tooltip = computed(() => {
  if (shouldCheckAddress.value)
    return i18n.t(
      'properties.repositories.healthCheck.undefined'
    )
  else if (serverAddressHealthCheck.value) {
    return i18n.t(
      'properties.repositories.healthCheck.correct'
    )
  }
  return i18n.t(
    'properties.repositories.healthCheck.incorrect'
  )
})

const id = computed(() =>
  shouldCheckAddress.value
    ? 'check-server-address'
    : serverAddressHealthCheck.value
      ? 'correct-server-address'
      : 'incorrect-server-address'
)

watch(serverAddress, () => {
  healthCheckActual.value = false
})

async function runServerAddressHealthCheck() {
  serverAddressHealthCheck.value =
    await repositoryStore.isServerAddressHealthy(
      serverAddress.value
    )
  healthCheckActual.value = true
}
</script>
