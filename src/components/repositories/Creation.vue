<!--
 R Depot
 
 Copyright (C) 2012-2023 Open Analytics NV
 
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
      <v-divider></v-divider>
      <v-card-text>
        <validated-input-field
          name="name"
          as="v-text-field"
          :label="$t('repositories.creation.name')"
          :loading="loading"
          lazy-validation
        ></validated-input-field>
        <validated-input-field
          name="publicationUri"
          as="v-text-field"
          :label="
            $t('repositories.creation.publicationUri')
          "
        ></validated-input-field>
        <validated-input-field
          name="serverAddress"
          as="v-text-field"
          :label="$t('repositories.creation.serverAddress')"
        ></validated-input-field>
        <validated-input-field
          :items="technologySelect"
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

const repositoryStore = useRepositoryStore()

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
    text: t('common.create'),
    handler: createRepository
  }
]

const loading = ref(false)
let previousVal = ''
let previousReturn = true

const { meta, values } = useForm({
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
            await repositoryStore.fetchRepository(value)
          loading.value = false
          previousReturn =
            repositoryWithSameName.length === 0
          return previousReturn
        },
        i18n.t('repositories.creation.duplicateName')
      ),
      publicationUri: repositorySchema.shape.publicationUri,
      serverAddress: repositorySchema.shape.serverAddress,
      technology: repositorySchema.shape.technology
    })
  )
})

const emit = defineEmits(['closeModal'])
const toasts = useToast()

function createRepository() {
  if (meta.value.valid) {
    repositoryStore.createRepository(values)
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
