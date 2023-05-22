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
  <span
    :id="getId"
    class="chip-section"
    @click="$emit('update')"
  >
    <v-chip class="pa-4 mr-3" link>
      {{ label }} <span v-if="value">: {{ value }}</span>
    </v-chip>
    <v-icon
      icon="mdi-close-circle"
      size="s"
      class="icon"
    ></v-icon>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  label: String,
  value: {
    type: Object as () => String | Number,
    required: false
  }
})

const getId = computed(() => {
  return props.label?.split(' ').join('_')
})
</script>

<style scoped lang="scss">
.chip-section {
  position: relative;
  .icon {
    display: none;
    z-index: 10;
    position: absolute;
    right: 8px;
    top: -8px;

    &:hover {
      cursor: pointer;
    }
  }

  &:hover {
    .icon {
      display: block;
    }
  }
}
</style>
