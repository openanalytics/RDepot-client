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
  <v-data-table-server
    :items-per-page="pagination.pageSize"
    :headers="headers"
    :items="submissionStore.submissions"
    :items-length="submissionStore.totalNumber"
    item-value="name"
    sort-asc-icon="mdi-sort-ascending"
    sort-desc-icon="mdi-sort-descending"
    color="oablue"
    :loading="submissionStore.loading"
    :sort-by="sortBy"
    :items-per-page-options="pagination.itemsPerPage"
    @update:options="fetchData"
  >
    <template #top>
      <div class="d-flex justify-space-between mx-3 my-5">
        <h2>{{ i18n.t('common.submissions') }}</h2>
      </div>
    </template>
    <template #[`item.created`]="{ value }">
      <v-chip
        size="small"
        style="cursor: pointer"
        class="mr-3"
      >
        {{ value }}</v-chip
      >
    </template>
    <template #[`item.packageBag.repository`]="{ value }">
      {{ value }}
    </template>
    <template #[`item.packageBag.technology`]="{ value }">
      <v-chip
        size="small"
        color="oablue"
        class="mr-3"
        style="cursor: pointer"
      >
        {{ value }}</v-chip
      >
    </template>
    <template #[`item.state`]="{ value }">
      <v-tooltip location="bottom center">
        <template #activator="{ props }">
          <div id="tooltip-activator" v-bind="props">
            <v-icon
              class="mr-3"
              :icon="
                getStatusIcon(
                  value ||
                    EntityModelSubmissionDtoStateEnum.WAITING
                )
              "
              :color="
                getStatusColor(
                  value ||
                    EntityModelSubmissionDtoStateEnum.WAITING
                )
              "
            ></v-icon>
          </div>
        </template>
        <span id="tooltip-wait">{{
          getTooltipMessage(
            value ||
              EntityModelSubmissionDtoStateEnum.WAITING
          )
        }}</span>
      </v-tooltip>
    </template>
    <template #[`item.actions`]="{ item }">
      <span
        v-if="
          EntityModelSubmissionDtoStateEnum.WAITING &&
          canPatch(item.links, 'state')
        "
        class="d-flex justify-center align-center"
      >
        <template
          v-if="meStore.me?.id == item.submitter?.id"
        >
          <v-btn
            id="cancel-button"
            color="oared"
            @click="cancelSubmission(item)"
            >{{ $t('action.cancel') }}</v-btn
          >
        </template>
        <template v-else>
          <v-btn
            id="accept-button"
            color="success"
            class="mx-1"
            @click="acceptSubmission(item)"
            >{{ $t('action.accept') }}</v-btn
          >
          <v-btn
            id="reject-button"
            e-else
            color="oared"
            @click="rejectSubmission(item)"
            >{{ $t('action.reject') }}</v-btn
          >
        </template>
      </span>
    </template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import { useSubmissionStore } from '@/store/submission'
import { usePagination } from '@/store/pagination'
import { useSubmissionIcons } from '@/composable/submissions/statusIcons'
import { EntityModelSubmissionDtoStateEnum } from '@/openapi'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import { useSubmissionActions } from '@/composable/submissions/submissionActions'
import { useMeStore } from '@/store/me'
import {
  DataTableHeaders,
  DataTableOptions,
  Sort
} from '@/models/DataTableOptions'
import { i18n } from '@/plugins/i18n'
import { ref } from 'vue'
import { useSort } from '@/composable/sort'

const { canPatch } = useUserAuthorities()
const meStore = useMeStore()

const {
  acceptSubmission,
  cancelSubmission,
  rejectSubmission
} = useSubmissionActions()

const { getSort } = useSort()
const defaultSort: Sort[] = [
  { key: 'state', order: 'desc' }
]
const sortBy = ref(defaultSort)

const headers: DataTableHeaders[] = [
  {
    title: i18n.t('columns.submissions.date'),
    align: 'center',
    key: 'created',
    width: 100
  },
  {
    title: i18n.t('columns.submissions.package'),
    align: 'start',
    key: 'packageBag.name',
    width: 150
  },

  {
    title: i18n.t('columns.submissions.packageVersion'),
    align: 'center',
    key: 'packageBag.version',
    width: 100
  },
  {
    title: i18n.t('columns.submissions.repository'),
    align: 'start',
    key: 'packageBag.repository',
    value: 'packageBag.repository.name'
  },
  {
    title: i18n.t('columns.submissions.submitter'),
    align: 'center',
    key: 'submitter.name',
    width: 200
  },
  {
    title: i18n.t('columns.submissions.approver'),
    align: 'center',
    key: 'approver.name',
    width: 200
  },
  {
    title: i18n.t('columns.submissions.technology'),
    align: 'center',
    key: 'packageBag.technology',
    width: 100
  },
  {
    title: i18n.t('columns.submissions.status'),
    align: 'center',
    key: 'state',
    width: 100
  },
  {
    title: i18n.t('columns.actions'),
    align: 'center',
    key: 'actions',
    width: '230',
    sortable: false
  }
]

function fetchData(options: DataTableOptions) {
  sortBy.value = getSort(options.sortBy, defaultSort)
  sortBy.value = options.sortBy
  submissionStore.fetchSubmissionsPage(options)
}

const submissionStore = useSubmissionStore()
const pagination = usePagination()

const { getStatusIcon, getStatusColor, getTooltipMessage } =
  useSubmissionIcons()
</script>

<style lang="scss">
.empty-row {
  border-bottom: unset !important;
}
</style>
