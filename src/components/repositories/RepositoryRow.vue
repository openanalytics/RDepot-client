<template>
  <v-row
    class="px-5"
    :class="{ title: title }"
    id="repository-row"
  >
    <v-col
      id="repository-name"
      cols="lg-1 sm-2"
      class="d-flex align-center"
      >{{
        title
          ? prepareString(
              $t('repositories.name').toString()
            )
          : repository
          ? repository.name
          : ''
      }}</v-col
    >
    <v-col
      id="repository-publication-uri"
      cols="lg-2"
      class="d-flex align-center"
      >{{
        title
          ? prepareString(
              $t('repositories.publicationUri').toString()
            )
          : repository
          ? repository.publicationUri
          : ''
      }}</v-col
    >
    <v-col
      id="repository-server-address"
      cols="lg-5 sm-2"
      class="d-flex align-center"
    >
      {{
        title
          ? prepareString(
              $t('repositories.serverAddress').toString()
            )
          : repository
          ? repository.serverAddress
          : ''
      }}</v-col
    >

    <v-col
      id="repository-version"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      {{
        title
          ? prepareString(
              $t('repositories.version').toString()
            )
          : repository
          ? repository.version
          : ''
      }}</v-col
    >
    <v-col
      id="repository-packages-no"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      {{
        title
          ? prepareString(
              $t('repositories.packagesNo').toString()
            )
          : repository
          ? -1
          : ''
      }}</v-col
    >
    <v-col
      id="repository-published"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <span v-if="title">
        {{
          prepareString(
            $t('repositories.published').toString()
          )
        }}</span
      >
      <v-checkbox
        v-else-if="repository"
        id="checkbox-published"
        v-model="repository.published"
        color="oablue"
        @click.stop
      />
    </v-col>
    <v-col
      id="repository-actions"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <span v-if="title">
        {{
          prepareString($t('packages.actions').toString())
        }}
      </span>
      <span
        v-else-if="repository"
        class="d-flex justify-center align-center"
      >
        <v-tooltip top>
          <template v-slot:activator="{ props }">
            <v-icon
              id="navigate-icon"
              @click.stop
              @click="navigate"
              v-bind="props"
              color="oablue"
              >mdi-forward</v-icon
            >
          </template>
          <span id="action-details">{{
            $t('common.details')
          }}</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ props }">
            <v-icon
              id="delete-icon"
              @click.stop
              @click="navigate"
              v-bind="props"
              color="oared"
              class="ml-3"
              >mdi-trash-can</v-icon
            >
          </template>
          <span id="action-delete">{{
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
import { usePackagesStore } from '@/store/packages'

const package_store = usePackagesStore()

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
  if (props.repository && props.repository.name) {
    package_store.setFiltrationByRepositoryOnly(
      props.repository.name
    )
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
  padding: 16px 24px;
}

.v-input__control {
  justify-content: center !important;
}
</style>
