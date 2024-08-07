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
  <v-checkbox-btn
    v-if="isSelected"
    :id="`checkbox-actions-${
      item.name
    }-${item.version?.replaceAll('.', '-')}-${
      item.repository?.name
    }`"
    :model-value="true"
    :disabled="isPending(item)"
    class="justify-start"
    @click.stop
    @update:model-value="toggleSelect"
  />
  <v-checkbox-btn
    v-else
    :id="`checkbox-actions-${
      item.name
    }-${item.version?.replaceAll('.', '-')}-${
      item.repository?.name
    }`"
    :disabled="isPending(item)"
    :model-value="false"
    class="justify-start"
    @click.stop
    @update:model-value="toggleSelect"
  />
</template>

<script setup lang="ts">
import { EntityModelPackageDto } from '@/openapi'
import { usePackagesActions } from '@/composable/packages/packagesActions'

defineProps({
  item: {
    type: Object as () => EntityModelPackageDto,
    required: true
  },
  isSelected: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['toggleSelect'])

const { isPending } = usePackagesActions()

function toggleSelect() {
  emit('toggleSelect')
}
</script>
