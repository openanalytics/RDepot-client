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
  <div v-if="isSimpleAuthAvailable()">
    <validated-input-field
      id="username-input"
      name="username"
      as="v-text-field"
      class="mt-10"
      :label="$t('forms.authorization.username')"
      color="primary"
      required
      autofocus
      max-width="unset"
    />

    <validated-input-field
      id="password-input"
      name="password"
      as="v-text-field"
      :label="$t('forms.authorization.password')"
      type="password"
      color="primary"
      required
      max-width="unset"
    />

    <v-row class="form-buttons my-10">
      <v-col>
        <v-tooltip :disabled="meta.valid && meta.touched">
          <template #activator="{ props }">
            <span v-bind="props">
              <v-btn
                id="login-simple-button"
                style="width: 100%; justify-self: center"
                class="btn"
                color="primary"
                :disabled="!meta.valid || !meta.touched"
                @click="loginSimple"
              >
                {{ i18n.t('actions.general.login') }}
              </v-btn>
            </span>
          </template>
          <span>
            {{ i18n.t('messages.errors.invalidForm') }}
          </span>
        </v-tooltip>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { Login } from '@/models/users/Login'
import { onKeyStroke } from '@vueuse/core'
import { useAuthorizationStore } from '@/store/options/authorization'
import { useSimpleAuthorization } from '@/composable/auth/simpleAuthorization'
import { useSimpleLoginValidationSchema } from '@/composable/auth/simpleLoginSchema'
import { i18n } from '@/plugins/i18n'

const authorizationStore = useAuthorizationStore()
const { isSimpleAuthAvailable } = useSimpleAuthorization()
const { simpleLoginSchema } =
  useSimpleLoginValidationSchema()

const { values, meta } = useForm({
  validationSchema: toTypedSchema(simpleLoginSchema)
})

onKeyStroke('Enter', () => {
  loginSimple()
})

async function loginSimple() {
  authorizationStore.simpleLogin(values as Login)
}
</script>

<style lang="scss" scoped>
.form-buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
