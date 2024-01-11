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
  <token-card
    :title="$t('settings.create')"
    long
    @createToken="createToken()"
    @cancel="cancelModal()"
  >
    <validated-input-field
      id="token-name"
      type="text"
      clearable
      name="name"
      :label="$t('settings.tokenName')"
      as="v-text-field"
    ></validated-input-field>

    <validated-input-field
      id="token-expiration-date"
      type="number"
      name="lifetime"
      min="0"
      :label="$t('settings.expirationDate')"
      as="v-text-field"
    ></validated-input-field>
  </token-card>
</template>

<script setup lang="ts">
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import { useSettingsStore } from '@/store/settings'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import TokenCard from '@/components/settings/createToken/TokenCard.vue'
import { z } from 'zod'
import { CreateToken } from '@/models/Token'

const emit = defineEmits(['closeModal'])
const settingsStore = useSettingsStore()

const { values, meta, validate } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      name: z.string().nonempty(),
      lifetime: z.string().nonempty()
    })
  )
})

function createToken() {
  validate()
  if (meta.value.valid) {
    settingsStore.createToken(values as CreateToken)
    cancelModal()
  }
}

function cancelModal() {
  emit('closeModal')
}
</script>
