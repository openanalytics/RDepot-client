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
  <validated-input-field
    name="username"
    as="v-text-field"
    class="mt-10"
    :label="$t('authorization.username')"
    color="oablue"
    required
    autofocus
    id="username-input"
  />

  <validated-input-field
    name="password"
    as="v-text-field"
    :label="$t('authorization.password')"
    type="password"
    color="oablue"
    required
    id="password-input"
  />

  <v-row class="form-buttons my-10">
    <v-btn
      class="btn mx-2"
      @click="loginSimple"
      color="oablue"
      id="login-simple-button"
    >
      {{ $t('authorization.login') }}
    </v-btn>

    <v-btn
      class="btn mx-2"
      @click="handleReset"
      color="oablue"
      id="reset-button"
    >
      {{ $t('authorization.clear') }}
    </v-btn>
  </v-row>
</template>

<script setup lang="ts">
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import { useI18n } from 'vue-i18n'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { Form, useForm } from 'vee-validate'
import { Login } from '@/models/users/Login'
import { onKeyStroke } from '@vueuse/core'
import { useAuthorizationStore } from '@/store/authorization'

const { t } = useI18n()
const authorizationStore = useAuthorizationStore()

const { handleReset, values, meta, validate } = useForm({
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

onKeyStroke('Enter', () => {
  loginSimple()
})

async function loginSimple() {
  validate()
  if (meta.value.valid)
    authorizationStore.simpleLogin(values as Login)
}
</script>

<style lang="scss" scoped>
.form-buttons {
  display: flex;
  justify-content: flex-end;
}
</style>