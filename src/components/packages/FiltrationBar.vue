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
  <v-container
    class="v-expansion mx-8"
    style="padding-left: 0; padding-right: 0"
  >
    <v-row>
      <v-col sm="4">
        <validated-input-field
          @update:modelValue="setFiltration"
          density="compact"
          hide-details
          name="search"
          as="v-text-field"
          :label="$t('packages.filtration.searchBox')"
          color="oablue"
          id="filtration-search"
        />
      </v-col>
      <v-col sm="2">
        <validated-input-field
          @update:modelValue="setFiltration"
          density="compact"
          hide-details
          chips
          closable-chips
          id="filtration-technology"
          :items="technologies"
          name="technologies"
          multiple
          clearable
          as="v-select"
          :label="$t('filtration.technologies')"
        ></validated-input-field>
      </v-col>
      <v-col sm="3">
        <validated-input-field
          @update:modelValue="setFiltration"
          density="compact"
          hide-details
          chips
          closable-chips
          name="repository"
          as="autocomplete"
          multiple
          clearable
          :label="$t('packages.filtration.repository')"
          @loadItems="loadRepositories"
          @filtrate="filtrateRepositories"
          :storeId="storeId"
          :template="true"
        >
          <template #item="{ item, props }">
            <v-list-item
              v-bind="props"
              v-intersect="loadRepositories"
            >
              <template v-slot:prepend="{ isActive }">
                <v-list-item-action start>
                  <v-checkbox-btn
                    :model-value="isActive"
                  ></v-checkbox-btn>
                </v-list-item-action>
              </template>
            </v-list-item>
          </template>
        </validated-input-field>
      </v-col>
      <v-col sm="2">
        <validated-input-field
          @update:modelValue="setFiltration"
          density="compact"
          hide-details
          chips
          closable-chips
          id="filtration-submissionState"
          :items="states"
          name="submissionState"
          multiple
          clearable
          as="v-select"
          :label="$t('packages.filtration.submissionState')"
        ></validated-input-field>
      </v-col>
      <v-col
        sm="1"
        v-if="
          isAtLeastAdmin(
            meStore.userRole ? meStore.userRole : 0
          )
        "
      >
        <validated-input-field
          @change="setFiltration"
          density="compact"
          hide-details
          id="filtration-deleted"
          name="deleted"
          :label="$t('packages.filtration.deleted')"
          as="v-switch"
          color="oablue"
        ></validated-input-field>
      </v-col>
    </v-row>
    <v-row justify="start">
      <v-col
        sm="3"
        v-if="
          isAtLeastRepositoryMaintainer(
            meStore.userRole ? meStore.userRole : 0
          )
        "
      >
        <validated-input-field
          @update:modelValue="setFiltration"
          density="compact"
          hide-details
          chips
          closable-chips
          name="maintainer"
          as="autocomplete"
          multiple
          clearable
          :label="$t('packages.filtration.maintainer')"
          @loadItems="loadMaintainers"
          :storeId="storeIdMaintainer"
        ></validated-input-field>
      </v-col>
      <v-spacer />
      <v-col sm="1" class="reset-button">
        <ResetButton
          v-if="!packageStore.isDefaultFiltration"
          @resetValues="resetValues"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import {
  defaultValues,
  PackagesFiltration
} from '@/models/Filtration'
import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'
import { usePackageMaintainersFiltration } from '@/composable/filtration/packageMaintainersFiltration'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { usePackagesStore } from '@/store/packages'
import {
  isAtLeastRepositoryMaintainer,
  isAtLeastAdmin
} from '@/enum/UserRoles'
import ResetButton from '@/components/common/ResetButton.vue'
import { useMeStore } from '@/store/me'
import { onBeforeMount } from 'vue'

const { states, technologies } = useEnumFiltration()
const meStore = useMeStore()
const {
  storeId,
  filtrateRepositories,
  loadRepositories,
  resetPagination
} = useRepositoriesFiltration()
const {
  storeIdMaintainer,
  loadMaintainers,
  resetPaginationMaintainers
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

onBeforeMount(() => {
  resetPaginationMaintainers()
  resetPagination()
})
</script>

<style lang="scss">
.reset-button {
  display: grid;
  align-content: center;
}
</style>
