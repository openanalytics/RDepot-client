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
  <v-expansion-panels v-model="packagePanels" multiple>
    <v-expansion-panel value="Metadata">
      <v-expansion-panel-title class="title">
        {{ $t('packages.withinPackage') }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <PackageMetadata />
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel value="MetadataRdepot">
      <v-expansion-panel-title class="title">
        {{ $t('packages.withinRdepot') }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <PackageRDepot />
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel value="Versions">
      <v-expansion-panel-title class="title">
        {{ $t('packages.versions') }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <PackageVersions />
      </v-expansion-panel-text>
    </v-expansion-panel>
    <template v-if="packageBag.classifiers">
      <v-expansion-panel value="Classifiers">
        <v-expansion-panel-title class="title">
          {{ $t('packages.classifiers') }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <PackageClassifiers />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </template>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import PackageClassifiers from '@/components/packages/packageDetails/PackageClassifiers.vue'
import PackageVersions from '@/components/packages/packageDetails/PackageVersions.vue'
import { computed, ref } from 'vue'
import PackageMetadata from './PackageMetadata.vue'
import PackageRDepot from './PackageRDepot.vue'
import { usePackageDetailsStore } from '@/store/options/packageDetails'
import { EntityModelPythonPackageDto } from '@/openapi'

const packagePanels = ref([
  'Metadata',
  'MetadataRdepot',
  'Versions',
  'Classifiers'
])

const packageDetailsStore = usePackageDetailsStore()

const packageBag = computed(
  () =>
    packageDetailsStore.packageBag as EntityModelPythonPackageDto
)
</script>
