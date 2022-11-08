<template>
  <v-container class="login">

    <v-form 
      ref="form" 
      lazy-validation 
      v-model="valid"
      class="form-login"
      >

      <v-img
          :src="require('@/assets/logo.png')"
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
        validate-on-blur>
      </v-text-field>
      
      <v-text-field 
        v-model="formData.password" 
        :label="$t('authorization.password')" 
        type="password"
        :rules="validation.passwordRules" 
        required
        color="oablue"
        validate-on-blur>
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
          color="oablue">
            {{ $t('authorization.clear') }}
        </v-btn>

      </v-row>
      
      <v-row>
        <v-btn @click="keyloackMethod">
          Keycloak
        </v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">

import { Login, LoginApiData } from '@/models'
import Keycloak from 'keycloak-js';
import Vue from 'vue'

export default Vue.extend({
  props:{
    keycloak: Keycloak
  },
  data() {
    return {
      formData: {} as Login,
      validation: {
        nameRules: [
          (v: String) => !!v || this.$t('authorization.usernameError')
        ],
        passwordRules: [
          (v: String) => !!v || this.$t('authorization.passwordError')
        ]
      },
      valid: false
    };
  },

  mounted() {
    this.clear();
  },

  computed: {
    form(): Vue & { validate: () => boolean } {
      return this.$refs.form as Vue & { validate: () => boolean }
    }
  },

  methods: {
    clear(): void {
      (this.$refs.form as Vue & {reset: () => void}).reset()
    },
    validate(): void {
      this.valid = this.form.validate()
    },
    async login() {
      this.validate()
      if (this.valid == true) {       
        this.$store.dispatch("login", {
        data: this.formData as LoginApiData
        });
      }
    },
    keyloackMethod(){
      console.log("keycloak")
    }
  },

});
</script>


<style scoped lang="scss">
  .login{
    max-width: 90%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .form-login{
      max-width: 500px;
      width: 80%;
      margin: 150px auto 100px auto !important; 

    }

    .form-buttons{
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
