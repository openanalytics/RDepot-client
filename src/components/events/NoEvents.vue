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
    <v-card class="elevation-2" v-ripple rounded>
      <v-card-text>{{ $t('events.noEvents') }}</v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
div {
  padding: 30px 20px;
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  font-size: 1.2em;
  font-weight: 600;
}
</style>
