<template>
  <v-card
    class="mb-12 step pb-5 d-flex flex-column justify-space-between"
    :class="
      files && files.length > 0
        ? 'align-items-end'
        : 'align-items-start'
    "
    min-height="250px"
    height="100%"
  >
    <v-toolbar color="secondary">
      <v-toolbar-title
        >Chosen files ({{
          files_local?.length ? files_local.length : 0
        }})</v-toolbar-title
      >
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-list lines="two">
      <v-list-item
        v-for="file in files_local"
        :key="file.name"
        :title="file.name"
      >
        <template v-slot:prepend>
          <v-icon color="white" icon="mdi-file" />
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-delete"
            variant="text"
            @click="removeFile(file)"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>

    <v-form v-model="valid">
      <div
        class="d-flex mt-5 px-5"
        :class="
          files && files.length > 0
            ? 'justify-space-between'
            : ''
        "
        :style="
          files && files.length > 0
            ? ''
            : 'min-height: 188px; align-items: flex-end'
        "
      >
        <v-btn color="oablue" type="button" @click="open()">
          Choose files
        </v-btn>

        <v-btn
          class="mx-3"
          type="button"
          :disabled="!files"
          v-if="files && files?.length > 0"
          color="oared"
          @click="resetPackages()"
        >
          Reset
        </v-btn>
      </div>
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
import { useFileDialog } from '@vueuse/core'
import { watch } from 'vue'

const { files, open, reset } = useFileDialog({
  accept: 'application/gzip'
})

const emits = defineEmits(['next'])
const submissions_store = useSubmissionStore()
const notifications = useNotification()
const valid = ref<boolean>(true)

const files_local = ref<File[]>([])

function removeFile(file: File) {
  for (var i = 0; i < files_local.value.length; i++) {
    var flag = true
    if (file == files_local.value[i] && true) {
      files_local.value.splice(i, 1)
      flag = false
    }
  }
}

function resetPackages() {
  submissions_store.setPackages([])
  reset()
}

watch(files, (files) => {
  if (files != null) {
    files_local.value = Array.from(files)
  } else {
    files_local.value = []
  }
})

function getFileName(file: any): string {
  console.log(file)
  if (file['name']) {
    return file['name']
  }
  return ''
}
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
  var local_files: File[] = []
  if (files.value) {
    for (var i = 0; i < files.value.length; i++) {
      local_files.push(files.value[i])
      if (files.value[i]['type'] !== 'application/gzip') {
        valid.value = false
      }
    }
  }
  if (valid.value == true) {
    submissions_store.setPackages(Array.from(local_files))
  } else {
    submissions_store.setPackages([])
  }
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
      text: 'choose packages that have correct extention (.tar.gz)',
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

<style>
.v-list-item__prepend {
  align-self: center !important;
}
</style>
