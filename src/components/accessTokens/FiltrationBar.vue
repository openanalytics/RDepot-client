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
  <div
    class="v-expansion d-flex py-3 ga-3 justify-space-between"
    style="padding-left: 0; padding-right: 0"
  >
    <validated-input-field
      id="filtration-search"
      density="compact"
      hide-details
      name="search"
      as="v-text-field"
      :label="$t('settings.filtration.searchPlaceholder')"
      color="oablue"
      @update:model-value="setFiltration"
    />

    <validated-input-field
      v-if="
        isAtLeastAdmin(
          authorizationStore.userRole
            ? authorizationStore.userRole
            : 0
        )
      "
      density="compact"
      hide-details
      chips
      closable-chips
      name="userLogin"
      as="autocomplete"
      multiple
      clearable
      :label="$t('settings.filtration.userLogin')"
      :store-id="storeIdUser"
      :template="true"
      @update:model-value="setFiltration"
      @load-items="loadUsers"
    >
      <template #item="{ props }">
        <v-list-item v-intersect="loadUsers" v-bind="props">
          <template #prepend="{ isActive }">
            <v-list-item-action start>
              <v-checkbox-btn
                :model-value="isActive"
              ></v-checkbox-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
      </template>
    </validated-input-field>

    <validated-input-field
      id="filtration-active"
      density="compact"
      hide-details
      name="active"
      :label="$t('settings.filtration.active')"
      as="v-switch"
      color="oablue"
      class="flex-grow-0"
      @change="setFiltration"
    ></validated-input-field>

    <validated-input-field
      id="filtration-expired"
      density="compact"
      hide-details
      name="expired"
      :label="$t('settings.filtration.expired')"
      as="v-switch"
      color="oablue"
      class="flex-grow-0"
      @change="setFiltration"
    ></validated-input-field>
    <v-spacer />
    <ResetButton
      v-if="!accessTokensStore.isDefaultFiltration"
      @reset-values="resetValues"
    />
  </div>
</template>

<script setup lang="ts">
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import {
  defaultValues,
  TokensFiltration
} from '@/models/Filtration'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { isAtLeastAdmin } from '@/enum/UserRoles'
import { useUsersFiltration } from '@/composable/filtration/usersFiltration'
import { onMounted } from 'vue'
import ResetButton from '@/components/common/buttons/ResetButton.vue'
import { onBeforeMount } from 'vue'
import { useAccessTokensStore } from '@/store/access_tokens'
import { useAuthorizationStore } from '@/store/authorization'

const authorizationStore = useAuthorizationStore()
const accessTokensStore = useAccessTokensStore()

const { storeIdUser, loadUsers, resetPaginationUsers } =
  useUsersFiltration()

const { setValues, values, setFieldValue } = useForm({
  validationSchema: toTypedSchema(TokensFiltration),
  initialValues: accessTokensStore.filtration
})

function setFiltration() {
  accessTokensStore.setFiltration(
    values as TokensFiltration
  )
}

function resetValues() {
  setValues(defaultValues(TokensFiltration))
  accessTokensStore.setFiltration(
    values as TokensFiltration
  )
}

onMounted(() => {
  if (
    isAtLeastAdmin(
      authorizationStore.userRole
        ? authorizationStore.userRole
        : 0
    ) &&
    authorizationStore.me.login
  ) {
    setFieldValue('userLogin', [
      authorizationStore.me.login
    ])
    setFiltration()
  }
})

onBeforeMount(() => resetPaginationUsers())
</script>

<style lang="scss">
.v-selection-control .v-label {
  white-space: nowrap;
}
</style>
