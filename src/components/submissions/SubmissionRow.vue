<template>
  {{ submission }}
  <v-row
    class="px-5"
    :class="{ title: title }"
    id="submissionrow"
  >
    <v-col
      id="submissiondate"
      cols="lg-2 sm-2"
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
      id="submissionpackage"
      cols="lg-2"
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
      id="submissionrepository"
      cols="lg-2 sm-2"
      class="d-flex align-center"
    >
      {{
        title == true
          ? prepareString(
              $t('submissions.repository').toString()
            )
          : submission
          ? submission.packageBag?.repositoryId
          : ''
      }}</v-col
    >
    <v-col
      id="submissionsubmitter"
      cols="lg-5 sm-2"
      class="d-flex align-center justify-center"
    >
      {{
        title == true
          ? prepareString(
              $t('submissions.submitter').toString()
            )
          : submission
          ? submission.submitter?.login
          : ''
      }}</v-col
    >
    <v-col
      id="submissionaccepted"
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
        id="checkboxactive"
        color="oablue"
        @click.stop
        v-else-if="submission"
        v-model="submission.state"
      />
    </v-col>
    <v-col
      id="submission-actions"
      cols="lg-1"
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
        v-else
        class="d-flex justify-center align-center"
      >
        ACCEPT / CANCEL
        <!-- <v-tooltip top>
          <template v-slot:activator="{ props }">
            <v-icon
              id="navigateicon"
              @click.stop
              @click="navigate"
              v-bind="props"
              color="oablue"
              >mdi-forward</v-icon
            >
          </template>
          <span id="actiondetails">{{
            $t('common.details')
          }}</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ props }">
            <v-icon
              id="navigateicon"
              @click.stop
              @click="navigate"
              v-bind="props"
              color="oared"
              class="ml-3"
              >mdi-trash-can</v-icon
            >
          </template>
          <span id="actiondelete">{{
            $t('common.delete')
          }}</span>
        </v-tooltip> -->
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import router from '@/router'
import { EntityModelSubmissionDto } from '@/openapi'

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  submission: Object as () =>
    | EntityModelSubmissionDto
    | undefined
})

function prepareString(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function navigate() {
  if (props.submission) {
    router.replace({
      name: 'submissionDetails',
      params: {
        name: props.submission.id
      }
    })
  }
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
  padding-top: 16px;
  padding-bottom: 16px;
}

.v-input__control {
  justify-content: center !important;
}

#submissionrow {
  .v-input__details {
    display: none !important;
  }
}
</style>
