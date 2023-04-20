<template>
  <v-card class="mb-12 px-10 py-3 step text-center">
    <v-card-text class="mb-1">
      <div class="text-overline">repository</div>
      <div class="text-h4 mb-2">
        {{ chosenRepository?.name }}
      </div>
      <v-divider></v-divider>
      <div class="text-overline">packages</div>
      <v-list class="text-left">
        <v-list-item
          v-for="(file, i) in chosenPackages"
          :key="i"
          class="justify-start hoverable"
        >
          <template v-slot:prepend>
            <v-icon color="white" icon="mdi-file" />
          </template>

          <template v-slot:append>
            <v-list-item-title>
              {{ file.name }}
            </v-list-item-title>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
  <div class="d-flex justify-space-between">
    <v-btn id="backbutton" color="oablue" @click="backStep">
      {{ $t('common.goBack') }}
    </v-btn>

    <v-btn
      id="submitbutton"
      color="oablue"
      @click="submit"
      :disabled="disableSubmit"
    >
      submit
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useSubmissionStore } from '@/store/submission'
import { computed, ref } from 'vue'

const emits = defineEmits(['next'])
const disableSubmit = ref(false)
const submissions_store = useSubmissionStore()
const chosenRepository = computed(() => {
  return submissions_store.repository
})
const chosenPackages = computed(() => {
  return submissions_store.packages
})
function backStep() {
  emits('next', 2)
}

async function submit() {
  submissions_store.addSubmissionRequests()
  disableSubmit.value = true
}
</script>

<style lang="scss">
.hoverable {
  transition: background-color 0.5s ease;
  &:hover {
    background-color: rgb(var(--v-theme-docsblue));
  }
}
</style>
