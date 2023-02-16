<template>
  <v-expansion-panel>
    <ShortPackageRow :title="title" />
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ShortPackageRow from '@/components/packages/shortPackages/ShortPackageRow.vue'
const title = ref(true)
</script>
