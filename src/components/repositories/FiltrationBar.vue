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
      id="repositories-filtration-search"
      density="compact"
      hide-details
      name="search"
      as="v-text-field"
      :label="$t('repositories.filtration.searchBox')"
      color="oablue"
      @update:model-value="setFiltration"
    />

    <validated-input-field
      id="repositories-filtration-technology"
      density="compact"
      hide-details
      chips
      closable-chips
      :items="technologies"
      name="technologies"
      multiple
      clearable
      as="v-select"
      :label="$t('filtration.technologies')"
      @update:model-value="setFiltration"
    ></validated-input-field>

    <validated-input-field
      v-if="
        isAtLeastAdmin(
          authorizationStore.userRole
            ? authorizationStore.userRole
            : 0
        )
      "
      id="repositories-filtration-maintainer"
      density="compact"
      hide-details
      chips
      closable-chips
      name="maintainer"
      as="autocomplete"
      multiple
      clearable
      :label="$t('packages.filtration.maintainer')"
      :store-id="storeIdMaintainer"
      :template="true"
      @update:model-value="setFiltration"
      @load-items="loadMaintainers"
      @filtrate="filtrateMaintainers"
    >
      <template #item="{ props }">
        <v-list-item
          v-intersect="loadMaintainers"
          v-bind="props"
        >
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
      v-if="
        isAtLeastAdmin(
          authorizationStore.userRole
            ? authorizationStore.userRole
            : 0
        )
      "
      id="repositories-filtration-deleted"
      density="compact"
      hide-details
      name="deleted"
      :label="$t('packages.filtration.deleted')"
      as="v-switch"
      color="oablue"
      class="ml-2 flex-grow-0"
      @update:model-value="setFiltration"
    ></validated-input-field>

    <validated-input-field
      id="repositories-filtration-published"
      density="compact"
      hide-details
      name="published"
      :label="$t('repositories.filtration.published')"
      as="switch-indeterminate"
      color="oablue"
      class="flex-grow-0"
      cancel
      @change="setFiltration"
    ></validated-input-field>

    <v-spacer />

    <ResetButton
      :style="{
        visibility: repositoryStore.isDefaultFiltration
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
  RepositoriesFiltration
} from '@/models/Filtration'
import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import { useRepositoryMaintainersFiltration } from '@/composable/filtration/repositoryMaintainersFiltration'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useRepositoryStore } from '@/store/options/repositories'
import { isAtLeastAdmin } from '@/enum/UserRoles'
import ResetButton from '@/components/common/buttons/ResetButton.vue'
import { useAuthorizationStore } from '@/store/options/authorization'

const { technologies } = useEnumFiltration()
const authorizationStore = useAuthorizationStore()

const {
  storeIdMaintainer,
  loadMaintainers,
  filtrateMaintainers
} = useRepositoryMaintainersFiltration()
const repositoryStore = useRepositoryStore()

const { setValues, values } = useForm({
  validationSchema: toTypedSchema(RepositoriesFiltration),
  initialValues: repositoryStore.filtration
})

function setFiltration() {
  repositoryStore.setFiltration(
    values as RepositoriesFiltration
  )
}

function resetValues() {
  setValues(defaultValues(RepositoriesFiltration))
  repositoryStore.setFiltration(
    values as RepositoriesFiltration
  )
}
</script>
