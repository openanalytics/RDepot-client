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
  <v-row>
    <v-col cols="4">
      <validated-input-field
        name="username"
        as="v-text-field"
        class="mt-10"
        :label="$t('authorization.username')"
        color="oablue"
        required
        autofocus
        disabled
        id="username-input"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import { useI18n } from 'vue-i18n'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { Form, useForm } from 'vee-validate'
import { onKeyStroke } from '@vueuse/core'
import { useAuthorizationStore } from '@/store/authorization'

const { t } = useI18n()
</script>
