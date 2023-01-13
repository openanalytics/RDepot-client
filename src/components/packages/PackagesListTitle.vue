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
import { ref } from 'vue'
import PackageRow from './PackageRow.vue'
export default({
  components: { PackageRow },
  name: 'PackagesList',
  setup(){
    const title = ref(true)
    const disabled = ref(true)

    return{
      title, 
      disabled
    }
  }
})
</script>
