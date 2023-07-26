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
          <div class="loginType">
            {{ $t('loginType.keycloak') }}
          </div>
        </v-btn>
      </v-row>
    </form>
  </v-container>
  <v-btn @click="getUserInfo"> user info </v-btn>
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
import { useLoggedUserStore } from '@/store/logged_user'
import { onMounted } from 'vue'
import { useTheme } from 'vuetify/lib/framework.mjs'
import { i18n } from '@/plugins/i18n'
import { usePagination } from '@/composable/pagination'

const { t, locale } = useI18n()
const user_store = useUserStore()
const logged_user_store = useLoggedUserStore()
const theme = useTheme()
const { newPageSizeWithoutRefresh } = usePagination()

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
}

async function getUserInfo() {
  await logged_user_store.getUserInfo()
  setTheme()
  setLanguage()
  setPageSize()
}

function keyloackMethod() {
  initKeycloak()
}

function setTheme() {
  if (logged_user_store.me.userSettings?.theme)
    theme.global.name.value =
      logged_user_store.me.userSettings.theme
}

function setLanguage() {
  if (logged_user_store.me.userSettings?.language) {
    switch (logged_user_store.me.userSettings.language) {
      case 'en-EN': {
        i18n.locale.value = 'en'
        break
      }
      case 'pl-PL': {
        i18n.locale.value = 'pl'
        break
      }
      default: {
        break
      }
    }
  }
}

function setPageSize() {
  if (logged_user_store.me.userSettings?.pageSize) {
    newPageSizeWithoutRefresh(
      logged_user_store.me.userSettings.pageSize
    )
  }
}

onMounted(() => {
  setTheme()
  setLanguage()
  setPageSize()
})
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
