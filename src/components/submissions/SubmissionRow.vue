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
  <v-row
    class="px-5"
    :class="{ title: title }"
    id="submission-row"
  >
    <v-col
      id="submission-date"
      cols="lg-1 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.submissions.date')"
        sortKey="columns.submissions.date"
      />
      <TextRecord v-else :text="submission?.created" />
    </v-col>
    <v-col
      id="submission-package"
      cols="lg-1"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.submissions.package')"
        sortKey="columns.submissions.package"
        sortField="packageBag.name"
      />
      <TextRecord
        v-else
        :text="submission?.packageBag?.name"
      />
    </v-col>
    <VCol
      id="package-row-version"
      cols="lg-1"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.package.version')"
        sortKey="columns.submissions.version"
        sortField="packageBag.version"
      />
      <TextRecord
        v-else
        :text="submission?.packageBag?.version"
      />
    </VCol>
    <v-col
      id="submission-repository"
      cols="lg-1 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.submissions.repository')"
        sortKey="columns.submissions.repository"
      />
      <TextRecord
        v-else
        :text="submission?.packageBag?.repository?.name"
      />
    </v-col>
    <v-col
      id="submission-submitter"
      cols="lg-2 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.submissions.submitter')"
        sortKey="columns.submissions.submitter"
      />
      <TextRecord
        v-else
        :text="submission?.submitter?.name"
      />
    </v-col>

    <v-col
      id="submission-approver"
      cols="lg-2 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.submissions.approver')"
        sortKey="columns.submissions.approver"
      />
      <TextRecord
        v-else
        :text="submission?.approver?.name"
      />
    </v-col>

    <v-col
      id="submission-technology"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.submissions.technology')"
        sortKey="columns.submissions.technology"
        :justify="JustifyEnum.Enum.center"
      />
      <TextRecord v-else :text="submission?.technology">
        <slot
          ><v-chip
            size="small"
            color="oablue"
            style="cursor: pointer"
          >
            {{ submission?.technology }}</v-chip
          ></slot
        ></TextRecord
      >
    </v-col>
    <v-col
      id="submission-accepted"
      cols="lg-1"
      class="d-flex justify-center align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.submissions.accepted')"
        sortKey="columns.submissions.accepted"
        :justify="JustifyEnum.Enum.center"
        direction="desc"
      />

      <v-tooltip
        location="bottom center"
        v-else-if="submission"
      >
        <template #activator="{ props }">
          <div id="tooltip-activator" v-bind="props">
            <v-icon
              :icon="
                getStatusIcon(
                  submission?.state ||
                    EntityModelSubmissionDtoStateEnum.WAITING
                )
              "
              :color="
                getStatusColor(
                  submission?.state ||
                    EntityModelSubmissionDtoStateEnum.WAITING
                )
              "
            ></v-icon>
          </div>
        </template>
        <span id="tooltip-wait">{{
          getTooltipMessage(
            submission?.state ||
              EntityModelSubmissionDtoStateEnum.WAITING
          )
        }}</span>
      </v-tooltip>
    </v-col>
    <v-col
      id="submission-actions"
      cols="lg-2"
      class="d-flex justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.actions')"
        sortKey="columns.actions"
        :justify="JustifyEnum.Enum.center"
        no-sort
      />
      <span
        v-else-if="
          getWaiting && canPatch(submission?.links, 'state')
        "
        class="d-flex justify-center align-center"
      >
        <v-btn
          v-if="!check"
          id="accept-button"
          color="success"
          class="mx-1"
          @click="acceptSubmission(submission)"
          >{{ $t('action.accept') }}</v-btn
        >
        <v-btn
          v-if="check"
          id="cancel-button"
          color="oared"
          @click="cancelSubmission(submission)"
          >{{ $t('action.cancel') }}</v-btn
        >
        <v-btn
          v-else
          id="reject-button"
          color="oared"
          @click="rejectSubmission(submission)"
          >{{ $t('action.reject') }}</v-btn
        >
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  EntityModelSubmissionDto,
  EntityModelSubmissionDtoStateEnum
} from '@/openapi'
import { useSubmissionActions } from '@/composable/submissions/submissionActions'
import SortTitle from '@/components/common/resources/SortTitle.vue'
import TextRecord from '@/components/common/resources/TextRecord.vue'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import { JustifyEnum } from '@/enum/Justify'
import { useSubmissionIcons } from '@/composable/submissions/statusIcons'
import { useMeStore } from '@/store/me'

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  submission: Object as () =>
    | EntityModelSubmissionDto
    | undefined
})

const meStore = useMeStore()
const { canPatch } = useUserAuthorities()
const {
  acceptSubmission,
  cancelSubmission,
  rejectSubmission
} = useSubmissionActions()

const { getStatusIcon, getStatusColor, getTooltipMessage } =
  useSubmissionIcons()

const check = computed(() => {
  return meStore.me?.id === props.submission?.submitter?.id
})

const getWaiting = computed<boolean>(() => {
  return (
    props.submission?.state ==
    EntityModelSubmissionDtoStateEnum.WAITING
  )
})
</script>
