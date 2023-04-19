<template>
  <v-container class="login">
    <Form
      as="v-form"
      :validation-schema="validationSchema"
      ref="form_id"
      lazy-validation
      class="form-login"
      v-slot="{ handleReset, values, meta }"
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
        required
        color="oablue"
        validate-on-blur
      />

      <validated-input-field
        name="password"
        as="v-text-field"
        :label="$t('authorization.password')"
        type="password"
        color="oablue"
        required
        validate-on-blur
      />

      <v-row class="form-buttons my-10">
        <v-btn
          class="btn mx-2"
          @click="login(values, meta.valid)"
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
    </Form>
  </v-container>
</template>

<script setup lang="ts">
import Keycloak from 'keycloak-js'
import { initKeycloak } from '@/plugins/keycloak'
import { LoginType } from '@/enum/LoginType'
import { useUserStore } from '@/store/users'
import { useI18n } from 'vue-i18n'
import { Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'

const { t } = useI18n()
const user_store = useUserStore()

const validationSchema = toTypedSchema(
  z.object({
    username: z
      .string()
      .nonempty(t('authorization.usernameError')),
    password: z
      .string()
      .nonempty(t('authorization.passwordError'))
  })
)
const props = defineProps({
  keycloak: Object as () => Keycloak
})

async function login(values: any, valid: boolean) {
  user_store.chooseLoginType('DEFAULT')
  if (valid) user_store.login(values)
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
