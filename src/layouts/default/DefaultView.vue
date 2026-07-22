<!--
 R Depot
 
 Copyright (C) 2012-2026 Open Analytics NV
 
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
  <Navbar style="max-width: 100%; position: sticky" />
  <Sidebar
    v-if="!commonStore.error502"
    style="height: calc(100vh - 64px); position: fixed"
  />
  <v-main
    style="--v-layout-top: 15px; --v-layout-bottom: 15px"
    class="mx-5"
  >
    <ConnectionBanner />
    <BadGateway v-if="commonStore.error502" />
    <router-view v-else />
  </v-main>
</template>

<script lang="ts" setup>
import Navbar from '@/components/navbar/AppNavbar.vue'
import Sidebar from '@/components/navbar/AppSidebar.vue'
import BadGateway from '@/views/BadGateway.vue'
import ConnectionBanner from '@/components/common/ConnectionBanner.vue'
import { useCommonStore } from '@/store/options/common'

const commonStore = useCommonStore()
</script>
