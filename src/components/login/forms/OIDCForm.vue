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
  <v-row v-show="isOIDCAuthAvailable()">
    <v-btn
      id="OIDC-button"
      color="background"
      class="loginTypeButton"
      @click="loginOIDC"
    >
      <div class="loginType">
        {{ $t('messages.authorization.oidc') }}
      </div>
    </v-btn>
  </v-row>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAuthorizationStore } from '@/store/options/authorization'
import { useOIDCAuthorization } from '@/composable/auth/oidcAuthorization'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { authService as oauthService } from '@/plugins/oauth'
import {
  registerUserLoggedInEventListener,
  registerUserLoggedOutEventListener
} from '@/plugins/eventsBus'
import { useToast } from '@/composable/toasts'

const { isOIDCAuthAvailable } = useOIDCAuthorization()

const { t } = useI18n()

const authorizationStore = useAuthorizationStore()

const isUserLoggedIn = ref<boolean>(false)

const toasts = useToast()

async function loginOIDC() {
  authorizationStore.login()
}

onMounted(() => {
  oauthService
    .isUserLoggedIn()
    .then((isLoggedIn) => {
      isUserLoggedIn.value = isLoggedIn
    })
    .catch(() => {
      toasts.error(t('errors.oauth'))
    })

  registerUserLoggedInEventListener(() => {
    isUserLoggedIn.value = true
  })
  registerUserLoggedOutEventListener(() => {
    isUserLoggedIn.value = false
  })
})
</script>

<style lang="scss" scoped>
.loginTypeButton {
  margin-top: 50px;
  border: rgb(var(--v-theme-on-background)) solid 1px;
  .loginType {
    max-width: 500px;
    width: 500px;
  }
  background-color: rgba(
    var(--v-theme-on-background),
    0.2
  ) !important;
}
</style>
