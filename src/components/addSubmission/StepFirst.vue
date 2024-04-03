<!--
 R Depot
 
 Copyright (C) 2012-2024 Open Analytics NV
 
 ===========================================================================
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the Apache License as published by
 The Apache Software Foundation, either version 2 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 Apache License for more details.
 
 You should have received a copy of the Apache License
 along with this program. If not, see <http://www.apache.org/licenses/>
 
-->

<template>
  <v-card class="mb-12 px-10 py-5 step" height="250px">
    <v-select
      class="mt-5"
      :items="repositories"
      :label="$t('addSubmission.step1Title')"
      @update:model-value="
        (newValue) => changeRepository(newValue)
      "
      filled
      dense
      clearable
      persistent-hint
    >
    </v-select>
  </v-card>
  <div class="d-flex justify-end">
    <v-btn
      id="next-button"
      color="oablue"
      @click="nextStep"
    >
      {{ $t('button.continue') }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useRepositoryStore } from '@/store/repositories'
import { useSubmissionStore } from '@/store/submission'
import { onMounted } from 'vue'
import { computed } from 'vue'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'

const emits = defineEmits(['next'])
const submissionsStore = useSubmissionStore()
const repositoryStore = useRepositoryStore()
const toasts = useToast()
const { t } = useI18n()

const repositories = computed(function () {
  return repositoryStore.repositories.map((repo) => {
    return {
      title: repo.name,
      value: repo.id,
      props: { subtitle: repo.technology }
    }
  })
})

function changeRepository(value: number) {
  const chosenRepository =
    repositoryStore.repositories.find(
      (repo) => repo.id == value
    )
  submissionsStore.setRepository(chosenRepository || {})
}

function nextStep() {
  if (submissionsStore.repository != null) {
    emits('next', 2)
  } else {
    toasts.warning(t('repositories.empty'))
  }
}

onMounted(() => {
  repositoryStore.fetchAllRepositories()
})
</script>

<style lang="scss">
.v-input {
  align-items: center !important;
}

.v-file-input {
  .v-file-input__text {
    .v-chip {
      font-size: 1.125em !important;
      margin-bottom: 10px !important;
    }
  }
}
</style>
