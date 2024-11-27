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
  <div class="d-flex align-center ga-5">
    <h2 class="my-5">
      {{ packageBag.name }}
    </h2>
    <v-icon
      id="package-details-go-to-events"
      v-tooltip="tooltipMessage"
      :icon="Icons.get('events')"
      color="about-package"
      size="large"
      @click="navigate"
    />
  </div>
  <h3 color="text">
    {{ packageBag.title?.replaceAll('\\n', ' ') }}
  </h3>
</template>

<script setup lang="ts">
import { EntityModelRPackageDto } from '@/openapi'
import { computed } from 'vue'
import { usePackageDetailsStore } from '@/store/options/packageDetails'
import Icons from '@/maps/Icons'
import { i18n } from '@/plugins/i18n'
import { useRouter } from 'vue-router'
import { useEventsStore } from '@/store/options/events'

const packageDetailsStore = usePackageDetailsStore()

const packageBag = computed<EntityModelRPackageDto>(
  () =>
    packageDetailsStore.packageBag as EntityModelRPackageDto
)

const tooltipMessage = computed(() =>
  i18n.t('package.seeRelatedEvents')
)

const router = useRouter()
const eventsStore = useEventsStore()

function navigate() {
  if (
    packageBag.value.name &&
    packageBag.value.repository?.name
  ) {
    eventsStore.setFiltration({
      packageName: [packageBag.value.name],
      repositoryName: [packageBag.value.repository.name]
    })
    router.push({
      name: 'events',
      params: {
        packageName: packageBag.value.name
      }
    })
  }
}
</script>

<style lang="scss">
h3 {
  color: rgba(var(--v-theme-about-package));
}
</style>
