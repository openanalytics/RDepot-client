<!--
 R Depot
 
 Copyright (C) 2012-2025 Open Analytics NV
 
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
        {{ repository.hashMethod }}
        <validated-input-field
          id="edit-name"
          v-model="localRepository.name"
          name="name"
          as="v-text-field"
          :label="$t('repositories.creation.name')"
          :loading="loading"
          lazy-validation
          max-width="unset"
        ></validated-input-field>
        <validated-input-field
          id="edit-publication-uri"
          v-model="localRepository.publicationUri"
          name="publicationUri"
          as="v-text-field"
          :label="
            $t('repositories.creation.publicationUri')
          "
          max-width="unset"
        ></validated-input-field>
        <validated-input-field
          id="edit-server-address"
          v-model="localRepository.serverAddress"
          name="serverAddress"
          as="v-text-field"
          :label="$t('repositories.creation.serverAddress')"
          max-width="unset"
        ></validated-input-field>
        <validated-input-field
          id="edit-technology"
          v-model="localRepository.technology"
          disabled
          :items="technologySelect"
          name="technology"
          as="v-select"
          :label="$t('repositories.creation.technology')"
          max-width="unset"
        ></validated-input-field>
        <validated-input-field
          v-if="localRepository.technology == 'Python'"
          id="edit-hash-method"
          v-model="localRepository.hashMethod"
          :items="hashMethods"
          name="hashMethod"
          as="v-select"
          :label="$t('repositories.creation.hash')"
          max-width="unset"
        ></validated-input-field>
      </v-card-text>
      <v-divider></v-divider>
      <CardActions @submit="updateRepository" />
    </v-card>
  </form>
</template>

<script setup lang="ts">
import {
  CombinedRepositoryModel,
  useRepositoryStore
} from '@/store/options/repositories'
import { ref, onMounted } from 'vue'
import { Technologies } from '@/enum/Technologies'
import { repositorySchema } from '@/models/Schemas'
import { toTypedSchema } from '@vee-validate/zod/dist/vee-validate-zod'
import { useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import CardActions from '@/components/common/overlay/CardActions.vue'
import { z } from 'zod'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'
import { useUtilities } from '@/composable/utilities'
import { useCommonStore } from '@/store/options/common'
import { HashMethods } from '@/enum/HashMethods'

const { deepCopy } = useUtilities()
const hashMethods = ref(HashMethods.options)
const repositoryStore = useRepositoryStore()
const commonStore = useCommonStore()

const repository: CombinedRepositoryModel = deepCopy(
  repositoryStore.chosenRepository
)
const localRepository = ref(repository)

const technologySelect = ref(Technologies.options)
const { t } = useI18n()

const loading = ref(false)
let previousVal = ''
let previousReturn = true

const { meta, setFieldValue } = useForm({
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
      technology: repositorySchema.shape.technology,
      hashMethod: repositorySchema.shape.hashMethod
    })
  ),
  initialValues: {
    name: repository.name,
    publicationUri: repository.publicationUri,
    serverAddress: repository.serverAddress,
    technology: repository.technology as Technologies,
    hashMethod: repository.hashMethod
  }
})

const toasts = useToast()

async function isRepositoryNameIsDuplicated(
  repoName: string
) {
  loading.value = true
  const repositoriesWithSameName =
    await repositoryStore.get(repoName)
  loading.value = false
  if (isRepositoryInTheReposList(repositoriesWithSameName))
    return false
  return repositoriesWithSameName.length === 0
}

function isRepositoryInTheReposList(
  repoList: CombinedRepositoryModel[]
) {
  return repoList.find(
    (repo) => repo.id == localRepository.value.id
  )
}

function updateRepository() {
  if (meta.value.valid) {
    repositoryStore.patch(localRepository.value)
    commonStore.closeOverlay()
  } else {
    toasts.warning(t('notifications.invalidform'))
  }
}

onMounted(async () => {
  if (repositoryStore.chosenRepository.name) {
    const repository = await repositoryStore.get(
      repositoryStore.chosenRepository.name,
      repositoryStore.chosenRepository
        .technology as Technologies
    )

    if (
      repository.length > 0 &&
      repository[0].technology == Technologies.enum.Python
    ) {
      setFieldValue('hashMethod', repository[0].hashMethod)
      repositoryStore.chosenRepository.hashMethod =
        repository[0].hashMethod
      localRepository.value.hashMethod =
        repository[0].hashMethod
    }
  }
})
</script>
