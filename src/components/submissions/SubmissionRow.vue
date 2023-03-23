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
        title == true
          ? prepareString($t('submissions.date').toString())
          : submission
          ? 'DATE'
          : ''
      }}</v-col
    >
    <v-col
      id="submission-package"
      cols="lg-1"
      class="d-flex align-center"
      >{{
        title == true
          ? prepareString(
              $t('submissions.package').toString()
            )
          : submission
          ? submission.packageBag?.name
          : ''
      }}</v-col
    >
    <v-col
      id="submission-repository"
      cols="lg-1 sm-2"
      class="d-flex align-center"
    >
      {{
        title == true
          ? prepareString(
              $t('submissions.repository').toString()
            )
          : submission
          ? submission.packageBag?.repository?.id
          : ''
      }}</v-col
    >
    <v-col
      id="submission-submitter"
      cols="lg-1 sm-2"
      class="d-flex align-center"
    >
      {{
        title == true
          ? prepareString(
              $t('submissions.submitter').toString()
            )
          : submission
          ? submission.submitter?.name
          : ''
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
          : submission
          ? submission.approver?.name
          : ''
      }}</v-col
    >
    <v-col
      id="submission-accepted"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <span v-if="title == true">
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
      <span v-if="title == true">
        {{
          prepareString(
            $t('submissions.actions').toString()
          )
        }}
      </span>
      <span
        v-else-if="!getAccepted && submission"
        class="d-flex justify-center align-center"
      >
        <v-btn
          id="accept-button"
          color="success"
          class="mx-1"
          @click="acceptSubmission"
          :disabled="acceptDisabled"
          >ACCEPT</v-btn
        >
        <v-btn
          v-if="check"
          id="cancel-button"
          color="oared"
          @click="cancelSubmission"
          :disabled="cancelDisabled"
          >CANCEL</v-btn
        >
        <v-btn
          v-else
          id="reject-button"
          color="oared"
          @click="rejectSubmission"
          :disabled="rejectDisabled"
          >REJECT</v-btn
        >
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue'
import { EntityModelSubmissionDto, EntityModelSubmissionDtoStateEnum } from '@/openapi'
import { useNotification } from '@kyvg/vue3-notification'
import { useCommonStore } from '@/store/common'
import { i18n } from '@/plugins/i18n'
import { useSubmissionStore } from '@/store/submission'
import { updateSubmission } from '@/services/submission_services'
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

const notifications = useNotification()
const logged_store = useLoggedUserStore()
const submission_store = useSubmissionStore()
const common_store = useCommonStore()

const check = logged_store.userId === props.submission?.submitter?.id

const getAccepted = computed<boolean>(() => {
  return props.submission?.state == 'ACCEPTED'
})

const acceptDisabled = ref<boolean>(false)
const cancelDisabled = ref<boolean>(false)
const rejectDisabled = ref<boolean>(false)

function prepareString(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function updateSubmissionFlow(state: string, disabled: Ref<boolean>, textNotification: string) {
  common_store.setProgressCircularActive(true)
  disabled.value = true
  updateSubmission(state, props.submission?.id || -1)
  .then(
    () => {
      notifications.notify({
        type: 'success',
        text: textNotification
      })
      submission_store.fetchSubmissions()
    },
    (msg) => {
      disabled.value = false
      notifications.notify({ type: 'error', text: msg })
    }
  ).finally(
    () => common_store.setProgressCircularActive(false)
  )
}

function acceptSubmission() {
  updateSubmissionFlow(
    EntityModelSubmissionDtoStateEnum.ACCEPTED,
    acceptDisabled,
    i18n.t('notifications.acceptSubmission')
  )
}

function cancelSubmission() {
  updateSubmissionFlow(
    EntityModelSubmissionDtoStateEnum.CANCELLED,
    cancelDisabled,
    i18n.t('notifications.successCancelSubmission')
  )
}

function rejectSubmission() {
  updateSubmissionFlow(
    EntityModelSubmissionDtoStateEnum.REJECTED,
    rejectDisabled,
    i18n.t('notifications.successRejectSubmission')
  )
}
</script>

<style lang="scss">
.v-col {
  padding: 10px !important;
  font-size: 13px !important;
}
.col {
  line-height: 1.3;
}

.title {
  font-weight: 600 !important;
  padding: 16px 24px;
}

.v-input__control {
  justify-content: center !important;
}

#repository-row {
  .v-input__details {
    display: none !important;
  }
}

#submission-row {
  .v-input__details {
    display: none !important;
  }
}
</style>
