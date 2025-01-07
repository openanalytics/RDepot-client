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
  <v-card
    id="package-events-card"
    v-tooltip:bottom="
      $t('packageDetails.events.seeRelatedEvent')
    "
    color=""
    :title="$t('packageDetails.events.events')"
    max-height="100px"
    :prepend-icon="Icons.get('events')"
    @click="navigate"
  >
    <v-card-subtitle class="pb-3">{{
      $t('packageDetails.events.relatedEventPage')
    }}</v-card-subtitle>
  </v-card>
</template>

<script setup lang="ts">
import Icons from '@/maps/Icons'
import { useEventsStore } from '@/store/options/events'
import { usePackageDetailsStore } from '@/store/options/packageDetails'
import { useRouter } from 'vue-router'

const packageDetailsStore = usePackageDetailsStore()
const eventsStore = useEventsStore()
const router = useRouter()

async function navigate() {
  if (
    packageDetailsStore.packageBag?.name &&
    packageDetailsStore.packageBag?.repository?.name
  ) {
    await eventsStore.setFiltration({
      packageName: [packageDetailsStore.packageBag.name],
      repositoryName: [
        packageDetailsStore.packageBag.repository.name
      ]
    })
    router.push({
      name: 'events',
      params: {
        packageName: packageDetailsStore.packageBag.name
      }
    })
  }
}
</script>
