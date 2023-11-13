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
  <v-container class="account-container">
    <v-card class="mx-auto account-card" variant="elevated">
      <v-card-item>
        <v-card-title> User Account </v-card-title>
        <v-card-text>
          <v-form lazy-validation>
            <AccountDetails />
          </v-form>
        </v-card-text>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import AccountDetails from '@/components/account/AccountDetails.vue'
</script>

<style scoped type="scss">
.account-container {
  max-width: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .account-card {
    width: 100%;
  }
}
</style>
