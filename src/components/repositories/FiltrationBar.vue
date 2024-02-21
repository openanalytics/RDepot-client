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
          :label="$t('repositories.filtration.searchBox')"
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
      <v-col
        sm="3"
        v-if="
          isAtLeastAdmin(
            authorizationStore.userRole
              ? authorizationStore.userRole
              : 0
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
      <v-col sm="1">
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
      <v-col sm="1">
        <validated-input-field
          @change="setFiltration"
          density="compact"
          hide-details
          id="filtration-published"
          name="published"
          :label="$t('repositories.filtration.published')"
          as="v-switch"
          color="oablue"
        ></validated-input-field>
      </v-col>
      <v-col sm="1" class="reset-button">
        <ResetButton
          v-if="!repositoryStore.isDefaultFiltration"
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
  RepositoriesFiltration
} from '@/models/Filtration'
import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import { useRepositoryMaintainersFiltration } from '@/composable/filtration/repositoryMaintainersFiltration'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useRepositoryStore } from '@/store/repositories'
import { useAuthorizationStore } from '@/store/authorization'
import { isAtLeastAdmin } from '@/enum/UserRoles'
import ResetButton from '@/components/common/ResetButton.vue'

const { technologies } = useEnumFiltration()
const authorizationStore = useAuthorizationStore()

const { storeIdMaintainer, loadMaintainers } =
  useRepositoryMaintainersFiltration()
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

<style lang="scss">
.reset-button {
  display: grid;
  align-content: center;
}
</style>