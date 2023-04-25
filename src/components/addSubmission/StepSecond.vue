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
        @click=""
      >
        <template v-slot:prepend>
          <v-icon
            :color="
              check_validity(file) ? 'white' : 'oared'
            "
            icon="mdi-file"
          />
        </template>

        <template v-slot:append>
          <v-btn
            :color="
              check_validity(file)
                ? 'grey-lighten-1'
                : 'oared'
            "
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
            : 'align-items: flex-end'
        "
      >
        <v-btn color="oablue" type="button" @click="open()">
          {{ $t('submissions.choseFiles') }}
        </v-btn>

        <v-btn
          class="mx-3"
          type="button"
          :disabled="!files"
          v-if="files && files?.length > 0"
          color="oared"
          @click="resetPackages()"
        >
          {{ $t('common.reset') }}
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
      {{ $t('common.goBack') }}
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
import { onMounted } from 'vue'
import { i18n } from '@/plugins/i18n'

const { files, open, reset } = useFileDialog({
  accept: 'application/gzip'
})

const emits = defineEmits(['next'])
const submissions_store = useSubmissionStore()
const notifications = useNotification()
const valid = ref<boolean>(true)

const files_local = ref<File[]>([])

function removeFile(file: File) {
  files_local.value.forEach(
    (file_local: File, i: number) => {
      if (file_local == file) {
        files_local.value.splice(i, 1)
      }
    }
  )
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

function check_validity(file: File) {
  if (file['type'] === 'application/gzip') {
    return true
  }
  return false
}

function savePackagesInStore() {
  valid.value = files_local.value.every(check_validity)
  if (valid.value) {
    submissions_store.setPackages(files_local.value)
  } else {
    submissions_store.setPackages([])
  }
}

onMounted(() => {
  files_local.value = submissions_store.packages
})

function nextStep() {
  savePackagesInStore()
  if (
    submissions_store.packages.length > 0 &&
    valid.value
  ) {
    emits('next', 3)
  } else if (!valid.value) {
    notifications.notify({
      text: i18n.t('submissions.wrongExtension'),
      type: 'error'
    })
  } else {
    notifications.notify({
      text: i18n.t('submissions.noPackageChosen'),
      type: 'warn'
    })
  }
}
</script>

<style>
.v-list-item__prepend {
  align-self: center !important;
}

.v-card__underlay {
  display: none;
}
</style>
