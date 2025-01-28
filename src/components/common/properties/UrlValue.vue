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
  <span>
    <span
      v-for="(word, i) in toParseValue.split(' ')"
      :key="i"
    >
      <span v-if="urls?.includes(word)">
        <a
          :href="
            urls[urls?.indexOf(word)].replaceAll(',', '')
          "
          target="_blank"
          >{{ word }}</a
        >
      </span>
      <span v-else
        >{{ word.replaceAll('\\n', ' ') }}&ensp;</span
      >
    </span>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const componentProps = defineProps({
  toParseValue: {
    type: String,
    required: true
  }
})

const regex =
  /(http|https|ftp|ftps):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?/g

const urls = computed(() =>
  componentProps.toParseValue.match(regex)
)
</script>
