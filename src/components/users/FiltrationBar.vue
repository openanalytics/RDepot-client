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
  <div
    class="v-expansion d-flex py-3 ga-3 justify-space-between"
    style="padding-left: 0; padding-right: 0"
  >
    <validated-input-field
      id="users-filtration-search"
      density="compact"
      hide-details
      name="search"
      as="v-text-field"
      :label="
        i18n.t('filtration.general.searchPlaceholder')
      "
      color="primary"
      @update:model-value="setFiltration"
    />

    <validated-input-field
      id="users-filtration-roles"
      density="compact"
      hide-details
      chips
      closable-chips
      :items="sortValues(roles)"
      name="roles"
      multiple
      clearable
      as="v-select"
      :label="i18n.t('fields.users.role', 2)"
      @update:model-value="setFiltration"
    ></validated-input-field>

    <validated-input-field
      id="users-filtration-active"
      density="compact"
      hide-details
      name="active"
      :label="i18n.t('properties.general.active')"
      as="switch-indeterminate"
      color="primary"
      class="flex-grow-0"
      @change="setFiltration"
    ></validated-input-field>

    <validated-input-field
      id="user-filtration-deleted"
      density="compact"
      hide-details
      name="deleted"
      :label="i18n.t('properties.general.deleted')"
      as="switch-indeterminate"
      color="primary"
      class="flex-grow-0"
      @change="setFiltration"
    ></validated-input-field>
    <v-spacer />
    <ResetButton
      :style="{
        visibility: userStore.isDefaultFiltration
          ? 'hidden'
          : 'visible'
      }"
      @reset-values="resetValues"
    />
  </div>
</template>

<script setup lang="ts">
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import {
  defaultValues,
  UsersFiltration
} from '@/models/Filtration'
import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useUserStore } from '@/store/options/users'
import ResetButton from '@/components/common/buttons/ResetButton.vue'
import { i18n } from '@/plugins/i18n'

const { roles, sortValues } = useEnumFiltration()

const userStore = useUserStore()

const { setValues, values } = useForm({
  validationSchema: toTypedSchema(UsersFiltration),
  initialValues: userStore.filtration
})

function setFiltration() {
  userStore.setFiltration(values as UsersFiltration)
}

function resetValues() {
  setValues(defaultValues(UsersFiltration))
  userStore.setFiltration(values as UsersFiltration)
}
</script>
