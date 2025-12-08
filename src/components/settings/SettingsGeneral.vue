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
  <div class="d-flex flex-row" style="align-items: center">
    <h2 class="my-5">
      {{ i18n.t('resources.settings') }}
    </h2>
  </div>
  <SettingsTable />
</template>

<script setup lang="ts">
import SettingsTable from '@/components/settings/SettingsTable.vue'
import { i18n } from '@/plugins/i18n'
</script>

<style scoped type="scss">
s .settings-container {
  max-width: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .settings-card {
    width: 100%;
  }
}
</style>
