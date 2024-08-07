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
  <span class="d-flex align-center">
    <v-checkbox-btn
      v-if="isSelected"
      :id="`checkbox-actions-submission-${
        item.packageBag?.name
      }-${item.packageBag?.version?.replaceAll('.', '-')}-${
        item.packageBag?.repository?.name
      }`"
      :model-value="true"
      :disabled="isPending(item)"
      @click.stop
      @update:model-value="toggleSelect"
    />
    <v-checkbox-btn
      v-else
      :id="`checkbox-actions-submission-${
        item.packageBag?.name
      }-${item.packageBag?.version?.replaceAll('.', '-')}-${
        item.packageBag?.repository?.name
      }`"
      :model-value="false"
      :disabled="isPending(item)"
      @click.stop
      @update:model-value="toggleSelect"
    />
  </span>
</template>

<script setup lang="ts">
import { useSubmissionStore } from '@/store/submission'
import { EntityModelSubmissionDto } from '@/openapi'

defineProps({
  item: {
    type: Object as () => EntityModelSubmissionDto,
    required: true
  },
  isSelected: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['toggleSelect'])

function toggleSelect() {
  emit('toggleSelect')
}

const submissionStore = useSubmissionStore()

function isPending(
  item: EntityModelSubmissionDto
): boolean {
  return !!submissionStore.pending.find(
    (submission) => submission.id == item.id
  )
}
</script>
