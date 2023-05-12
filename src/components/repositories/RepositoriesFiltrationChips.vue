<template>
  <FiltrationChips
    :values="repositories_store.filtration"
    :labels="repositoriesFiltrationLabels"
    v-on:update="updateFiltration"
  />
</template>

<script setup lang="ts">
import { useUtilities } from '@/composable/utilities'
import { repositoriesFiltrationLabels } from '@/maps/Filtration'
import FiltrationChips from '@/components/common/chips/FiltrationChips.vue'
import { useRepositoryStore } from '@/store/repositories'

const repositories_store = useRepositoryStore()

const { deepCopy } = useUtilities()

function updateFiltration(
  value: string,
  newValues?: string[] | boolean
) {
  var localFiltration = deepCopy(
    repositories_store.filtration
  )
  localFiltration[value] = newValues
  repositories_store.setFiltration(localFiltration)
}
</script>
