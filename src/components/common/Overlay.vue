<template>
  <v-overlay
    :absolute="absolute"
    :value="overlay"
    :opacity="opacity"
  >
    <Filtration
      v-if="packagesFiltration"
      v-on:changeOptions="sendEvent(false)"
    />
    <QuestionCard
      v-else-if="resetPackagesFiltration"
      :text="text"
      v-on:sendEvent="sendEvent"
    />
  </v-overlay>
</template>

<script lang="ts">
import Vue from 'vue'
import Filtration from '@/components/packages/Filtration.vue'
import { OverlayEnum } from '@/enum/Overlay'
import QuestionCard from './QuestionCard.vue'

export default Vue.extend({
  name: 'overlay',
  props: {
    text: String,
    overlay: Boolean,
    opacity: Number,
    component: Number
  },
  data() {
    return {
      absolute: true
    }
  },
  components: {
    Filtration,
    QuestionCard
  },
  computed: {
    packagesFiltration() {
      return (
        this.component == OverlayEnum.PackagesFiltration
      )
    },
    resetPackagesFiltration() {
      return (
        this.component ==
        OverlayEnum.PackagesFiltrationReset
      )
    }
  },
  methods: {
    sendEvent(value: boolean) {
      this.$emit('overlayClicked', value)
    }
  }
})
</script>
