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
      >{{
        title
          ? prepareString($t('submissions.date').toString())
          : 'DATE'
      }}</v-col
    >
    <v-col
      id="submission-package"
      cols="lg-1"
      class="d-flex align-center"
      >{{
        title
          ? prepareString(
              $t('submissions.package').toString()
            )
          : submission?.packageBag?.name
      }}</v-col
    >
    <v-col
      id="submission-repository"
      cols="lg-1 sm-2"
      class="d-flex align-center"
    >
      {{
        title
          ? prepareString(
              $t('submissions.repository').toString()
            )
          : submission?.packageBag?.repository?.name
      }}</v-col
    >
    <v-col
      id="submission-submitter"
      cols="lg-1 sm-2"
      class="d-flex align-center"
    >
      {{
        title
          ? prepareString(
              $t('submissions.submitter').toString()
            )
          : submission?.submitter?.name
      }}</v-col
    >

    <v-col
      id="submission-approver"
      cols="lg-5 sm-2"
      class="d-flex align-center"
    >
      {{
        title == true
          ? prepareString(
              $t('submissions.approver').toString()
            )
          : submission?.approver?.name
      }}</v-col
    >
    <v-col
      id="submission-accepted"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <span v-if="title">
        {{
          prepareString(
            $t('submissions.accepted').toString()
          )
        }}</span
      >

      <v-checkbox
        id="checkbox-accepted"
        color="oablue"
        @click.stop
        disabled
        v-else-if="submission"
        v-model="getAccepted"
      />
    </v-col>
    <v-col
      id="submission-actions"
      cols="lg-2"
      class="d-flex justify-center"
    >
      <span v-if="title">
        {{
          prepareString(
            $t('submissions.actions').toString()
          )
        }}
      </span>
      <span
        v-else-if="getWaiting && submission"
        class="d-flex justify-center align-center"
      >
        <v-btn
          id="accept-button"
          color="success"
          class="mx-1"
          @click="acceptSubmission"
          :disabled="disabled"
          >ACCEPT</v-btn
        >
        <v-btn
          v-if="check"
          id="cancel-button"
          color="oared"
          @click="cancelSubmission"
          :disabled="disabled"
          >CANCEL</v-btn
        >
        <v-btn
          v-else
          id="reject-button"
          color="oared"
          @click="rejectSubmission"
          :disabled="disabled"
          >REJECT</v-btn
        >
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  EntityModelSubmissionDto,
  EntityModelSubmissionDtoStateEnum
} from '@/openapi'
import { i18n } from '@/plugins/i18n'
import { useSubmissionStore } from '@/store/submission'
import { useLoggedUserStore } from '@/store/logged_user'

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  submission: Object as () =>
    | EntityModelSubmissionDto
    | undefined
})

const logged_store = useLoggedUserStore()
const submission_store = useSubmissionStore()

const check =
  logged_store.userId === props.submission?.submitter?.id

const getAccepted = computed<boolean>(() => {
  return props.submission?.state == 'ACCEPTED'
})

const getWaiting = computed<boolean>(() => {
  return props.submission?.state == 'WAITING'
})

const disabled = ref<boolean>(false)

function prepareString(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

async function acceptSubmission() {
  disabled.value = true
  await submission_store.updateSubmission(
    props.submission?.id || -1,
    EntityModelSubmissionDtoStateEnum.ACCEPTED,
    i18n.t('notifications.acceptSubmission')
  )
  disabled.value = false
}

async function cancelSubmission() {
  disabled.value = true
  await submission_store.updateSubmission(
    props.submission?.id || -1,
    EntityModelSubmissionDtoStateEnum.CANCELLED,
    i18n.t('notifications.successCancelSubmission')
  )
  disabled.value = false
}

async function rejectSubmission() {
  disabled.value = true
  await submission_store.updateSubmission(
    props.submission?.id || -1,
    EntityModelSubmissionDtoStateEnum.REJECTED,
    i18n.t('notifications.successRejectSubmission')
  )
  disabled.value = false
}
</script>
