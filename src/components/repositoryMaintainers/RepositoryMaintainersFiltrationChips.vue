<template>
  <FiltrationChips
    :values="repository_maintainers_store.filtration"
    :labels="repositoryMaintainersFiltrationLabels"
    v-on:update="updateFiltration"
  />
</template>

<script setup lang="ts">
import { useUtilities } from '@/composable/utilities'
import { repositoryMaintainersFiltrationLabels } from '@/maps/Filtration'
import FiltrationChips from '@/components/common/chips/FiltrationChips.vue'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'

const repository_maintainers_store =
  useRepositoryMaintainersStore()

const { deepCopy } = useUtilities()

function updateFiltration(
  value: string,
  newValues?: string[] | boolean
) {
  var localFiltration = deepCopy(
    repository_maintainers_store.filtration
  )
  localFiltration[value] = newValues
  repository_maintainers_store.setFiltration(
    localFiltration
  )
}
</script>
