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
  <div>
    {{ packagesStore.packages[0]?.name }}
    {{ packagesStore.packages[0]?.repository }}
    {{ packagesStore.packages[0]?.user?.name }} ({{
      packagesStore.packages[0]?.user?.email
    }})
    {{ packagesStore.packages[0]?.description }}
  </div>
  <v-timeline
    v-if="
      packagesStore.packages != undefined &&
      packagesStore.packages.length > 0
    "
    side="end"
    ref="packagesTimeline"
    id="packagesTimeline"
    align="center"
  >
    <v-timeline-item
      v-for="(item, i) in packagesStore.packages"
      :key="i"
      dot-color="oablue-darken-2"
      class="default"
      :hide-dot="!item"
      min-height="90"
      max-width="1040"
      hover-color="oablue"
    >
      <v-card size="small">
        <v-card-title class="bg-oablue-darken-2">
          <h2>{{ item.version }}</h2>
        </v-card-title>
        <v-card-text>
          <v-btn>download</v-btn>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup lang="ts">
import { usePackagesStore } from '@/store/packages'
import { onMounted } from 'vue'

const packagesStore = usePackagesStore()

onMounted(() => {
  packagesStore.fetchPackages()
})
</script>

<style lang="scss">
.bg-oablue-darken-2 {
  background-color: rgb(
    var(--v-theme-oablue-darken-2)
  ) !important;
  &:hover {
    background-color: rgb(var(--v-theme-oablue)) !important;
    color: rgb(var(--v-theme-oablue));
    cursor: pointer;
  }
}
</style>
