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
  <div v-show="active" class="progressCircular">
    <v-progress-circular
      id="progress-circular"
      indeterminate
      color="oared"
    >
    </v-progress-circular>
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common'
import { computed } from 'vue'

const commonStore = useCommonStore()

const active = computed(() => {
  return commonStore.progressCircularActive
})
</script>

<style scoped lang="scss">
.progressCircular {
  z-index: 10000;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding-top: 49%;
  overflow: hidden;
  background-color: rgba(3, 3, 3, 0.3);
  div {
    margin: 0 auto;
  }
}
</style>
