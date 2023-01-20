<template>
  <v-card class="mb-12 px-10 py-5 step" min-height="250px">
    <v-file-input
      multiple
      v-model="files"
      counter
      placeholder="Choose packages"
      prepend-icon="mdi-paperclip"
      v-on:change="addPackages"
    >
      <template v-slot:selection="{ fileNames }">
        <template
          v-for="fileName in fileNames"
          :key="fileName"
        >
          <v-chip
            size="x-small"
            label
            color="oablue"
            class="mt-3 p-2"
            @click="removePackage"
          >
            {{ fileName }}
          </v-chip>
        </template>
      </template>
    </v-file-input>
  </v-card>
  <div class="d-flex justify-space-between">
    <v-btn
      id="backbutton"
      color="oablue"
      @click="$emit('next', 1)"
    >
      go back
    </v-btn>
    <v-btn id="nextbutton" color="oablue" @click="nextStep">
      Continue
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useSubmissionState } from '@/store/submission'
import { useNotification } from '@kyvg/vue3-notification'
import { ref } from 'vue'

const emits = defineEmits(['next'])
const submissions_store = useSubmissionState()
const notifications = useNotification()
const files = ref([])

function removePackage() {}
function addPackages(value: File[]) {
  console.log(value)
  submissions_store.setPackages(files.value)
}
function nextStep() {
  if (submissions_store.packages.length > 0) {
    emits('next', 3)
  } else {
    notifications.notify({
      text: 'no packages choosen',
      type: 'warn'
    })
  }
}
</script>
