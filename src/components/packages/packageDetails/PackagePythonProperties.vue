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
    <template
      v-for="({ translation, value, id }, idx) in details"
      :key="idx"
    >
      <Property
        :id="id"
        :title="$t(translation)"
        :value="value || $t('package.propertyNotProvided')"
        :collapsible="false"
        show-divider
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { EntityModelPythonPackageDto } from '@/openapi'
import { computed } from 'vue'
import { usePackageDetailsStore } from '@/store/options/packageDetails'
import Property from '@/components/packages/packageDetails/PackageProperty.vue'

const packageDetailsStore = usePackageDetailsStore()
const packageBag = computed(
  () =>
    packageDetailsStore.packageBag as EntityModelPythonPackageDto
)

const details = computed(() => {
  return [
    {
      translation: 'packages.version',
      value: packageBag.value.version,
      id: 'python-package-version-property'
    },
    {
      translation: 'packages.platform',
      value: packageBag.value.platform,
      id: 'python-package-platform-property'
    },
    {
      translation: 'packages.projectUrl',
      value: packageBag.value.projectUrl,
      id: 'python-package-project-url-property'
    },
    {
      translation: 'packages.providesExtra',
      value: packageBag.value.providesExtra,
      id: 'python-package-provides-extra-property'
    },
    {
      translation: 'packages.requiresDist',
      value: packageBag.value.requiresDist,
      id: 'python-package-requires-dist-property'
    },
    {
      translation: 'packages.requiresExternal',
      value: packageBag.value.requiresExternal,
      id: 'python-package-requires-external-property'
    },
    {
      translation: 'packages.requiresPython',
      value: packageBag.value.requiresPython,
      id: 'python-package-requires-Python-property'
    },
    {
      translation: 'packages.license',
      value: packageBag.value.license,
      id: 'python-package-license-property'
    },
    {
      translation: 'packages.hash',
      value: packageBag.value.hash,
      id: 'python-package-hash-property'
    }
  ]
})
</script>

<style lang="scss">
$text_color: rgba(var(--v-theme-about-package));
$background_color: rgba(var(--v-theme-about-background));

.classifier-value {
  display: list-item;
  list-style-type: disc;
  padding-left: 10px;
  margin-left: 20px;
}

h1,
.package_title {
  font-size: 3rem;
  line-height: 1.4;
  font-weight: 500;
  color: $text_color;
}

h2,
.subtitle {
  font-size: 2rem;
  line-height: 1.4;
  font-weight: 500;
  color: $text_color;
}

p,
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

.document {
  color: rgb(var(--v-theme-oared));
  transition: all 0.2s ease;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
}
</style>
