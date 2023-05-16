<template>
  <v-row class="ml-10 mt-5">
    <div
      v-for="(field, i) in values"
      :key="i"
      v-show="field != undefined"
    >
      <chip
        v-if="typeof field == 'boolean' && field != false"
        :label="labels?.get(i)"
        v-on:update="updateFiltration(i, !field)"
      />
      <chip
        v-else-if="
          typeof field == 'string' ||
          typeof field == 'number'
        "
        :label="labels?.get(i)"
        v-on:update="updateFiltration(i)"
        :value="field"
      />
      <span
        v-else-if="typeof field == 'object'"
        v-for="(value, index) in field"
        :key="index"
      >
        <chip
          :label="labels?.get(i)"
          :value="value.toString()"
          v-on:update="updateFiltration(i, value, field)"
        />
      </span>
    </div>
  </v-row>
</template>

<script setup lang="ts">
import Chip from './Chip.vue'

const props = defineProps({
  values: Object,
  labels: Map<string, string>
})

const emit = defineEmits(['update'])

function updateFiltration(
  fieldName: string,
  value?: string | boolean,
  field?: string[]
) {
  if (field && value) {
    field = field.filter((fieldValue) => {
      return fieldValue != value
    })
    emit('update', fieldName, field)
  } else if (value != undefined) {
    emit('update', fieldName, value)
  } else {
    emit('update', fieldName)
  }
}
</script>
