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
        label="Name" 
        :rules="validation.nameRules" 
        required 
        validate-on-blur>
      </v-text-field>
      
      <v-text-field 
        v-model="formData.password" 
        label="Password" 
        type="password"
        :rules="validation.passwordRules" 
        required
        validate-on-blur>
      </v-text-field>
      
      <v-row class="form-buttons my-10">

        <v-btn 
          class="btn mx-2"
          @click="login"
          color="primary"
          >
            login
        </v-btn>
      
        <v-btn
          class="btn mx-2" 
          @click="clear"
          color="primary">
            clear
        </v-btn>

      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">

import { Login, LoginApiData } from '@/models'
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      formData: {} as Login,
      validation: {
        nameRules: [
          (v: String) => !!v || 'Name is required',
        ],
        passwordRules: [
          (v: String) => !!v || "Password is required"
        ]
      },
      valid: true
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
      this.form.validate()
    },
    async login() {
      this.form.validate()
      if (this.valid) {

        console.log("valid form")
           this.$store.dispatch("login", {
            data: this.formData as LoginApiData
           });
      }
    },
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
      margin: 100px auto !important; 

    }

    .form-buttons{
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
