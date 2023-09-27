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
  <v-row v-show="isOICDAuthAvailable()">
    <v-btn
      color="background"
      @click="loginOICD"
      class="loginTypeButton"
    >
      <div class="loginType">
        {{ $t('loginType.keycloak') }}
      </div>
    </v-btn>
  </v-row>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAuthorizationStore } from '@/store/authorization'
import { useOICDAuthorization } from '@/composable/auth/oicdAuthorization'

const { isOICDAuthAvailable } = useOICDAuthorization()

const { t } = useI18n()

const authorizationStore = useAuthorizationStore()

async function loginOICD() {
  authorizationStore.login()
}
</script>

<style lang="scss" scoped>
.loginTypeButton {
  border: rgb(var(--v-theme-surface)) solid 1px;
  .loginType {
    max-width: 500px;
    width: 500px;
  }
}
</style>
