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
  <form as="v-form" lazy-validation>
    <v-card class="pa-5" width="400">
      <v-card-title>
        {{ $t('repositories.edit.title') }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <validated-input-field
          name="name"
          id="edit-name"
          v-model="localRepository.name"
          as="v-text-field"
          :label="$t('repositories.creation.name')"
          :loading="loading"
          lazy-validation
        ></validated-input-field>
        <validated-input-field
          name="publicationUri"
          id="edit-publication-uri"
          as="v-text-field"
          v-model="localRepository.publicationUri"
          :label="
            $t('repositories.creation.publicationUri')
          "
        ></validated-input-field>
        <validated-input-field
          name="serverAddress"
          id="edit-server-address"
          v-model="localRepository.serverAddress"
          as="v-text-field"
          :label="$t('repositories.creation.serverAddress')"
        ></validated-input-field>
        <validated-input-field
          id="edit-technology"
          disabled
          :items="technologySelect"
          v-model="localRepository.technology"
          name="technology"
          as="v-select"
          :label="$t('repositories.creation.technology')"
        ></validated-input-field>
      </v-card-text>
      <v-divider></v-divider>
      <card-actions :buttons="buttons" />
    </v-card>
  </form>
</template>

<script setup lang="ts">
import { useRepositoryStore } from '@/store/repositories'
import { ref, onMounted } from 'vue'
import { Technologies } from '@/enum/Technologies'
import { repositorySchema } from '@/models/Schemas'
import { toTypedSchema } from '@vee-validate/zod/dist/vee-validate-zod'
import { Form, useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import CardActions from '@/components/common/CardActions.vue'
import { z } from 'zod'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'
import { EntityModelRepositoryDto } from '@/openapi'
import { useUtilities } from '@/composable/utilities'

const { deepCopy } = useUtilities()
const repositoryStore = useRepositoryStore()
const repository: EntityModelRepositoryDto = deepCopy(
  repositoryStore.chosenRepository
)
const localRepository = ref(repository)

const technologySelect = ref(Technologies.options)
const { t } = useI18n()

const buttons = [
  {
    id: 'cancel-button',
    text: t('common.cancel'),
    handler: changeDialogOptions
  },
  {
    id: 'set-filtration',
    text: t('common.save'),
    handler: updateRepository
  }
]

const loading = ref(false)
let previousVal = ''
let previousReturn = true

const { meta } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      name: repositorySchema.shape.name.refine(
        async (value) => {
          if (previousVal === value) {
            return previousReturn
          }
          previousVal = value
          return await isRepositoryNameIsDuplicated(value)
        },
        t('repositories.creation.duplicateName')
      ),
      publicationUri: repositorySchema.shape.publicationUri,
      serverAddress: repositorySchema.shape.serverAddress,
      technology: repositorySchema.shape.technology
    })
  ),
  initialValues: {
    name: repository.name,
    publicationUri: repository.publicationUri,
    serverAddress: repository.serverAddress,
    technology: repository.technology as Technologies
  }
})

const emit = defineEmits(['closeModal'])
const toasts = useToast()

async function isRepositoryNameIsDuplicated(
  repoName: string
) {
  loading.value = true
  const repositoriesWithSameName =
    await repositoryStore.fetchRepository(repoName)
  loading.value = false
  if (isRepositoryInTheReposList(repositoriesWithSameName))
    return false
  return repositoriesWithSameName.length === 0
}

function isRepositoryInTheReposList(
  repoList: EntityModelRepositoryDto[]
) {
  var flag = false
  repoList.forEach((repo) => {
    if (repo.id == localRepository.value.id) {
      flag = true
    }
  })
  return flag
}

function updateRepository() {
  if (meta.value.valid) {
    repositoryStore.updateRepository(localRepository.value)
    changeDialogOptions()
  } else {
    toasts.warning(t('notifications.invalidform'))
  }
}

function changeDialogOptions() {
  emit('closeModal')
}

onMounted(() => {})
</script>
