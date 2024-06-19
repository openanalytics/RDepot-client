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
  <v-card color="background" elevation="10">
    <v-card-title>
      <div
        class="rdepot-section"
        style="cursor: pointer"
        @click="collapse"
      >
        {{ $t('packages.withinRdepot') }}
        <v-icon
          size="large"
          class="collapsibleIcon"
          :icon="collapseIcon"
        />
      </div>
    </v-card-title>
    <v-card-text :style="showContentStyle">
      <div class="d-flex" style="flex-direction: column">
        <Property
          :title="$t('packages.submitter')"
          :value="submission?.submitter?.name"
          collapsible
          show-divider
        />
        <Property
          :title="$t('packages.approver')"
          :value="submission?.approver?.name"
          collapsible
          show-divider
        />
        <Property
          :title="$t('packages.maintainer')"
          :value="packageBag.user?.name"
          collapsible
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { EntityModelPackageDto } from '@/openapi'
import { computed, ref } from 'vue'
import { usePackageDetailsStore } from '@/store/package_details'
import Property from './PackageProperty.vue'
import { useCollapse } from '@/composable/collapse'

const packageDetailsStore = usePackageDetailsStore()
const submission = ref(packageDetailsStore.submission)

const packageBag = computed<EntityModelPackageDto>(
  () =>
    packageDetailsStore.packageBag as EntityModelPackageDto
)

const { showContentStyle, collapseIcon, collapse } =
  useCollapse(true)
</script>

<style scoped lang="scss">
$text_color: rgba(var(--v-theme-about-package));
$background_color: rgba(var(--v-theme-about-background));
$text_color_2: rgba(var(--v-theme-oablue-darken));

.text {
  color: $text_color;
  font-size: 1.125rem;
  line-height: 1.3;
}

.col_title {
  color: $text_color;
  width: 130px;
  background-color: $background_color;
  margin-right: 1rem;
  font-weight: 500;
  padding: 3px;
  border-radius: 4px;
  margin: 1px;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.01);
  }
}

.col_small {
  width: 90px;
}

.col_desc {
  padding: 3px;
  margin: 1px;
  color: $text_color;
}

.rdepot-section {
  color: $text_color;
  display: flex;
  justify-content: space-between;
}
</style>
