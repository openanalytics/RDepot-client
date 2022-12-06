<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <StepTitile :e1="e1"  step=1 :title="$t('addSubmission.step1Title')" />
      <v-divider></v-divider>
      <StepTitile :e1="e1" step=2 :title="$t('addSubmission.step2Title')" />
      <v-divider></v-divider>
      <StepTitile :e1="e1" step=3 :title="$t('addSubmission.step3Title')" />
    </v-stepper-header>

    <v-stepper-items>
      <StepFirst v-on:next="changeValue" />
      <StepSecond v-on:next="changeValue" />
      <StepThird v-on:next="changeValue" />
    </v-stepper-items>

  </v-stepper>
</template>

<script lang="ts">
import Vue from 'vue'
import StepTitile from './StepTitile.vue'
import StepFirst from './StepFirst.vue'
import StepSecond from './StepSecond.vue'
import StepThird from './StepThird.vue'

export default Vue.extend({
  components: {
    StepTitile,
    StepFirst,
    StepSecond,
    StepThird
  },
  data() {
    return {
      title: 'addSubmission',
      e1: 1,
    }
  },
  computed: {
    submission() {
      return this.$store.state.submission
    },
  },
  methods: {
    changeValue(event: number) {
      this.e1 = event
    }
  }

})
</script>

<stlye scoped>

</stlye>