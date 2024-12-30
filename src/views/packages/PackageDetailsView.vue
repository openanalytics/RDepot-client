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
  <v-breadcrumbs :items="items"></v-breadcrumbs>

  <div class="d-flex">
    <div
      class="d-flex justify-start ga-4 mt-4"
      style="width: 100%"
    >
      <div class="flex-grow-1">
        <div class="d-flex ga-4">
          <div
            :class="[
              {
                basePanePython:
                  packageBag.technology ==
                  Technologies.Values.Python
              },
              {
                basePaneOther:
                  packageBag.technology !=
                  Technologies.Values.Python
              }
            ]"
          >
            <div class="d-flex ga-4">
              <RepositoryCard />
              <LicenseCard />
              <EventsCard />
            </div>
            <v-card class="proptable mt-4">
              <BaseProperties />
            </v-card>
          </div>

          <v-card
            v-if="
              packageBag.technology ==
              Technologies.Values.Python
            "
            prepend-icon="mdi-language-python"
            class="proptable flex-grow-1"
            :title="$t('packageDetails.classifiers')"
          >
            <ClassifiersProperties />
          </v-card>
        </div>
        <div class="mt-4">
          <PackageInstallation />
        </div>

        <v-card class="mt-4">
          <PackageDescription />
        </v-card>
      </div>

      <div style="min-width: 25%; max-width: 25%">
        <v-card>
          <PackageChart
            class="flex-grow-1 pa-3"
            style="width: 100%; max-width: 100%"
          />
          <PackageVersions />
        </v-card>
        <v-card class="mt-4">
          <BooleanProperties />
        </v-card>

        <v-card
          class="my-4"
          style="width: 100%; max-width: 100%"
        >
          <FilesProperties />
        </v-card>

        <v-card class="mt-4">
          <AuthorsProperties />
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EventsCard from '@/components/packages/packageDetails/packageCards/EventsCard.vue'
import LicenseCard from '@/components/packages/packageDetails/packageCards/LicenseCard.vue'
import RepositoryCard from '@/components/packages/packageDetails/packageCards/RepositoryCard.vue'
import PackageChart from '@/components/packages/packageDetails/PackageChart.vue'
import PackageDescription from '@/components/packages/packageDetails/PackageDescription.vue'
import PackageInstallation from '@/components/packages/packageDetails/PackageInstallation.vue'
import PackageVersions from '@/components/packages/packageDetails/PackageVersions.vue'
import AuthorsProperties from '@/components/packages/packageDetails/properties/AuthorsProperties.vue'
import BaseProperties from '@/components/packages/packageDetails/properties/BaseProperties.vue'
import BooleanProperties from '@/components/packages/packageDetails/properties/BooleanProperties.vue'
import ClassifiersProperties from '@/components/packages/packageDetails/properties/ClassifiersProperties.vue'
import FilesProperties from '@/components/packages/packageDetails/properties/FilesProperties.vue'
import { Technologies } from '@/enum/Technologies'
import { EntityModelRPackageDto } from '@/openapi'
import { i18n } from '@/plugins/i18n'
import { usePackageDetailsStore } from '@/store/options/packageDetails'
import { computed } from 'vue'

const packageDetailsStore = usePackageDetailsStore()
const packageBag = computed<EntityModelRPackageDto>(
  () =>
    packageDetailsStore.packageBag as EntityModelRPackageDto
)

const items = computed(() => [
  {
    title: i18n.t('common.packages').toLowerCase(),
    disabled: false,
    to: { name: 'packages' }
  },
  {
    title: packageBag?.value.name || '',
    disabled: true
  }
])
</script>

<style>
.basePanePython {
  max-width: 60%;
  min-width: 60%;
  width: 100%;
}
.basePaneOther {
  width: 100%;
}
</style>
