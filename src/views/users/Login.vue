<template>
  <v-container class="login">
    <v-form
      ref="form_id"
      lazy-validation
      class="form-login"
      v-model="valid"
    >
      <v-img
        src="@/assets/logo.png"
        class="my-3 mb-5"
        contain
        height="200"
      />

      <v-text-field
        class="mt-10"
        v-model="formData.userName"
        :label="$t('authorization.username')"
        :rules="validation.nameRules"
        required
        color="oablue"
        validate-on-blur
      >
      </v-text-field>

      <v-text-field
        v-model="formData.password"
        :label="$t('authorization.password')"
        :rules="validation.passwordRules"
        type="password"
        color="oablue"
        required
        validate-on-blur
      >
      </v-text-field>

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
          @click="clear"
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
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import Keycloak from 'keycloak-js'
import { initKeycloak } from '@/plugins/keycloak'
import { Login, LoginApiData } from '@/models/users/Login'
import { LoginType } from '@/enum/LoginType'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/store/users'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const user_store = useUserStore()

const props = defineProps({
  keycloak: Object as () => Keycloak
})

const formData = ref<Login>({
  error: false,
  errorMessage: '',
  password: '',
  userName: ''
})

const validation = {
  nameRules: [
    (v: string) => !!v || t('authorization.usernameError')
  ],
  passwordRules: [
    (v: string) => !!v || t('authorization.passwordError')
  ]
}

const valid = ref(true)

onMounted(() => {
  clear()
})

const form_id = ref<null | {
  validate: () => false
  reset: () => null
  errors: []
}>(null)

async function validate() {
  if (form_id.value) {
    await form_id.value?.validate()
    valid.value = form_id.value?.errors.length < 1
  } else {
    valid.value = false
  }
}

function clear() {
  form_id.value?.reset()
}

async function login() {
  user_store.chooseLoginType(LoginType.DEFAULT)

  await validate()
  if (valid.value) {
    user_store.login(<LoginApiData>formData.value)
  }
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
