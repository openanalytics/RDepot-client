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
  <v-form>
    <v-card class="pa-5" width="400">
      <v-card-title>
        {{
          t('actions.general.editResource', {
            resource_type: t('resources.repository')
          })
        }}
      </v-card-title>
      <v-divider />
      <v-card-text>
        <validated-input-field
          id="edit-name"
          v-model="repository.name"
          name="name"
          as="v-text-field"
          :label="t('forms.general.name')"
          :loading="loading"
          max-width="unset"
        />
        <validated-input-field
          id="edit-publication-uri"
          v-model="repository.publicationUri"
          name="publicationUri"
          as="v-text-field"
          :label="t('fields.repositories.publicationUri')"
          max-width="unset"
        />
        <span
          class="d-flex justify-space-between align-center"
        >
          <validated-input-field
            id="edit-server-address"
            v-model="repository.serverAddress"
            name="serverAddress"
            as="v-text-field"
            :label="t('fields.repositories.serverAddress')"
            max-width="unset"
          />
          <HealthCheck
            :server-address="values.serverAddress || ''"
          />
        </span>
        <validated-input-field
          id="edit-technology"
          v-model="repository.technology"
          disabled
          :items="technologySelect"
          name="technology"
          as="v-select"
          :label="t('resources.technology')"
          max-width="unset"
        />
        <validated-input-field
          v-if="repository.technology == 'Python'"
          id="edit-hash-method"
          v-model="repository.hashMethod"
          :items="hashMethods"
          name="hashMethod"
          as="v-select"
          :label="t('forms.repositories.hash')"
          max-width="unset"
        />
        <validated-input-field
          v-if="repository.technology == 'R'"
          id="edit-redirect-to-source"
          v-model="repository.redirectToSource"
          name="redirectToSource"
          as="v-checkbox"
          max-width="unset"
          style="display: flex; justify-content: start"
          :label="t('forms.repositories.redirectToSource')"
        ></validated-input-field>
        <validated-input-field
          id="edit-requires-authentication"
          v-model="repository.requiresAuthentication"
          name="requiresAuthentication"
          as="v-checkbox"
          max-width="unset"
          style="display: flex; justify-content: start"
          :label="
            t('forms.repositories.requiresAuthentication')
          "
        />
      </v-card-text>
      <v-card-text>
        <v-alert
          v-if="
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
      <CardActions
        :valid="meta.valid"
        :touched="meta.touched || meta.dirty"
        @submit="updateRepository"
      />
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
import {
  CombinedRepositoryModel,
  useRepositoryStore
} from '@/store/options/repositories'
import { computed, ref } from 'vue'
import { Technologies } from '@/enum/Technologies'
import { toTypedSchema } from '@vee-validate/zod/dist/vee-validate-zod'
import { useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import CardActions from '@/components/common/overlay/CardActions.vue'
import { useI18n } from 'vue-i18n'
import { useUtilities } from '@/composable/utilities'
import { useRepositoryDeprecated } from '@/composable/repositories/repositoriesDeprecatedAddress'
import { useCommonStore } from '@/store/options/common'
import { HashMethods } from '@/enum/HashMethods'
import { isAtLeastAdmin } from '@/enum/UserRoles'
import { useAuthorizationStore } from '@/store/options/authorization'
import HealthCheck from '@/components/repositories/forms/HealthCheck.vue'
import { useRepositoryValidationSchema } from '@/composable/repositories/repositoriesSchema.ts'

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

const technologySelect = ref(Technologies.options)
const { t } = useI18n()

const loading = ref(false)

const { createRepositorySchema } =
  useRepositoryValidationSchema()

const repositorySchema = createRepositorySchema(
  repositoryStore,
  repository.id
)

const { meta, values } = useForm({
  validationSchema: toTypedSchema(repositorySchema),
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

const newServerAddress = computed(() => {
  if (values.serverAddress?.lastIndexOf('/')) {
    return getNewServerAddress(
      values.serverAddress,
      values.technology
    )
  }
  return ''
})

function updateRepository() {
  repositoryStore.patch(repository)
  commonStore.closeOverlay()
}
</script>
