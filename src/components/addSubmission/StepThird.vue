<template>
  <v-card class="mb-12 px-10 py-5 step" height="250px">
    <div class="ml-4">{{ chosenRepository }}</div>

    <v-chip-group
      v-model="accepted_packages"
      column
      multiple
    >
      <v-chip
        v-for="(file, index) in chosenPackages"
        :key="index"
        filter
        variant="outlined"
        >{{ file.name }}
      </v-chip>
    </v-chip-group>
  </v-card>
  <div class="d-flex justify-space-between">
    <v-btn id="backbutton" color="oablue" @click="backStep">
      go back
    </v-btn>

    <v-btn id="submitbutton" color="oablue" @click="submit">
      submit
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useSubmissionStore } from '@/store/submission'
import { computed, ref } from 'vue'

const emits = defineEmits(['next'])
const submissions_store = useSubmissionStore()
const accepted_packages = ref<number[]>([])
const chosenRepository = computed(() => {
  return submissions_store.repository
})
const chosenPackages = computed(() => {
  return submissions_store.packages
})
function backStep() {
  emits('next', 2)
}
function submit() {
  var approved_packages = [] as File[]
  chosenPackages.value.forEach((element, index) => {
    if (accepted_packages.value.includes(index)) {
      approved_packages.push(element)
    }
  })
  submissions_store.setPackages(approved_packages)
}
</script>
