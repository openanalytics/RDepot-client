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
  <v-card
    class="pa-5"
    width="400"
    :title="$t('settings.edit')"
  >
    <v-divider></v-divider>
    <v-card-text>
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
    </v-card-text>
    <v-divider></v-divider>
    <CardActions @submit="editToken" />
  </v-card>
</template>

<script setup lang="ts">
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { ref } from 'vue'
import { z } from 'zod'
import { useUtilities } from '@/composable/utilities'
import { useAccessTokensStore } from '@/store/options/accessTokens'
import CardActions from '@/components/common/overlay/CardActions.vue'
import { useCommonStore } from '@/store/options/common'

const accessTokensStore = useAccessTokensStore()
const commonStore = useCommonStore()

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
    accessTokensStore.patch(
      deepCopy(accessTokensStore.currentToken),
      newToken
    )
    commonStore.closeOverlay()
  }
}
</script>
