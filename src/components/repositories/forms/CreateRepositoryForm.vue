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
        {{ $t('repositories.creation.title') }}
      </v-card-title>
      <v-divider />
      <v-card-text>
        <validated-input-field
          id="repository-create-name"
          name="name"
          as="v-text-field"
          :label="$t('repositories.creation.name')"
          :loading="loading"
          lazy-validation
          max-width="unset"
        />
        <validated-input-field
          id="repository-create-publication-uri"
          name="publicationUri"
          as="v-text-field"
          :label="
            $t('repositories.creation.publicationUri')
          "
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
            :label="
              $t('repositories.creation.serverAddress')
            "
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
          :label="$t('repositories.creation.technology')"
          max-width="unset"
        />
        <validated-input-field
          v-if="values.technology == 'Python'"
          id="repository-create-hash-method"
          :items="hashMethods"
          name="hashMethod"
          as="v-select"
          :label="$t('repositories.creation.hash')"
          max-width="unset"
        />
        <validated-input-field
          v-if="values.technology == 'R'"
          id="repository-create-redirect-to-source"
          name="redirectToSource"
          as="v-checkbox"
          max-width="unset"
          style="display: flex; justify-content: start"
          :label="
            $t('repositories.creation.redirectToSource')
          "
        ></validated-input-field>
        <validated-input-field
          id="repository-create-requires-authentication"
          name="requiresAuthentication"
          as="v-checkbox"
          max-width="unset"
          style="display: flex; justify-content: start"
          :label="
            $t(
              'repositories.creation.requiresAuthentication'
            )
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
            keypath="repositories.creation.deprecatedAddress"
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
      <CardActions @submit="createRepository" />
    </v-card>
  </form>
</template>

<script setup lang="ts">
import { useRepositoryStore } from '@/store/options/repositories'
import { ref } from 'vue'
import { Technologies } from '@/enum/Technologies'
import { HashMethods } from '@/enum/HashMethods'
import { repositorySchema } from '@/models/Schemas'
import { toTypedSchema } from '@vee-validate/zod/dist/vee-validate-zod'
import { useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import CardActions from '@/components/common/overlay/CardActions.vue'
import { z } from 'zod'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'
import { useCommonStore } from '@/store/options/common'
import { watch, computed } from 'vue'
import getEnv from '@/utils/env'
import { useRepositoryDeprecated } from '@/composable/repositories/repositoriesDeprecatedAddress'
import HealthCheck from '@/components/repositories/forms/HealthCheck.vue'

const repositoryStore = useRepositoryStore()
const commonStore = useCommonStore()
const { deprecatedAddress, getNewServerAddress } =
  useRepositoryDeprecated()

const technologies = ref(Technologies.options)
const hashMethods = ref(HashMethods.options)

const { t } = useI18n()

const loading = ref(false)
let previousVal = ''
let previousReturn = true

const {
  meta,
  values,
  setFieldValue,
  setTouched,
  isFieldDirty
} = useForm({
  validationSchema: toTypedSchema(
    z.object({
      name: repositorySchema.shape.name.refine(
        async (value) => {
          if (previousVal === value) {
            return previousReturn
          }
          previousVal = value
          loading.value = true
          const repositoryWithSameName =
            await repositoryStore.get(
              value,
              undefined,
              false
            )
          loading.value = false
          previousReturn =
            repositoryWithSameName.length === 0
          return previousReturn
        },
        t('repositories.creation.duplicateName')
      ),
      publicationUri: repositorySchema.shape.publicationUri,
      serverAddress: repositorySchema.shape.serverAddress,
      requiresAuthentication:
        repositorySchema.shape.requiresAuthentication,
      technology: repositorySchema.shape.technology,
      hashMethod: repositorySchema.shape.hashMethod,
      redirectToSource:
        repositorySchema.shape.redirectToSource
    })
  )
})

watch(
  () => values.technology,
  (nevValue: Technologies | undefined) => {
    if (nevValue == Technologies.Enum.Python) {
      setFieldValue('hashMethod', HashMethods.Values.MD5)
      setFieldValue('redirectToSource', undefined)
      setTouched(true)
    } else {
      setFieldValue('hashMethod', undefined)
      setFieldValue('redirectToSource', false)
    }
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

const toasts = useToast()

function createRepository() {
  if (meta.value.valid && meta.value.touched) {
    repositoryStore.create(values)
    commonStore.closeOverlay()
  } else {
    toasts.warning(t('notifications.invalidform'))
  }
}
</script>
