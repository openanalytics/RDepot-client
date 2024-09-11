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
      id="package-maintainers-filtration-search"
      density="compact"
      hide-details
      name="search"
      as="v-text-field"
      :label="
        $t(
          'packages.filtration.maintainers.searchPlaceholder'
        )
      "
      color="oablue"
      @update:model-value="setFiltration"
    />

    <validated-input-field
      id="package-maintainers-filtration-technology"
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
      id="package-maintainers-filtration-repository"
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
      id="package-maintainers-filtration-deleted"
      density="compact"
      hide-details
      name="deleted"
      :label="$t('packages.filtration.deleted')"
      as="v-switch"
      color="oablue"
      class="flex-grow-0"
      @change="setFiltration"
    ></validated-input-field>

    <v-spacer />

    <ResetButton
      v-if="!packageMaintainerStore.isDefaultFiltration"
      @reset-values="resetValues"
    />
  </div>
</template>

<script setup lang="ts">
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import {
  defaultValues,
  PackageMaintainersFiltration
} from '@/models/Filtration'
import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { usePackageMaintainersStore } from '@/store/options/packageMaintainers'
import ResetButton from '@/components/common/buttons/ResetButton.vue'

const { technologies } = useEnumFiltration()

const {
  storeId,
  filtrateRepositoriesObjects,
  loadRepositories
} = useRepositoriesFiltration()

const packageMaintainerStore = usePackageMaintainersStore()

const { setValues, values } = useForm({
  validationSchema: toTypedSchema(
    PackageMaintainersFiltration
  ),
  initialValues: packageMaintainerStore.filtration
})

function setFiltration() {
  packageMaintainerStore.setFiltration(
    values as PackageMaintainersFiltration
  )
}

function resetValues() {
  setValues(defaultValues(PackageMaintainersFiltration))
  packageMaintainerStore.setFiltration(
    values as PackageMaintainersFiltration
  )
}
</script>

<style lang="scss">
.reset-button {
  display: grid;
  align-content: center;
}
</style>
