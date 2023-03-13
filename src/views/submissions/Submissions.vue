<template>
  <SubmissionsModal />
  <FiltrationButtons />
  <submission-list />
</template>

<script setup lang="ts">
import SubmissionList from '@/components/submissions/SubmissionList.vue'
import FiltrationButtons from '@/components/common/FiltrationButtons.vue'
import SubmissionsModal from '@/components/submissions/SubmissionsModal.vue'
</script>
