<template>
  <div>
    {{ submission }}
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          {{ $t('addSubmission.step1Title') }}
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          {{ $t('addSubmission.step2Title') }}

        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          {{ $t('addSubmission.step3Title') }}
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <Step step="1" v-on:next="changeValue"/>

        <v-stepper-content step="2">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="e1 = 3">
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="e1 = 1">
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Step from "@/components/addSubmission/Step.vue"

export default Vue.extend({
  components: {
    Step
  },
  data() {
    return {
      title: 'addSubmission',
      e1: 1,
    }
  },

  mounted() {
  },

  computed: {
    submission() {
      return this.$store.state.submission
    },
  },
  methods:{
    changeValue(event: number){
      this.e1 = event
    }
  }

})
</script>

<style scoped lang="scss">

</style>