<template>
  <div v-show="active" class="progressCircular">
    <v-progress-circular
      id="progress-circular"
      indeterminate
      color="oared"
    >
    </v-progress-circular>
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common'
import { computed } from 'vue'

const common_store = useCommonStore()

const active = computed(() => {
  return common_store.progressCircularActive
})
</script>

<style scoped lang="scss">
.progressCircular {
  z-index: 10000;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding-top: 49%;
  overflow: hidden;
  background-color: rgba(3, 3, 3, 0.3);
  div {
    margin: 0 auto;
  }
}
</style>
