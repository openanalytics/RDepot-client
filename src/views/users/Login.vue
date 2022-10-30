<template>
  <v-container>
    <v-form 
      ref="form" 
      lazy-validation 
      v-model="valid">
      
      <v-text-field 
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
      
      <v-btn 
        @click="login">
          login
      </v-btn>

      <v-btn 
        @click="clear">
          clear
      </v-btn>
    
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
