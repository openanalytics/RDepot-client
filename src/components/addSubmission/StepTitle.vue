<template>
  <v-timeline direction="horizontal">
    <v-timeline-item
      :dot-color="e1 > 0 ? 'oablue' : 'oablue-darken-2'"
    >
      <div>
        <div class="text-h6" dot-color="oablue-darken-2">
          {{ $t('addSubmission.step1Title') }}
        </div>
        <p></p>
      </div>
    </v-timeline-item>

    <v-timeline-item
      :dot-color="e1 > 1 ? 'oablue' : 'oablue-darken-2'"
    >
      <template v-slot:opposite>
        <div>
          <div class="text-h6">
            {{ $t('addSubmission.step2Title') }}
          </div>
          <p></p>
        </div>
      </template>
    </v-timeline-item>

    <v-timeline-item
      :dot-color="e1 > 2 ? 'oablue' : 'oablue-darken-2'"
    >
      <div>
        <div class="text-h6">
          {{ $t('addSubmission.step3Title') }}
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
