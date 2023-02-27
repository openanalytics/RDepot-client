<template>
  <v-row
    class="px-5"
    :class="{ title: title }"
    id="repositoryrow"
  >
    <v-col
      id="repositoryname"
      cols="lg-2 sm-2"
      class="d-flex align-center"
      >{{
        title == true
          ? prepareString(
              $t('repositories.name').toString()
            )
          : repository
          ? repository.name
          : ''
      }}</v-col
    >
    <v-col
      id="repositorypublicationuri"
      cols="lg-3"
      class="d-flex align-center"
      >{{
        title == true
          ? prepareString(
              $t('repositories.publicationUri').toString()
            )
          : repository
          ? repository.publicationUri
          : ''
      }}</v-col
    >
    <v-col
      id="repositoryserveraddress"
      cols="lg-3 sm-2"
      class="d-flex align-center"
    >
      {{
        title == true
          ? prepareString(
              $t('repositories.serverAddress').toString()
            )
          : repository
          ? repository.serverAddress
          : ''
      }}</v-col
    >
    <v-col
      id="repositoriesversion"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      {{
        title == true
          ? prepareString(
              $t('repositories.version').toString()
            )
          : repository
          ? repository.version
          : ''
      }}</v-col
    >
    <v-col
      id="repositorypackagesno"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      {{
        title == true
          ? prepareString(
              $t('repositories.packagesNo').toString()
            )
          : repository
          ? 'number of packages'
          : ''
      }}</v-col
    >
    <v-col
      id="repositorypublished"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <span v-if="title == true">
        {{
          prepareString(
            $t('repositories.published').toString()
          )
        }}</span
      >
      <v-checkbox
        id="checkboxactive"
        color="oablue"
        @click.stop
        v-else-if="repository"
        v-model="repository.published"
      />
    </v-col>
    <v-col
      id="packagerowactions"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <span v-if="title == true">
        {{
          prepareString($t('packages.actions').toString())
        }}
      </span>
      <span
        v-else
        class="d-flex justify-center align-center"
      >
        <v-tooltip top>
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
        </v-tooltip>
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import router from '@/router'
import { EntityModelRRepositoryDto } from '@/openapi'

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  repository: Object as () =>
    | EntityModelRRepositoryDto
    | undefined
})

function prepareString(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function navigate() {
  if (props.repository) {
    router.replace({
      name: 'repositoryDetails',
      params: {
        name: props.repository.name
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

#repositoryrow {
  .v-input__details {
    display: none !important;
  }
}
</style>
