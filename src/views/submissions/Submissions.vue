<template>
  <SubmissionsModal />
  <FiltrationButtons />
  <submission-list />
  <Pagination
    v-on:newPage="nextPage($event)"
    v-on:newPageSize="newPageSize($event)"
  />
</template>

<script setup lang="ts">
import SubmissionList from '@/components/submissions/SubmissionList.vue'
import FiltrationButtons from '@/components/common/FiltrationButtons.vue'
import SubmissionsModal from '@/components/submissions/SubmissionsModal.vue'
import Pagination from '@/components/common/Pagination.vue'
import { computed } from 'vue'
import { useSubmissionStore } from '@/store/submission'
import { useCommonStore } from '@/store/common'

const submission_store = useSubmissionStore()
const common_store = useCommonStore()

const page = computed(function () {
  return submission_store.page
})

function nextPage(value: number) {
  submission_store.setPage(value)
  common_store.updateKey()
}

function newPageSize(value: number) {
  submission_store.setPageSize(value)
  common_store.updateKey()
}
</script>
