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
    id="package-license-card"
    max-height="100px"
    :title="packageDetailsStore.packageBag?.license"
  >
    <v-card-subtitle class="pb-3">
      {{ $t('properties.packages.license') }}
      <v-icon
        id="repository-description-publication-status"
        icon="mdi-license"
        size="15"
        color="primary"
      ></v-icon>
    </v-card-subtitle>
  </v-card>
</template>

<script setup lang="ts">
import { usePackageDetailsStore } from '@/store/options/packageDetails'

const packageDetailsStore = usePackageDetailsStore()
</script>
