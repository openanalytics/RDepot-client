<template>
  <v-expansion-panel>
    <v-expansion-panel-header
      expand-icon=""
      :disabled="disabled"
    >
      <package-row :title="title" />
    </v-expansion-panel-header>
  </v-expansion-panel>
</template>

<script lang="ts">
import Vue from 'vue'
import PackageRow from './PackageRow.vue'
export default Vue.extend({
  components: { PackageRow },
  name: 'PackagesList',
  data() {
    return { title: true, disabled: true }
  }
})
</script>
