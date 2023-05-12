<template>
  <FiltrationChips
    :values="package_maintainers_store.filtration"
    :labels="packageMaintainersFiltrationLabels"
    v-on:update="updateFiltration"
  />
</template>

<script setup lang="ts">
import { useUtilities } from '@/composable/utilities'
import { packageMaintainersFiltrationLabels } from '@/maps/Filtration'
import FiltrationChips from '@/components/common/chips/FiltrationChips.vue'
import { usePackageMaintainersStore } from '@/store/package_maintainers'

const package_maintainers_store =
  usePackageMaintainersStore()

const { deepCopy } = useUtilities()

function updateFiltration(
  value: string,
  newValues?: string[] | boolean
) {
  var localFiltration = deepCopy(
    package_maintainers_store.filtration
  )
  localFiltration[value] = newValues
  package_maintainers_store.setFiltration(localFiltration)
}
</script>
