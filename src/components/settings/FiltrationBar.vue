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
          name="search"
          as="v-text-field"
          :label="
            $t('settings.filtration.searchPlaceholder')
          "
          color="oablue"
          id="filtration-search"
        />
      </v-col>
      <v-col
        sm="3"
        v-if="
          isAtLeastAdmin(
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
          name="userLogin"
          as="autocomplete"
          multiple
          clearable
          :label="$t('settings.filtration.userLogin')"
          @loadItems="loadUsers"
          :storeId="storeIdUser"
          :template="true"
        >
          <template #item="{ item, props }">
            <v-list-item
              v-bind="props"
              v-intersect="loadUsers"
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
        <ResetButton
          v-if="!settingsStore.isDefaultFiltration"
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
  TokensFiltration
} from '@/models/Filtration'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useSettingsStore } from '@/store/settings'
import { isAtLeastAdmin } from '@/enum/UserRoles'
import { useUsersFiltration } from '@/composable/filtration/usersFiltration'
import { onMounted } from 'vue'
import ResetButton from '@/components/common/ResetButton.vue'
import { useMeStore } from '@/store/me'
import { onBeforeMount } from 'vue'

const meStore = useMeStore()
const settingsStore = useSettingsStore()

const { storeIdUser, loadUsers, resetPaginationUsers } =
  useUsersFiltration()

const { setValues, values, setFieldValue } = useForm({
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

onMounted(() => {
  if (
    isAtLeastAdmin(
      meStore.userRole ? meStore.userRole : 0
    ) &&
    meStore.me.login
  ) {
    setFieldValue('userLogin', [meStore.me.login])
    setFiltration()
  }
})

onBeforeMount(() => resetPaginationUsers())
</script>

<style lang="scss">
.reset-button {
  display: grid;
  align-content: center;
}

.v-selection-control .v-label {
  white-space: nowrap;
}
</style>
