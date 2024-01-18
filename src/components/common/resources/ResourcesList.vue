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
  <v-expansion-panels
    variant="inset"
    class="v-expansion mx-8"
  >
    <v-expansion-panel class="py-3">
      <slot name="title" title></slot>
    </v-expansion-panel>
    <EmptyListing
      v-show="resources === undefined || !resources.length"
    />
    <v-expansion-panel
      class="mx-5"
      v-for="(item, index) in resources"
      :key="index"
    >
      <v-expansion-panel-title
        :readonly="!expand"
        id="expansion-panel-title"
        class="no-icon"
        @click="handleClick(item)"
      >
        <slot
          name="expansion-row"
          v-if="item"
          :resource="item"
        ></slot>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div class="content mt-2">
          <slot
            name="expansion-text"
            :resource="item"
          ></slot>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import EmptyListing from '@/components/common/resources/EmptyListing.vue'

const props = defineProps({
  resources: {
    type: Array,
    required: true
  },
  onClickAction: {
    type: Function,
    required: false
  },
  expand: {
    type: Boolean,
    required: false,
    default: false
  }
})

function handleClick(item: any) {
  if (props.onClickAction != undefined) {
    props.onClickAction(item)
  }
}
</script>

<style lang="scss">
.title {
  font-weight: 600 !important;
}
.v-expansion {
  max-width: 96% !important;
}

.content {
  text-align: justify;
  font-size: 14px;
  padding: 0 40px 0 0;
}

.v-expansion-panel-title__icon {
  display: none !important;
}

.v-expansion-panel-title {
  padding: 0 !important;
}

.no-icon {
  .v-input__details {
    display: none !important;
  }
}

.no-icon {
  .v-input__details {
    display: none !important;
  }
}
</style>
