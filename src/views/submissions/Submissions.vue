<template>
  <SubmissionsModal />
  <v-row class="my-3">
    <FiltrationChips :store="submissions_store" />
    <FiltrationButtons />
  </v-row>
  <submission-list />
  <Pagination />
</template>

<script setup lang="ts">
import SubmissionList from '@/components/submissions/SubmissionList.vue'
import FiltrationButtons from '@/components/common/FiltrationButtons.vue'
import SubmissionsModal from '@/components/submissions/SubmissionsModal.vue'
import Pagination from '@/components/common/Pagination.vue'
import FiltrationChips from '@/components/common/chips/FiltrationChips.vue'
import { useSubmissionStore } from '@/store/submission'

const submissions_store = useSubmissionStore()
</script>
