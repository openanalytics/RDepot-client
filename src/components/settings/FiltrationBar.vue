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
      <v-col sm="5">
        <validated-input-field
          @update:modelValue="setFiltration"
          density="compact"
          hide-details
          name="name"
          as="v-text-field"
          :label="
            isAtLeastAdmin(
              authorizationStore.userRole
                ? authorizationStore.userRole
                : 0
            )
              ? $t(
                  'settings.filtration.searchPlaceholderAdmin'
                )
              : $t('settings.filtration.searchPlaceholder')
          "
          color="oablue"
          id="filtration-name"
        />
      </v-col>
      <v-col sm="1">
        <validated-input-field
          @change="setFiltration"
          density="compact"
          hide-details
          id="filtration-active"
          name="active"
          :label="$t('settings.filtration.active')"
          as="v-switch"
          color="oablue"
        ></validated-input-field>
      </v-col>
      <v-col sm="1">
        <validated-input-field
          @change="setFiltration"
          density="compact"
          hide-details
          id="filtration-expired"
          name="expired"
          :label="$t('settings.filtration.expired')"
          as="v-switch"
          color="oablue"
        ></validated-input-field>
      </v-col>
      <v-spacer />
      <v-col sm="1" class="reset-button">
        <v-btn
          class="my-2"
          id="reset-button"
          color="oablue"
          density="compact"
          @click="resetValues"
          v-if="!settingsStore.isDefaultFiltration"
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
  TokensFiltration
} from '@/models/Filtration'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useSettingsStore } from '@/store/settings'
import { isAtLeastAdmin } from '@/enum/UserRoles'
import { useAuthorizationStore } from '@/store/authorization'

const authorizationStore = useAuthorizationStore()
const { t } = useI18n()

const settingsStore = useSettingsStore()

const { setValues, values } = useForm({
  validationSchema: toTypedSchema(TokensFiltration),
  initialValues: settingsStore.filtration
})

function setFiltration() {
  settingsStore.setFiltration(values as TokensFiltration)
}

function resetValues() {
  setValues(defaultValues(TokensFiltration))
  settingsStore.setFiltration(values as TokensFiltration)
}
</script>

<style lang="scss">
.reset-button {
  display: grid;
  align-content: center;
}
</style>
