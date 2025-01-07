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
      id="packages-filtration-search"
      density="compact"
      hide-details
      name="search"
      as="v-text-field"
      :label="$t('packages.filtration.searchBox')"
      @update:model-value="setFiltration"
    />

    <validated-input-field
      id="packages-filtration-technology"
      chips
      closable-chips
      density="compact"
      hide-details
      :items="technologies"
      name="technologies"
      multiple
      clearable
      as="v-select"
      :label="$t('filtration.technologies')"
      @update:model-value="setFiltration"
    ></validated-input-field>

    <validated-input-field
      id="packages-filtration-repository"
      density="compact"
      hide-details
      chips
      closable-chips
      name="repository"
      as="autocomplete"
      multiple
      clearable
      :label="$t('packages.filtration.repository')"
      :store-id="storeId"
      :template="true"
      @update:model-value="setFiltration"
      @load-items="loadRepositories"
      @filtrate="filtrateRepositoriesObjects"
    >
      <template #item="{ props }">
        <v-list-item
          v-intersect="loadRepositories"
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
      id="packages-filtration-submission-state"
      density="compact"
      hide-details
      chips
      closable-chips
      :items="sortValues(states)"
      name="submissionState"
      multiple
      clearable
      as="v-select"
      :label="$t('packages.filtration.submissionState')"
      @update:model-value="setFiltration"
    ></validated-input-field>

    <validated-input-field
      v-if="
        isAtLeastRepositoryMaintainer(
          authorizationStore.userRole
            ? authorizationStore.userRole
            : 0
        )
      "
      id="packages-filtration-maintainer"
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
      <template #item="{ props, item }">
        <v-list-item
          v-intersect="loadMaintainers"
          v-bind="{
            ...props,
            id: `packages-filtration-maintainer-${item.title.replaceAll(
              ' ',
              '-'
            )}`
          }"
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
      id="packages-filtration-deleted"
      density="compact"
      hide-details
      name="deleted"
      :label="$t('packages.filtration.deleted')"
      as="switch-indeterminate"
      color="oablue"
      class="flex-grow-0"
      @change="setFiltration"
    ></validated-input-field>

    <v-spacer />
    <ResetButton
      :style="{
        visibility: packageStore.isDefaultFiltration
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
  PackagesFiltration
} from '@/models/Filtration'
import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'
import { usePackageMaintainersFiltration } from '@/composable/filtration/packageMaintainersFiltration'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { usePackagesStore } from '@/store/options/packages'
import {
  isAtLeastRepositoryMaintainer,
  isAtLeastAdmin
} from '@/enum/UserRoles'
import ResetButton from '@/components/common/buttons/ResetButton.vue'
import { useAuthorizationStore } from '@/store/options/authorization'

const { states, technologies, sortValues } =
  useEnumFiltration()
const authorizationStore = useAuthorizationStore()
const {
  storeId,
  filtrateRepositoriesObjects,
  loadRepositories
} = useRepositoriesFiltration()
const {
  storeIdMaintainer,
  loadMaintainers,
  filtrateMaintainers
} = usePackageMaintainersFiltration()
const packageStore = usePackagesStore()

const { setValues, values } = useForm({
  validationSchema: toTypedSchema(PackagesFiltration),
  initialValues: packageStore.filtration
})

function setFiltration() {
  packageStore.setFiltration(values as PackagesFiltration)
}

function resetValues() {
  setValues(defaultValues(PackagesFiltration))
  packageStore.setFiltration(values as PackagesFiltration)
}
</script>
