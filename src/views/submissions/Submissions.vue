<template>
  <SubmissionsModal />
  <v-row class="my-3">
    <FiltrationChips
      :values="submissions_store.filtration"
    />
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
import { useSubmissionStore } from '@/store/submission'
import FiltrationChips from '@/components/packages/FiltrationChips.vue'

const submissions_store = useSubmissionStore()
</script>
