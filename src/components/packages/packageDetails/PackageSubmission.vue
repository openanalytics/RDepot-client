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
  <div class="d-flex" style="flex-direction: column">
    <Property
      :title="$t('packages.authors')"
      :value="packageBag.author"
      split
      bold-divider
      collapsible
    />
  </div>
  <div class="text mt-3">
    {{ $t('packages.withinRdepot') }}:
  </div>
  <div class="d-flex" style="flex-direction: column">
    <Property
      :title="$t('packages.submitter')"
      :value="submission?.submitter?.name"
      collapsible
    />
    <Property
      :title="$t('packages.approver')"
      :value="submission?.approver?.name"
      collapsible
    />
    <Property
      :title="$t('packages.maintainer')"
      :value="packageBag.user?.name"
      collapsible
    />
  </div>
</template>

<script setup lang="ts">
import { EntityModelPackageDto } from '@/openapi'
import { computed, ref } from 'vue'
import { usePackageDetailsStore } from '@/store/package_details'
import Property from './Property.vue'

const packageDetailsStore = usePackageDetailsStore()
const submission = ref(packageDetailsStore.submission)

const packageBag = computed<EntityModelPackageDto>(
  () =>
    packageDetailsStore.packageBag as EntityModelPackageDto
)
</script>

<style scoped lang="scss">
$text_color: rgba(var(--v-theme-about-package));
$background_color: rgba(var(--v-theme-about-background));

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
</style>
