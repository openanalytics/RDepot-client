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
  <VTooltip location="bottom" :disabled="!showTooltip">
    <template #activator="{ props }">
      <slot :props="props">
        <span
          class="truncatedText"
          v-bind="props"
          :class="[{ 'mr-8': !noMargin }]"
          ref="overflowEffect"
        >
          {{ text }}
        </span>
      </slot>
    </template>
    <span
      >{{ hoverMessage ? hoverMessage : text }}
      <br />
    </span>
  </VTooltip>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

defineProps({
  text: {
    type: String
  },
  noMargin: {
    type: Boolean,
    required: false,
    default: false
  },
  hoverMessage: {
    type: String,
    required: false
  }
})

const overflowEffect = ref<HTMLSpanElement>()

const showTooltip = computed(() => {
  if (overflowEffect.value) {
    return (
      overflowEffect.value.offsetWidth <
      overflowEffect.value.scrollWidth
    )
  }
  return false
})
</script>

<style lang="scss">
span {
  z-index: 100;
}

.truncatedText {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
