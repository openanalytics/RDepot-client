<template>
  <FiltrationChips
    :values="events_store.filtration"
    :labels="eventsFiltrationLabels"
    v-on:update="updateFiltration"
  />
</template>

<script setup lang="ts">
import { useUtilities } from '@/composable/utilities'
import { eventsFiltrationLabels } from '@/maps/Filtration'
import FiltrationChips from '@/components/common/chips/FiltrationChips.vue'
import { useEventsStore } from '@/store/events'

const events_store = useEventsStore()

const { deepCopy } = useUtilities()

function updateFiltration(
  value: string,
  newValues?: string[] | boolean
) {
  var localFiltration = deepCopy(events_store.filtration)
  localFiltration[value] = newValues
  events_store.setFiltration(localFiltration)
}
</script>
