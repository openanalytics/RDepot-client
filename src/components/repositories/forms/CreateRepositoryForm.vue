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
          t('actions.general.createResource', {
            resource_type: t('resources.repository')
          })
        }}
      </v-card-title>
      <v-divider />
      <v-card-text>
        <validated-input-field
          id="repository-create-name"
          name="name"
          as="v-text-field"
          :label="t('forms.general.name')"
          :loading="loading"
          max-width="unset"
        />
        <validated-input-field
          id="repository-create-publication-uri"
          name="publicationUri"
          as="v-text-field"
          :label="$t('fields.repositories.publicationUri')"
          max-width="unset"
        />
        <span
          class="d-flex justify-space-between align-center"
        >
          <validated-input-field
            id="repository-create-server-address"
            name="serverAddress"
            as="v-text-field"
            max-width="unset"
            :label="t('fields.repositories.serverAddress')"
          />
          <HealthCheck
            :server-address="values.serverAddress || ''"
          />
        </span>
        <validated-input-field
          id="repository-create-technology"
          :items="technologies"
          name="technology"
          as="v-select"
          :label="t('resources.technology')"
          max-width="unset"
        />
        <validated-input-field
          v-show="values.technology == 'Python'"
          id="repository-create-hash-method"
          :items="hashMethods"
          name="hashMethod"
          as="v-select"
          :label="t('forms.repositories.hash')"
          max-width="unset"
        />
        <validated-input-field
          v-show="values.technology == 'R'"
          id="repository-create-redirect-to-source"
          name="redirectToSource"
          as="v-checkbox"
          max-width="unset"
          style="display: flex; justify-content: start"
          :label="t('forms.repositories.redirectToSource')"
        ></validated-input-field>
        <validated-input-field
          id="repository-create-requires-authentication"
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
            deprecatedAddress(
              values.serverAddress || '',
              values.technology
            ) && isFieldDirty('serverAddress')
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
              <b>{{ newServerAddress }} </b>
            </template>
          </i18n-t>
        </v-alert>
      </v-card-text>
      <v-divider></v-divider>
      <CardActions
        :valid="meta.valid"
        @submit="createRepository"
      />
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
import { useRepositoryStore } from '@/store/options/repositories'
import { computed, nextTick, ref, watch } from 'vue'
import { Technologies } from '@/enum/Technologies'
import { HashMethods } from '@/enum/HashMethods'
import { toTypedSchema } from '@vee-validate/zod/dist/vee-validate-zod'
import { useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import CardActions from '@/components/common/overlay/CardActions.vue'
import { useI18n } from 'vue-i18n'
import { useCommonStore } from '@/store/options/common'
import getEnv from '@/utils/env'
import { useRepositoryDeprecated } from '@/composable/repositories/repositoriesDeprecatedAddress'
import HealthCheck from '@/components/repositories/forms/HealthCheck.vue'
import { useRepositoryValidationSchema } from '@/composable/repositories/repositoriesSchema'

const repositoryStore = useRepositoryStore()
const commonStore = useCommonStore()
const { deprecatedAddress, getNewServerAddress } =
  useRepositoryDeprecated()

const technologies = ref(Technologies.options)
const hashMethods = ref(HashMethods.options)

const { createRepositorySchema } =
  useRepositoryValidationSchema()

const { t } = useI18n()

const loading = ref(false)
const repositorySchema =
  createRepositorySchema(repositoryStore)

const { meta, values, isFieldDirty, validateField } =
  useForm({
    validationSchema: toTypedSchema(repositorySchema),
    initialValues: {
      technology: undefined,
      hashMethod: HashMethods.enum.MD5,
      redirectToSource: false
    }
  })

watch(
  () => values.name,
  async (newValue) => {
    console.log('Name changed to:', newValue)
    await nextTick()
    await validateField('name')
  }
)

const newServerAddress = computed(() => {
  if (
    values.serverAddress?.includes(
      getEnv('VITE_REPO_SERVER_ADDRESS')
    )
  ) {
    return getNewServerAddress(
      values.serverAddress,
      values.technology
    )
  } else {
    return `${getEnv('VITE_REPO_SERVER_ADDRESS')}{technology}/{repo}`
  }
})

async function createRepository() {
  const newRepository =
    await repositorySchema.parseAsync(values)
  await repositoryStore.create(newRepository)
  commonStore.closeOverlay()
}
</script>
