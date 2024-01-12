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
  <token-edit-card
    :title="$t('settings.edit')"
    long
    @editToken="editToken()"
    @cancel="cancelModal()"
  >
    <validated-input-field
      id="token-name"
      type="text"
      clearable
      v-model="localToken.name"
      name="name"
      :label="$t('settings.tokenName')"
      as="v-text-field"
    ></validated-input-field>
  </token-edit-card>
</template>

<script setup lang="ts">
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import { useSettingsStore } from '@/store/settings'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import TokenEditCard from '@/components/settings/editToken/TokenEditCard.vue'
import { ref } from 'vue'
import { z } from 'zod'
import { EntityModelAccessTokenDto } from '@/openapi'
import { useUtilities } from '@/composable/utilities'

const emit = defineEmits(['closeModal'])
const settingsStore = useSettingsStore()

const { deepCopy } = useUtilities()

let token = deepCopy(settingsStore.currentToken)
const localToken = ref(token)

const { values, meta, validate } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      name: z.string().nonempty()
    })
  )
})

function editToken() {
  validate()
  if (meta.value.valid) {
    const newToken = deepCopy(localToken.value)
    settingsStore.editToken(
      deepCopy(settingsStore.currentToken),
      newToken
    )
    cancelModal()
  }
}

function cancelModal() {
  emit('closeModal')
}
</script>
