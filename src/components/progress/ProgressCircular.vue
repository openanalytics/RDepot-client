<template>
  <div>
    <div style="color: red; fot-size: 64px;"> {{active}}
    </div>
    <v-progress-circular 
    v-if="active" 
    class="progressCircular" 
    indeterminate 
    color="oared">
  </v-progress-circular>
</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ProgressCircular',
  mounted() {
    this.updateState()
  },

  computed: {
    active() {
      return this.$store.state.common.progressCircularActive
    },
  },
  methods: {
    updateState(): void {
      this.$store.dispatch('setProgressCircularActive');
      console.log(this.$store.state.common.progressCircularActive)
    }
  }
})
</script>

<style scoped lang="scss">
.progressCircular {
  z-index: 10;
}
</style>