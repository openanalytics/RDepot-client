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
        {{
          $t('actions.general.editResource', {
            resource_type: $t('resources.repository')
          })
        }}
      </v-card-title>
      <v-divider />
      <v-card-text>
        <validated-input-field
          id="edit-name"
          v-model="localRepository.name"
          name="name"
          as="v-text-field"
          :label="$t('forms.general.name')"
          :loading="loading"
          lazy-validation
          max-width="unset"
        />
        <validated-input-field
          id="edit-publication-uri"
          v-model="localRepository.publicationUri"
          name="publicationUri"
          as="v-text-field"
          :label="$t('fields.repositories.publicationUri')"
          max-width="unset"
        />
        <span
          class="d-flex justify-space-between align-center"
        >
          <validated-input-field
            id="edit-server-address"
            v-model="localRepository.serverAddress"
            name="serverAddress"
            as="v-text-field"
            :label="$t('fields.repositories.serverAddress')"
            max-width="unset"
          />
          <HealthCheck
            :server-address="values.serverAddress || ''"
          />
        </span>
        <validated-input-field
          id="edit-technology"
          v-model="localRepository.technology"
          disabled
          :items="technologySelect"
          name="technology"
          as="v-select"
          :label="$t('resources.technology')"
          max-width="unset"
        />
        <validated-input-field
          v-if="localRepository.technology == 'Python'"
          id="edit-hash-method"
          v-model="localRepository.hashMethod"
          :items="hashMethods"
          name="hashMethod"
          as="v-select"
          :label="$t('forms.repositories.hash')"
          max-width="unset"
        />
        <validated-input-field
          v-if="localRepository.technology == 'R'"
          id="edit-redirect-to-source"
          v-model="localRepository.redirectToSource"
          name="redirectToSource"
          as="v-checkbox"
          max-width="unset"
          style="display: flex; justify-content: start"
          :label="$t('forms.repositories.redirectToSource')"
        ></validated-input-field>
        <validated-input-field
          id="edit-requires-authentication"
          v-model="localRepository.requiresAuthentication"
          name="requiresAuthentication"
          as="v-checkbox"
          max-width="unset"
          style="display: flex; justify-content: start"
          :label="
            $t('forms.repositories.requiresAuthentication')
          "
        />
      </v-card-text>
      <v-card-text>
        <v-alert
          v-if="
            isFieldTouched('serverAddress') &&
            isAtLeastAdmin(
              authorizationStore.userRole || 0
            ) &&
            deprecatedAddress(
              values.serverAddress || '',
              values.technology
            )
          "
          id="repository-deprecated-serverAddress-alert"
          style="font-size: 0.75rem"
          variant="tonal"
          border="start"
          density="compact"
          color="warning"
        >
          <i18n-t
            keypath="forms.repositories.hints.deprecatedAddress"
            tag="p"
          >
            <template #address>
              <br />
              <b>{{ newServerAddress }}</b>
            </template>
          </i18n-t>
        </v-alert>
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
import { computed, onMounted, ref } from 'vue'
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
import { useRepositoryDeprecated } from '@/composable/repositories/repositoriesDeprecatedAddress'
import { useCommonStore } from '@/store/options/common'
import { HashMethods } from '@/enum/HashMethods'
import { isAtLeastAdmin } from '@/enum/UserRoles'
import { useAuthorizationStore } from '@/store/options/authorization'
import HealthCheck from '@/components/repositories/forms/HealthCheck.vue'
import { useConfigStore } from '@/store/options/config'

const { deepCopy } = useUtilities()
const hashMethods = ref(HashMethods.options)
const repositoryStore = useRepositoryStore()
const commonStore = useCommonStore()
const authorizationStore = useAuthorizationStore()
const { deprecatedAddress, getNewServerAddress } =
  useRepositoryDeprecated()

const repository: CombinedRepositoryModel = deepCopy(
  repositoryStore.chosenRepository
)
const localRepository = ref(repository)

const technologySelect = ref(Technologies.options)
const { t } = useI18n()

const loading = ref(false)
let previousVal = ''
const configStore = useConfigStore()
let previousReturn = true

const { meta, setFieldValue, isFieldTouched, values } =
  useForm({
    validationSchema: toTypedSchema(
      z.object({
        name: repositorySchema.shape.name
          .refine(async (value) => {
            if (previousVal === value) {
              return previousReturn
            }
            previousVal = value
            return await isRepositoryNameIsDuplicated(value)
          }, t('forms.repositories.errors.duplicateName'))
          .refine((value) => {
            let regexPattern: string = '.+'
            if (
              configStore.repositoryNameValidationRegex
                .general
            ) {
              regexPattern =
                configStore.repositoryNameValidationRegex
                  .general
            }
            if (
              values.technology ===
                Technologies.Enum.Python &&
              configStore.repositoryNameValidationRegex
                .technology.python
            ) {
              regexPattern =
                configStore.repositoryNameValidationRegex
                  .technology.python
            } else if (
              values.technology === Technologies.Enum.R &&
              configStore.repositoryNameValidationRegex
                .technology.r
            ) {
              regexPattern =
                configStore.repositoryNameValidationRegex
                  .technology.r
            }
            return new RegExp(regexPattern).test(value)
          }, t('messages.errors.reponame')),
        publicationUri:
          repositorySchema.shape.publicationUri,
        serverAddress: repositorySchema.shape.serverAddress,
        requiresAuthentication:
          repositorySchema.shape.requiresAuthentication,
        technology: repositorySchema.shape.technology,
        hashMethod: repositorySchema.shape.hashMethod,
        redirectToSource:
          repositorySchema.shape.redirectToSource
      })
    ),
    initialValues: {
      name: repository.name,
      publicationUri: repository.publicationUri,
      serverAddress: repository.serverAddress,
      requiresAuthentication:
        repository.requiresAuthentication,
      technology: repository.technology as Technologies,
      hashMethod: repository.hashMethod,
      redirectToSource: repository.redirectToSource
    }
  })

const toasts = useToast()

const newServerAddress = computed(() => {
  if (values.serverAddress?.lastIndexOf('/')) {
    return getNewServerAddress(
      values.serverAddress,
      values.technology
    )
  }
  return ''
})

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
    toasts.warning(t('messages.errors.invalidForm'))
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
