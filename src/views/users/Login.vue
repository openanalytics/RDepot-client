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
  <v-container class="login">
    <form
      as="v-form"
      ref="form_id"
      lazy-validation
      class="form-login"
    >
      <v-img
        src="@/assets/logo.png"
        class="my-3 mb-5"
        contain
        height="200"
      />

      <validated-input-field
        name="username"
        as="v-text-field"
        class="mt-10"
        :label="$t('authorization.username')"
        color="oablue"
      />

      <validated-input-field
        name="password"
        as="v-text-field"
        :label="$t('authorization.password')"
        type="password"
        color="oablue"
      />

      <v-row class="form-buttons my-10">
        <v-btn
          class="btn mx-2"
          @click="login"
          color="oablue"
        >
          {{ $t('authorization.login') }}
        </v-btn>

        <v-btn
          class="btn mx-2"
          @click="handleReset"
          color="oablue"
        >
          {{ $t('authorization.clear') }}
        </v-btn>
      </v-row>

      <v-row>
        <v-btn
          color="background"
          @click="keyloackMethod"
          class="loginTypeButton"
        >
          <div class="loginType">Keycloak</div>
        </v-btn>
      </v-row>
    </form>
  </v-container>
</template>

<script setup lang="ts">
import Keycloak from 'keycloak-js'
import { initKeycloak } from '@/plugins/keycloak'
import { useUserStore } from '@/store/users'
import { useI18n } from 'vue-i18n'
import { Form, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import { LoginApiData } from '@/models/users/Login'

const { t } = useI18n()
const user_store = useUserStore()

const props = defineProps({
  keycloak: Object as () => Keycloak
})

const { handleReset, values, meta } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      username: z
        .string()
        .nonempty(t('authorization.usernameError')),
      password: z
        .string()
        .nonempty(t('authorization.passwordError'))
    })
  )
})

async function login() {
  user_store.chooseLoginType('DEFAULT')
  if (meta.value.valid)
    user_store.login(values as LoginApiData)
}
function keyloackMethod() {
  initKeycloak()
}
</script>

<style scoped lang="scss">
.login {
  max-width: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .form-login {
    max-width: 500px;
    width: 80%;
    margin: 150px auto 100px auto !important;
  }

  .form-buttons {
    display: flex;
    justify-content: flex-end;
  }

  .loginTypeButton {
    border: rgb(var(--v-theme-surface)) solid 1px;
    .loginType {
      max-width: 500px;
      width: 500px;
    }
  }
}
</style>
