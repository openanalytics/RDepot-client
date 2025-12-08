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
  <v-container
    class="fill-height d-flex flex-column justify-center align-center text-center"
  >
    <v-icon size="96" color="primary">{{
      Icons.get('circleAlert')
    }}</v-icon>
    <h1 class="text-h3 font-weight-bold mb-2">
      {{ $t('messages.errors.pageNotFound') }}
    </h1>
    <p class="text-subtitle-1 mb-6">
      {{ $t('messages.errors.404') }}
    </p>
    <v-btn
      color="primary"
      variant="flat"
      @click="$router.back()"
    >
      {{ $t('actions.general.goBack') }}
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import Icons from '@/maps/Icons'
</script>

<style scoped lang="scss"></style>
