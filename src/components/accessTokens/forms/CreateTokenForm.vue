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
  <v-card
    class="pa-5"
    width="400"
    :title="$t('settings.create')"
  >
    <v-divider></v-divider>
    <v-card-text>
      <validated-input-field
        id="create-token-name"
        type="text"
        clearable
        name="name"
        :label="$t('settings.tokenName')"
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
        :label="$t('settings.expirationDate')"
        as="v-text-field"
        max-width="unset"
      ></validated-input-field>
    </v-card-text>

    <CardActions @submit="createToken" />
  </v-card>
</template>

<script setup lang="ts">
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { CreateToken } from '@/models/Token'
import { useAccessTokensStore } from '@/store/options/accessTokens'
import { useCommonStore } from '@/store/options/common'
import CardActions from '@/components/common/overlay/CardActions.vue'
import { useConfigStore } from '@/store/config'
import { computed } from 'vue'
import { i18n } from '@/plugins/i18n'

const accessTokensStore = useAccessTokensStore()
const commonStore = useCommonStore()
const configStore = useConfigStore()

const { values, meta, validate } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      name: z.string().min(1),
      lifetime: z.string().min(0)
    })
  ),
  initialValues: {
    name: '',
    lifetime:
      configStore.accessTokenLifetimeDefault.toString()
  }
})

const tokenLifetimeHint = computed(() =>
  configStore.accessTokenLifetimeConfigurable
    ? undefined
    : i18n.t('settings.notConfigurableExpirationDate')
)

function createToken() {
  validate()
  if (meta.value.valid) {
    accessTokensStore.create(values as CreateToken)
    commonStore.closeOverlay()
  }
}
</script>
