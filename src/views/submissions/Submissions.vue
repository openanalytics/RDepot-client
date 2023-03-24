<template>
  <SubmissionsModal />
  <FiltrationButtons />
  <submission-list />
  <Pagination
    :howManyPages="howManyPages"
    :pageSize="pageSize"
    :page="page"
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

const pageSize = computed({
  get() {
    return submission_store.pageSize
  },
  set: (value) => {
    // if (pageSizeInput.value && pageSizeInput)
    //   if (
    //     pageSizeInput.value &&
    //   )
    //     emit('newPageSize', value)
  }
})

const page = computed({
  get: () => {
    if (submission_store.page)
      return submission_store.page + 1
  },
  set: (value) => {
    if (value) nextPage(value - 1)
  }
})

const howManyPages = computed(function () {
  if (
    submission_store.totalNumber &&
    submission_store.pageSize
  ) {
    return Math.ceil(
      submission_store.totalNumber /
        submission_store.pageSize
    )
  }
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
