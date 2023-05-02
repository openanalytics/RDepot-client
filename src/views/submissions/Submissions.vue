<template>
  <SubmissionsModal />
  <FiltrationButtons />
  <submission-list />
  <Pagination />
</template>

<script setup lang="ts">
import SubmissionList from '@/components/submissions/SubmissionList.vue'
import FiltrationButtons from '@/components/common/FiltrationButtons.vue'
import SubmissionsModal from '@/components/submissions/SubmissionsModal.vue'
import Pagination from '@/components/common/Pagination.vue'
</script>
