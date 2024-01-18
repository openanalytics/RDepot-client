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
  <MarkdownDescription
    v-if="packageBag.technology == Technologies.enum.Python"
    :description="packageBag.description || ''"
  ></MarkdownDescription>
  <div v-else class="text my-5">
    {{ packageBag.description }}
  </div>
</template>

<script setup lang="ts">
import { EntityModelRPackageDto } from '@/openapi'
import { computed } from 'vue'
import { usePackageDetailsStore } from '@/store/package_details'
import { Technologies } from '@/enum/Technologies'
import MarkdownDescription from '@/components/common/MarkdownDescription.vue'

const packageDetailsStore = usePackageDetailsStore()

const packageBag = computed<EntityModelRPackageDto>(
  () =>
    packageDetailsStore.packageBag as EntityModelRPackageDto
)
</script>
