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
  <v-container
    class="v-expansion mx-8"
    style="padding-left: 0; padding-right: 0"
  >
    <v-row>
      <v-col sm="5">
        <validated-input-field
          @update:modelValue="setFiltration"
          density="compact"
          hide-details
          name="search"
          as="v-text-field"
          :label="
            $t(
              'repositories.filtration.maintainers.searchPlaceholder'
            )
          "
          color="oablue"
          id="filtration-search"
        />
      </v-col>
      <v-col sm="2">
        <validated-input-field
          @update:modelValue="setFiltration"
          density="compact"
          hide-details
          id="filtration-technology"
          :items="technologies"
          name="technologies"
          multiple
          clearable
          as="v-select"
          :label="$t('filtration.technologies')"
        ></validated-input-field>
      </v-col>
      <v-col sm="1">
        <validated-input-field
          @change="setFiltration"
          density="compact"
          hide-details
          chips
          closable-chips
          id="filtration-deleted"
          name="deleted"
          :label="$t('packages.filtration.deleted')"
          as="v-switch"
          color="oablue"
        ></validated-input-field>
      </v-col>
      <v-spacer />
      <v-col sm="1" class="reset-button">
        <v-btn
          class="my-2"
          density="compact"
          color="oablue"
          @click="resetValues"
          v-if="
            !repositoryMaintainerStore.isDefaultFiltration
          "
        >
          {{ t('filtration.reset') }}</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import {
  defaultValues,
  RepositoryMaintainersFiltration
} from '@/models/Filtration'
import { useI18n } from 'vue-i18n'
import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'

const { t } = useI18n()
const { technologies } = useEnumFiltration()

const repositoryMaintainerStore =
  useRepositoryMaintainersStore()

const { setValues, values } = useForm({
  validationSchema: toTypedSchema(
    RepositoryMaintainersFiltration
  ),
  initialValues: repositoryMaintainerStore.filtration
})

function setFiltration() {
  repositoryMaintainerStore.setFiltration(
    values as RepositoryMaintainersFiltration
  )
}

function resetValues() {
  setValues(defaultValues(RepositoryMaintainersFiltration))
  repositoryMaintainerStore.setFiltration(
    values as RepositoryMaintainersFiltration
  )
}
</script>

<style lang="scss">
.reset-button {
  display: grid;
  align-content: center;
}
</style>
