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
  <v-card flat>
    <v-card-text>
      <v-row>
        <v-col cols="2">
          <v-text-field
            id="page-size-input"
            v-model="pageSize"
            type="number"
            color="text"
            aria-valuemin="1"
            :label="$t('pagination.size')"
            @change="changedData"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useSettingsStore } from '@/store/settings'

const { t } = useI18n()

const settingsStore = useSettingsStore()
const pageSize = ref(settingsStore.pageSize)

function changedData() {
  settingsStore.changes = true
}
</script>
