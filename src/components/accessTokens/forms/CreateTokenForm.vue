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
    :title="i18n.t('forms.tokens.newToken')"
  >
    <v-divider></v-divider>
    <v-card-text>
      <validated-input-field
        id="create-token-name"
        type="text"
        clearable
        name="name"
        :label="i18n.t('forms.general.name')"
        as="v-text-field"
        max-width="unset"
      ></validated-input-field>

      <validated-input-field
        id="create-token-expiration-date"
        :disabled="
          !configStore.accessTokenLifetimeConfigurable
        "
        :hint="tokenLifetimeHint"
        persistent-hint
        type="number"
        name="lifetime"
        min="0"
        :label="i18n.t('fields.tokens.expirationDate')"
        as="v-text-field"
        max-width="unset"
      ></validated-input-field>
    </v-card-text>

    <CardActions
      :valid="meta.valid"
      @submit="createToken"
    />
  </v-card>
</template>

<script setup lang="ts">
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useAccessTokensStore } from '@/store/options/accessTokens'
import { useCommonStore } from '@/store/options/common'
import CardActions from '@/components/common/overlay/CardActions.vue'
import { useConfigStore } from '@/store/options/config'
import { computed } from 'vue'
import { i18n } from '@/plugins/i18n'
import { useTokenValidationSchema } from '@/composable/tokens/tokenSchema'

const accessTokensStore = useAccessTokensStore()
const commonStore = useCommonStore()
const configStore = useConfigStore()
const { tokenSchema } = useTokenValidationSchema()

const { values, meta } = useForm({
  validationSchema: toTypedSchema(tokenSchema),
  initialValues: {
    name: '',
    lifetime:
      configStore.accessTokenLifetimeDefault.toString()
  }
})

const tokenLifetimeHint = computed(() =>
  configStore.accessTokenLifetimeConfigurable
    ? undefined
    : i18n.t('forms.tokens.notConfigurableExpirationDate')
)

async function createToken() {
  const token = await tokenSchema.parseAsync(values)
  accessTokensStore.create(token)
  commonStore.closeOverlay()
}
</script>
