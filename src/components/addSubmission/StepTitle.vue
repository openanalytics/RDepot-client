<template>
  <v-timeline direction="horizontal" side="start">
    <v-timeline-item
      v-for="(t, index) in steps"
      :dot-color="
        e1 >= index + 1 ? 'oablue' : 'oablue-darken-2'
      "
      :size="e1 !== index + 1 ? 'small' : 'default'"
    >
      <div>
        <div class="text-h6" dot-color="oablue-darken-2">
          {{ $t(t) }}
        </div>
        <p></p>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup lang="ts">
const props = defineProps({
  e1: {
    type: Number,
    required: true
  }
})
const steps = [
  'addSubmission.step1Title',
  'addSubmission.step2Title',
  'addSubmission.step3Title'
]
</script>

<style lang="scss">
span {
  font-size: 1.25em !important;
}
span.v-stepper__step__step {
  padding: 15px !important;
}
.v-stepper__label {
  font-size: 1.125em;
}
</style>
