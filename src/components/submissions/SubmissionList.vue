<template>
  <div>
    <v-expansion-panels class="v-expansion mx-5">
      <SubmissionListTitle />
      <SubmissionItem
        v-for="(item, index) in submissions"
        :key="index"
        :repository="item"
      />
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import SubmissionListTitle from './SubmissionListTitle.vue'
import SubmissionItem from './SubmissionItem.vue'
import { useSubmissionState } from '@/store/submission'
import { EntityModelSubmissionDto } from '@/openapi'

const submission_store = useSubmissionState()

const submissions = computed<EntityModelSubmissionDto[]>(
  () => {
    return submission_store.submissions
  }
)

function updateState(): void {
  submission_store.fetchSubmissions()
}

onMounted(() => {
  updateState()
})
</script>

<style>
.v-expansion {
  max-width: 96% !important;
}
</style>
