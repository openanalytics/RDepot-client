<template>
  <v-card class="mb-12 px-10 py-5 step" height="250px">
    <div class="ml-4">{{ choosenRepository }}</div>
    <div class="ml-4">
      Accepted packages index: {{ accepted_packages }}
    </div>
    <div class="ml-4">
      Choosen packages index:
      {{ choosenPackages.map((s, i) => i) }}
    </div>

    <v-chip-group
      v-model="accepted_packages"
      column
      multiple
    >
      <v-chip
        v-for="(file, index) in choosenPackages"
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
const choosenRepository = computed(() => {
  return submissions_store.repository
})
const choosenPackages = computed(() => {
  return submissions_store.packages
})
function backStep() {
  emits('next', 2)
}

async function submit() {
  var approved_packages = [] as File[]
  choosenPackages.value.forEach((element, index) => {
    if (accepted_packages.value.includes(index)) {
      approved_packages.push(element)
    }
  })
  submissions_store.setPackages(approved_packages)
  await submissions_store.addSumbissionRequests()
}
</script>
