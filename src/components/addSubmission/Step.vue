<template>
  <div>
    <v-stepper-content :step="step" >
      <v-card class="mb-12 px-10 py-5 step"  height="200px" >
        <StepFirst v-if="step == '1'">
        </StepFirst>

      </v-card>

      <v-btn color="primary" @click="$emit('next', nextStep)">
        Continue
      </v-btn>

      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import StepFirst from './StepFirst.vue'

export default Vue.extend({
  props: {
    step: String
  },
  components: {
    StepFirst
  },
  data() {
    return {
    }
  },

  mounted() {
  },

  computed: {
    nextStep(){
      if (this.step == '1'){
        return 2
      } else if( this.step == '2'){
        return 3
      } else{
        return 1
      }
    }
  },

})
</script>

<style lang="scss">
  .v-text-field input{
    font-size: 32px !important;
  }
</style>