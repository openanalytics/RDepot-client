<template>
  <v-row class="ml-10 mt-5">
    <div
      v-for="(field, i) in store.filtration"
      :key="i"
      v-show="field != undefined"
    >
      <chip
        v-if="typeof field == 'boolean' && field != false"
        :label="labels.get(i)"
        v-on:update="updateFiltration(i, !field)"
      />
      <chip
        v-else-if="
          typeof field == 'string' ||
          typeof field == 'number'
        "
        :label="labels.get(i)"
        v-on:update="updateFiltration(i)"
        :value="field"
      />
      <span
        v-else-if="typeof field == 'object'"
        v-for="(value, index) in field"
        :key="index"
      >
        <chip
          :label="labels.get(i)"
          :value="value.toString()"
          v-on:update="updateFiltration(i, value, field)"
        />
      </span>
    </div>
  </v-row>
</template>

<script setup lang="ts">
import { useUtilities } from '@/composable/utilities'
import Chip from './Chip.vue'

const props = defineProps<{
  store: {
    filtration: Record<
      string,
      string | boolean | string[] | number | undefined
    >
    getLabels: Function
    setFiltration: Function
  }
}>()

const { deepCopy } = useUtilities()
const labels: Map<string, string> = props.store.getLabels()

function updateFiltration(
  fieldName: string,
  value?: string | boolean,
  field?: string[]
) {
  const localFiltration = deepCopy(props.store.filtration)
  let newValue: string | boolean | string[] | undefined =
    undefined
  if (field && value) {
    field = field.filter((fieldValue) => {
      return fieldValue != value
    })
    newValue = field
  } else if (value != undefined) {
    newValue = value
  }
  localFiltration[fieldName] = newValue
  props.store.setFiltration(localFiltration)
}
</script>
