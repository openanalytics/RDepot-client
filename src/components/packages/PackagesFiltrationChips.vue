<template>
  <FiltrationChips
    :values="packages_store.filtration"
    :labels="packagesFiltrationLabels"
    v-on:update="updateFiltration"
  />
</template>

<script setup lang="ts">
import { useUtilities } from '@/composable/utilities'
import { packagesFiltrationLabels } from '@/maps/Filtration'
import { usePackagesStore } from '@/store/packages'
import FiltrationChips from '@/components/common/chips/FiltrationChips.vue'

const packages_store = usePackagesStore()

const { deepCopy } = useUtilities()

function updateFiltration(
  value: string,
  newValues?: string[] | boolean
) {
  var localFiltration = deepCopy(packages_store.filtration)
  localFiltration[value] = newValues
  packages_store.setFiltration(localFiltration)
}
</script>
