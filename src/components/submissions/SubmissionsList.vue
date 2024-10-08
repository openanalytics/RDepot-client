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
  <OATable
    v-model="submissionStore.selected"
    show-select
    :headers="headers"
    :items="submissionStore.submissions"
    :title="i18n.t('common.submissions')"
    :items-length="submissionStore.totalNumber"
    item-value="name"
    :loading="submissionStore.loading"
    :sort-by="sortBy"
    @update:options="fetchData"
  >
    <template
      #[`header.data-table-select`]="{
        selectAll,
        allSelected,
        someSelected
      }"
    >
      <MultiActionSubmissions
        :all-selected="allSelected"
        :some-selected="someSelected"
        @select-all="selectAll(!allSelected)"
      />
    </template>
    <template
      #[`item.data-table-select`]="{
        item,
        toggleSelect,
        internalItem,
        isSelected
      }"
    >
      <span class="d-flex align-center">
        <SelectBoxSubmission
          :item="item"
          :is-selected="isSelected(internalItem)"
          @toggle-select="toggleSelect(internalItem)"
        />
        <MultiActionSubmissionsAlert :item="item" />
      </span>
    </template>
    <template #[`item.actions`]="{ item }">
      <ProgressCircularSmall v-if="isPending(item)" />
      <span v-else class="d-flex justify-end align-right">
        <CancelSubmission :item="item" />
        <AcceptSubmission :item="item" />
        <RejectSubmission :item="item" />
        <DownloadSubmission :item="item" />
      </span>
    </template>
  </OATable>
</template>

<script setup lang="ts">
import { useSubmissionStore } from '@/store/options/submission'
import { EntityModelSubmissionDto } from '@/openapi'
import {
  DataTableHeaders,
  DataTableOptions,
  Sort
} from '@/models/DataTableOptions'
import { i18n } from '@/plugins/i18n'
import { ref, computed } from 'vue'
import { useSort } from '@/composable/sort'
import MultiActionSubmissions from './actions/MultiActionSubmissions.vue'
import MultiActionSubmissionsAlert from './actions/MultiActionSubmissionsAlert.vue'
import SelectBoxSubmission from './actions/SelectBoxSubmission.vue'
import ProgressCircularSmall from '../common/progress/ProgressCircularSmall.vue'
import AcceptSubmission from './actions/AcceptSubmission.vue'
import RejectSubmission from './actions/RejectSubmission.vue'
import CancelSubmission from './actions/CancelSubmission.vue'
import DownloadSubmission from './actions/DownloadSubmission.vue'
import OATable from '../common/datatable/OATable.vue'

const submissionStore = useSubmissionStore()

const { getSort } = useSort()
const defaultSort: Sort[] = [
  { key: 'state', order: 'desc' }
]
const sortBy = ref(defaultSort)

const headers = computed<DataTableHeaders[]>(() => [
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
    key: 'packageBag.repository.technology',
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
])

function fetchData(options: DataTableOptions) {
  sortBy.value = getSort(options.sortBy, defaultSort)
  submissionStore.getPage(options)
}

function isPending(
  item: EntityModelSubmissionDto
): boolean {
  return !!submissionStore.pending.find(
    (submission) => submission.id == item.id
  )
}
</script>

<style lang="scss">
.empty-row {
  border-bottom: unset !important;
}
</style>
