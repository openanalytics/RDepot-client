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
  <v-chip
    size="small"
    color="oablue"
    class="mr-3"
    style="cursor: pointer"
  >
    {{
      packageBag.binary
        ? $t('columns.package.binary')
        : $t('columns.package.source')
    }}</v-chip
  >
</template>

<script setup lang="ts">
import { EntityModelPackageDto } from '@/openapi'
import { ref, watch } from 'vue'

const componentProps = defineProps({
  item: {
    type: Object as () => EntityModelPackageDto,
    required: true
  }
})

watch(componentProps.item, (newVal) => {
  packageBag.value = newVal
})

const packageBag = ref(componentProps.item)
</script>
