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
      cols="lg-1 sm-2"
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
      cols="lg-3 sm-2"
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
        no-sort
        :justify="JustifyEnum.Enum.center"
      />
      <TextRecord v-else :text="submission?.technology" />
    </v-col>
    <v-col
      id="submission-accepted"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.submissions.accepted')"
        sortKey="columns.submissions.accepted"
        :justify="JustifyEnum.Enum.center"
        direction="desc"
      />

      <v-tooltip location="right" v-else-if="submission">
        <template #activator="{ props }">
          <div
            id="tooltip-activator"
            v-bind="props"
            class="mt-2"
          >
            <v-icon
              v-if="getAccepted"
              icon="mdi-check-circle-outline"
              color="success"
            ></v-icon>
            <v-icon
              v-else-if="getWaiting"
              icon="mdi-progress-question"
            ></v-icon>
            <v-icon
              v-else-if="getRejectedOrCancelled"
              icon="mdi-close-circle-outline"
              color="error"
            ></v-icon>
          </div>
        </template>
        <span id="tooltip-wait">{{
          getAcceptedTooltipMessage
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
          >ACCEPT</v-btn
        >
        <v-btn
          v-if="check"
          id="cancel-button"
          color="oared"
          @click="cancelSubmission(submission)"
          >CANCEL</v-btn
        >
        <v-btn
          v-else
          id="reject-button"
          color="oared"
          @click="rejectSubmission(submission)"
          >REJECT</v-btn
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
import { useAuthorizationStore } from '@/store/authorization'
import SortTitle from '@/components/common/resources/SortTitle.vue'
import TextRecord from '@/components/common/resources/TextRecord.vue'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import { JustifyEnum } from '@/enum/Justify'
import { i18n } from '@/plugins/i18n'

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  submission: Object as () =>
    | EntityModelSubmissionDto
    | undefined
})

const authorizationStore = useAuthorizationStore()
const { canPatch } = useUserAuthorities()
const {
  acceptSubmission,
  cancelSubmission,
  rejectSubmission
} = useSubmissionActions()

const check = computed(() => {
  return (
    authorizationStore.me?.id ===
    props.submission?.submitter?.id
  )
})

const getAccepted = computed<boolean>(() => {
  return (
    props.submission?.state ==
    EntityModelSubmissionDtoStateEnum.ACCEPTED
  )
})

const getWaiting = computed<boolean>(() => {
  return (
    props.submission?.state ==
    EntityModelSubmissionDtoStateEnum.WAITING
  )
})

const getRejected = computed<boolean>(() => {
  return (
    props.submission?.state ==
    EntityModelSubmissionDtoStateEnum.REJECTED
  )
})

const getCancelled = computed<boolean>(() => {
  return (
    props.submission?.state ==
    EntityModelSubmissionDtoStateEnum.CANCELLED
  )
})

const getRejectedOrCancelled = computed<boolean>(() => {
  return getRejected.value || getCancelled.value
})

const getAcceptedTooltipMessage = computed<string>(() => {
  if (getAccepted.value)
    return i18n.t('submissions.accepted')
  if (getWaiting.value)
    return i18n.t('submissions.waitingForAction')
  if (getRejected.value)
    return i18n.t('submissions.rejected')
  else return i18n.t('submissions.cancelled')
})
</script>
