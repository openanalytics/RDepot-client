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
  <v-tooltip location="top">
    <template #activator="{ props }">
      <span
        v-bind="props"
        style="width: 100%"
        class="d-flex justify-center"
      >
        <v-checkbox-btn
          :id="id"
          v-model="packageBag.binary"
          disabled
          hide-details
          readonly
          color="grey"
          class="mr-5"
          @click.stop
        />
      </span>
    </template>
    <span>{{ $t('columns.package.binary') }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { EntityModelPackageDto } from '@/openapi'
import { ref, computed, watch } from 'vue'

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

const id = computed(
  () =>
    `checkbox-binary-${
      componentProps.item.name
    }-${componentProps.item.version?.replaceAll(
      '.',
      '-'
    )}-${componentProps.item.repository?.name}`
)
</script>
