<template>
  <div>
    <v-expansion-panels class="v-expansion mx-5">
      <v-expansion-panel class="py-3">
        <SubmissionRow title />
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title
          v-for="(item, index) in submissions"
          :key="index"
          @click="navigate(item)"
          readonly
          id="expansionpaneltitle"
          class="no-icon"
        >
          <SubmissionRow :submission="item" />
        </v-expansion-panel-title>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useSubmissionStore } from '@/store/submission'
import { EntityModelSubmissionDto } from '@/openapi'
import router from '@/router'
import SubmissionRow from './SubmissionRow.vue'

const submission_store = useSubmissionStore()

const submissions = computed<EntityModelSubmissionDto[]>(
  () => {
    return submission_store.submissions
  }
)

function navigate(submission: EntityModelSubmissionDto) {
  if (submission) {
    router.replace({
      name: 'submissionDetails',
      params: {
        name: submission.id
      }
    })
  }
}

function updateState(): void {
  submission_store.fetchSubmissions()
}

onMounted(() => {
  updateState()
})
</script>

<style>
v-expansion {
  max-width: 96% !important;
}

.content {
  text-align: justify;
  font-size: 14px;
  padding: 0 40px 0 0;
}

.v-expansion-panel-title__icon {
  display: none !important;
}

.v-expansion-panel-title {
  padding: 0 !important;
}

.v-col {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.v-input__details {
  display: none !important;
}
</style>
