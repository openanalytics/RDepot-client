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
  <span :class="[{ 'mr-8': !noMargin }]">
    {{ prepareText() }}
  </span>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'

const props = defineProps({
  text: {
    type: String
  },
  noMargin: {
    type: Boolean,
    required: false,
    default: false
  }
})

const descMaxLength = ref(110)

function prepareText(): string {
  var text: string | undefined = props.text
  if (text) {
    if (text.length > descMaxLength.value) {
      text.slice(0, descMaxLength.value) + '...'
    }
    return text
  }
  return ''
}
</script>

<style scoped>
span {
  line-height: 1.3;
}
</style>
