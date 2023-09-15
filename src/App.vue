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
  <v-app>
    <Navbar style="max-width: 100%" />
    <div class="d-flex">
      <v-row style="margin: 0">
        <Sidebar />
        <ProgressCircular />
        <v-main>
          <router-view
            :key="componentKey"
            style="margin: 0 15px"
          ></router-view>
        </v-main>
      </v-row>
    </div>
    <notifications
      position="top right"
      :max="5"
      pauseOnHover
    />
  </v-app>
</template>

<script setup lang="ts">
import Sidebar from '@/components/navbar/Sidebar.vue'
import Navbar from '@/components/navbar/Navbar.vue'
import ProgressCircular from './components/common/progress/ProgressCircular.vue'
import { computed } from 'vue'
import { useCommonStore } from './store/common'

const commonStore = useCommonStore()
const componentKey = computed(() => {
  return commonStore.key
})
</script>
