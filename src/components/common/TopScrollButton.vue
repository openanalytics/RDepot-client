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
  <v-layout-item
    v-scroll="onScroll"
    class="text-end pointer-events-none"
    model-value
    style="position: fixed"
    position="bottom"
    size="88"
  >
    <div class="ma-4">
      <v-fab-transition>
        <v-btn
          v-show="showFab"
          class="mt-auto pointer-events-initial"
          color="primary"
          elevation="8"
          icon="mdi-chevron-up"
          size="large"
          @click="toTop"
        />
      </v-fab-transition>
    </div>
  </v-layout-item>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showFab = ref(false)

function onScroll(e: Event) {
  if (typeof window === 'undefined') return
  const top = window.scrollY || 0
  showFab.value = top > 20
}

function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>
