<template>
  <div>
    <v-progress-circular
      id="progresscircular"
      v-if="active"
      class="progressCircular"
      indeterminate
      color="oared"
    >
    </v-progress-circular>
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common'
import { computed, onMounted } from 'vue'

const common_store = useCommonStore()

const active = computed(() => {
  return common_store.progressCircularActive
})

function updateState(): void {
  common_store.setProgressCircularActive(true)
}

onMounted(() => {
  updateState()
})
</script>

<style scoped lang="scss">
.progressCircular {
  z-index: 10;
}
</style>
