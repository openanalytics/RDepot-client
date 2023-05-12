<template>
  <FiltrationChips
    :values="submissions_store.filtration"
    :labels="submissionsFiltrationLabels"
    v-on:update="updateFiltration"
  />
</template>

<script setup lang="ts">
import { useUtilities } from '@/composable/utilities'
import { submissionsFiltrationLabels } from '@/maps/Filtration'
import FiltrationChips from '@/components/common/chips/FiltrationChips.vue'
import { useSubmissionStore } from '@/store/submission'

const submissions_store = useSubmissionStore()

const { deepCopy } = useUtilities()

function updateFiltration(
  value: string,
  newValues?: string[] | boolean
) {
  var localFiltration = deepCopy(
    submissions_store.filtration
  )
  localFiltration[value] = newValues
  submissions_store.setFiltration(localFiltration)
}
</script>
