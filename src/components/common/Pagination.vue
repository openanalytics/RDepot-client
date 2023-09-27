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
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col>
          <v-container class="mt-4">
            <v-row
              justify="space-between"
              class="ml-10"
              align="center"
            >
              <div></div>
              <v-pagination
                v-model="pagination.page"
                class="my-4"
                :total-visible="
                  pagination.totalVisiblePages
                "
                :length="pagination.howManyPages"
              ></v-pagination>
              <v-row class="pageSize">
                <v-text-field
                  id="page-size-input"
                  style="flex: 1"
                  width="40"
                  v-model="localPageSize"
                  type="number"
                  color="text"
                  aria-valuemin="1"
                  :label="$t('pagination.size')"
                  @blur="setPageSize()"
                ></v-text-field>
              </v-row>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { usePagination } from '@/store/pagination'
import { useAuthorizationStore } from '@/store/authorization'
import { ref } from 'vue'

const pagination = usePagination()

const localPageSize = ref(pagination.pageSize)
const authorizationStore = useAuthorizationStore()

function setPageSize() {
  pagination.newPageSize(localPageSize.value || 10)
  var new_settings = authorizationStore.getCurrentSettings()
  new_settings.pageSize = pagination.pageSize
  authorizationStore.updateSettings(
    authorizationStore.getCurrentSettings(),
    new_settings
  )
}
</script>

<style lang="scss" scoped>
.pageSize {
  max-width: 100px !important;
}
</style>
