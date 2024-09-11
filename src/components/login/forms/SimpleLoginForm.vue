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
  <div v-if="isSimpleAuthAvailable()">
    <validated-input-field
      id="username-input"
      name="username"
      as="v-text-field"
      class="mt-10"
      :label="$t('authorization.username')"
      color="oablue"
      required
      autofocus
      max-width="unset"
    />

    <validated-input-field
      id="password-input"
      name="password"
      as="v-text-field"
      :label="$t('authorization.password')"
      type="password"
      color="oablue"
      required
      max-width="unset"
    />

    <v-row class="form-buttons my-10">
      <v-col>
        <v-btn
          id="login-simple-button"
          style="width: 100%; justify-self: center"
          class="btn"
          color="oablue"
          @click="loginSimple"
        >
          {{ $t('authorization.login') }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import { useI18n } from 'vue-i18n'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { Login } from '@/models/users/Login'
import { onKeyStroke } from '@vueuse/core'
import { useAuthorizationStore } from '@/store/options/authorization'
import { useSimpleAuthorization } from '@/composable/auth/simpleAuthorization'

const { t } = useI18n()
const authorizationStore = useAuthorizationStore()
const { isSimpleAuthAvailable } = useSimpleAuthorization()

const { values, meta, validate } = useForm({
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
  await validate()
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
