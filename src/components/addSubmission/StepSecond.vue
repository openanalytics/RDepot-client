<template>
  <v-card class="mb-12 px-10 py-5 step" min-height="250px">
    <v-form v-model="valid">
      <v-file-input
        class="mt-5"
        :rules="file_rules"
        multiple
        v-model="files"
        counter
        accept="application/gzip"
        placeholder="Choose packages"
        prepend-icon="mdi-paperclip"
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
    </v-form>
  </v-card>
  <div class="d-flex justify-space-between">
    <v-btn
      id="back-button"
      color="oablue"
      @click="$emit('next', 1)"
    >
      go back
    </v-btn>
    <v-btn
      id="next-button"
      color="oablue"
      @click="nextStep"
    >
      Continue
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useSubmissionStore } from '@/store/submission'
import { useNotification } from '@kyvg/vue3-notification'
import { ref } from 'vue'

const emits = defineEmits(['next'])
const submissions_store = useSubmissionStore()
const notifications = useNotification()
const files = ref([])
const valid = ref<boolean>(true)

const file_rules = [
  (v: File[]) =>
    !!v ||
    'You need to choose at least 1 package with .tar.gz extenstion',
  (v: File[]) =>
    checkFilesExtentions(v) ||
    'You choose at least one file with unsupported extention (supported extentions: .tar.gz)'
]

function checkFilesExtentions(files: File[]): boolean {
  var unsupportedFiles: File[] = files.filter(
    (file: File) => {
      return !file.type.match('application/gzip')
    }
  )
  return unsupportedFiles.length == 0
}

function removePackage() {}
function savePackagesInStore() {
  submissions_store.setPackages(files.value)
}
function nextStep() {
  savePackagesInStore()
  if (
    submissions_store.packages.length > 0 &&
    valid.value
  ) {
    emits('next', 3)
  } else if (!valid.value) {
    notifications.notify({
      text: 'choose packages that have correct extention',
      type: 'error'
    })
  } else {
    notifications.notify({
      text: 'no packages choosen',
      type: 'warn'
    })
  }
}
</script>
