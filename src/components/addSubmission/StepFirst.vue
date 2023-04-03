<template>
  <v-card class="mb-12 px-10 py-5 step" height="250px">
    <v-select
      class="mt-5"
      :items="repositories"
      :label="$t('addSubmission.step1Title')"
      @update:modelValue="changeRepository"
      item-value="id"
      item-title="name"
      persistent-hint
      return-object
    ></v-select>
  </v-card>
  <div class="d-flex justify-end">
    <v-btn id="nextbutton" color="oablue" @click="nextStep">
      Continue
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { EntityModelRepositoryDto } from '@/openapi'
import { useRepositoryStore } from '@/store/repositories'
import { useSubmissionStore } from '@/store/submission'
import { useNotification } from '@kyvg/vue3-notification'
import { computed } from 'vue'

const emits = defineEmits(['next'])
const submissions_store = useSubmissionStore()
const repository_store = useRepositoryStore()
const nofications = useNotification()

const repositories = computed(function () {
  return repository_store.repositories
})

function changeRepository(value: EntityModelRepositoryDto) {
  console.log('repository')
  submissions_store.setRepository(value)
}

function nextStep() {
  if (submissions_store.repository != null) {
    emits('next', 2)
  } else {
    nofications.notify({
      text: 'no repository choosen',
      type: 'warn'
    })
  }
}
</script>

<style lang="scss">
.v-input {
  align-items: center !important;
}

.v-file-input {
  .v-file-input__text {
    .v-chip {
      font-size: 1.125em !important;
      // padding: 15px 5px !important;
      margin-bottom: 10px !important;
    }
  }
}
</style>
