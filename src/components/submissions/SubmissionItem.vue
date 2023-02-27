<template>
  <v-expansion-panel>
    <v-expansion-panel-title
      @click="navigate"
      readonly
      id="expansionpaneltitle"
      class="no-icon"
    >
      <submission-row :submission="props.submission" />
    </v-expansion-panel-title>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { EntityModelSubmissionDto } from '@/openapi'
import router from '@/router'
import SubmissionRow from './SubmissionRow.vue'

const props = defineProps({
  submission: Object as () => EntityModelSubmissionDto
})

function navigate() {
  if (props.submission) {
    router.replace({
      name: 'submissionDetails',
      params: {
        name: props.submission.id
      }
    })
  }
}
</script>

<style lang="scss">
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
</style>
