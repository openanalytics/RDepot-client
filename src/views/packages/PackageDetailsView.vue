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
  <PackageTitle />
  <div class="d-flex">
    <div class="mr-10 flex-fill">
      <PackageDescription />
      <PackageInstallation />
      <PackageProperties />
    </div>
    <div
      class="pr-5"
      style="max-width: 400px; width: 100%"
      color="background"
    >
      <PackageDownloads />
      <PackageManual />
      <PackageVignettes />
      <PackageDetailsPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import PackageDescription from '@/components/packages/packageDetails/PackageDescription.vue'
import PackageInstallation from '@/components/packages/packageDetails/PackageInstallation.vue'
import PackageProperties from '@/components/packages/packageDetails/PackageProperties.vue'
import PackageDownloads from '@/components/packages/packageDetails/PackageDownloads.vue'
import PackageTitle from '@/components/packages/packageDetails/PackageTitle.vue'
import PackageManual from '@/components/packages/packageDetails/PackageManual.vue'
import PackageVignettes from '@/components/packages/packageDetails/PackageVignettes.vue'
import PackageDetailsPanel from '@/components/packages/packageDetails/PackageDetailsPanel.vue'
</script>
