<template>
  <ResourcesList :resources="submission_store.submissions">
    <template #title>
      <SubmissionRow title />
    </template>
    <template #expansion-row="slotProps">
      <SubmissionRow :submission="slotProps.resource" />
    </template>
  </ResourcesList>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useSubmissionStore } from '@/store/submission'
import SubmissionRow from '@/components/submissions/SubmissionRow.vue'
import ResourcesList from '@/components/common/resources/ResourcesList.vue'

const submission_store = useSubmissionStore()

function updateData(): void {
  submission_store.fetchSubmissions()
}

onBeforeMount(() => {
  updateData()
})
</script>