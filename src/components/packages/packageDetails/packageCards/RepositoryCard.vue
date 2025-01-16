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

<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <v-card
    v-if="packageDetailsStore.packageBag?.repository"
    id="package-repository-card"
    color=""
    class="flex-grow-1"
    max-height="100px"
    :title="packageDetailsStore.packageBag.repository?.name"
  >
    <template #append>
      <div class="d-flex ga-1 align-center">
        <v-chip
          v-tooltip="
            $t(
              'repositories.creation.technology'
            ).toLowerCase()
          "
          size="x-small"
          color="oablue"
          >{{
            packageDetailsStore.packageBag.technology
          }}</v-chip
        >
        <v-icon
          v-if="packageDetailsStore.packageBag.repository"
          id="repository-description-publication-status"
          v-tooltip="
            packageDetailsStore.packageBag.repository
              .published
              ? $t('repositories.published.true')
              : $t('repositories.published.false')
          "
          :icon="
            packageDetailsStore.packageBag.repository
              .published
              ? Icons.get('success')
              : 'mdi-close'
          "
          size="15"
          :color="
            packageDetailsStore.packageBag.repository
              .published
              ? 'success'
              : 'error'
          "
        >
        </v-icon>
      </div>
    </template>
    <v-card-subtitle class="pb-3">
      <CopyableCell
        v-if="
          packageDetailsStore.packageBag.repository
            ?.publicationUri
        "
        :value="
          packageDetailsStore.packageBag.repository
            ?.publicationUri
        "
      />
    </v-card-subtitle>
  </v-card>
</template>

<script setup lang="ts">
import CopyableCell from '@/components/common/datatable/CopyableCell.vue'
import Icons from '@/maps/Icons'
import { usePackageDetailsStore } from '@/store/options/packageDetails'

const packageDetailsStore = usePackageDetailsStore()
</script>
