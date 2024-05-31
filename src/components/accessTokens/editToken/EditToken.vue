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
  <token-edit-card
    :title="$t('settings.edit')"
    long
    @edit-token="editToken()"
    @cancel="cancelModal()"
  >
    <validated-input-field
      id="token-name"
      v-model="localToken.name"
      type="text"
      clearable
      name="name"
      :label="$t('settings.tokenName')"
      as="v-text-field"
      max-width="unset"
    ></validated-input-field>
  </token-edit-card>
</template>

<script setup lang="ts">
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import TokenEditCard from '@/components/accessTokens/editToken/TokenEditCard.vue'
import { ref } from 'vue'
import { z } from 'zod'
import { useUtilities } from '@/composable/utilities'
import { useAccessTokensStore } from '@/store/access_tokens'

const emit = defineEmits(['closeModal'])
const accessTokensStore = useAccessTokensStore()

const { deepCopy } = useUtilities()

let token = deepCopy(accessTokensStore.currentToken)
const localToken = ref(token)

const { meta, validate } = useForm({
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
    accessTokensStore.editToken(
      deepCopy(accessTokensStore.currentToken),
      newToken
    )
    cancelModal()
  }
}

function cancelModal() {
  emit('closeModal')
}
</script>
