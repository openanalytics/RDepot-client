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
  <div class="d-flex flex-row" style="align-items: center">
    <h2 class="my-5">
      {{ $t('common.settings') }}
    </h2>
  </div>
  <TableSettings />
</template>

<script setup lang="ts">
import TableSettings from '@/components/settings/TableSettings.vue'
</script>

<style scoped type="scss">
.settings-container {
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
