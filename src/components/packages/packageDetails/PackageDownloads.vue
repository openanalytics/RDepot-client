<!--
 R Depot
 
 Copyright (C) 2012-2023 Open Analytics NV
 
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
  <div class="subtitle my-5">
    {{ $t('packages.downloads') }}
  </div>
  <div class="d-flex" style="flex-direction: column">
    <div class="d-flex align-center">
      <div class="col_title">
        {{ $t('packages.sourceFile') }}
      </div>
      <a
        :href="
          '/manager/packages/' +
          packageBag.id +
          '/download/' +
          packageBag.name +
          '_' +
          packageBag.version +
          '.tar.gz'
        "
        class="col_desc document"
      >
        {{ packageBag.name }}_{{
          packageBag.version
        }}.tar.gz
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { EntityModelPythonPackageDto } from '@/openapi'
import { usePackageDetailsStore } from '@/store/package_details'

const packageDetailsStore = usePackageDetailsStore()

const packageBag = computed(
  () =>
    packageDetailsStore.packageBag as EntityModelPythonPackageDto
)
</script>
