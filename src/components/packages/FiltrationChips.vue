<template>
  <v-row class="ml-10 mt-5">
    <div
      v-for="(field, i) in values"
      :key="i"
      v-show="field != undefined"
    >
      <v-chip
        class="pa-4 mr-3"
        v-if="typeof field == 'boolean' && field != false"
      >
        {{ i }}
      </v-chip>
      <v-chip
        class="pa-4 mr-3"
        v-else-if="typeof field == 'string'"
      >
        {{ i }}: {{ field }}
      </v-chip>
      <v-chip
        class="pa-4 mr-3"
        v-else-if="typeof field != 'boolean'"
      >
        {{ i }}: {{ field }}
      </v-chip>
    </div>
  </v-row>
</template>

<script setup lang="ts">
const props = defineProps<{
  values: Object
}>()
</script>
