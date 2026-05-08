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
  <v-container
    class="fill-height d-flex flex-column align-center justify-center text-center"
  >
    <v-img
      :src="penguinImg"
      width="300"
      height="250"
      max-height="550"
      class="mb-6"
      contain
    />
    <h1 class="text-h3 font-weight-bold mb-2">
      {{ $t('messages.errors.badGateway') }}
    </h1>
    <p class="subtitle-1 mb-6">
      {{ $t('messages.errors.502') }}
    </p>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const penguinImg = ref('/images/sadPenguin.png')
</script>

<style scoped lang="scss">
.fill-height {
  height: 100vh;
}
</style>
