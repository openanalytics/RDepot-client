<template>
  <v-expansion-panel>
    <submission-row :title="title" />
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SubmissionRow from '@/components/submissions/SubmissionRow.vue'
const title = ref(true)
</script>
