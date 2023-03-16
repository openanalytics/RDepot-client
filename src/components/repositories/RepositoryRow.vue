<template>
  <v-row :class="{ title: title }" id="repository-row">
    <v-col
      id="repository-name"
      cols="lg-1 sm-2"
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
    <!-- <v-col
      id="repository-maintainer"
      cols="lg-1"
      class="d-flex align-center"
    >
      {{
        title == true
          ? prepareString(
              $t('repositories.maintainer').toString()
            )
          : repository
          ? 'maintainer'
          : ''
      }}
    </v-col> -->
    <v-col
      id="repository-publication-uri"
      cols="lg-2"
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
      id="repository-server-address"
      cols="lg-4 sm-2"
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
      id="repository-version"
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
      id="repository-packages-no"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      {{
        title == true
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
      <span v-if="title == true">
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
      <span v-if="title == true">
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
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'
import { useCommonStore } from '@/store/common'
import { OverlayEnum } from '@/enum/Overlay'
import { i18n } from '@/plugins/i18n'

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  repository: Object as () =>
    | EntityModelRRepositoryDto
    | undefined
})

const common_store = useCommonStore()
const maintainers_store = useRepositoryMaintainersStore()

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

function edit() {
  maintainers_store.setChoosenMaintainer(
    maintainers_store.maintainers[0]
  )
  common_store.setOverlayText(
    i18n.t('maintainers.edit', {
      maintainerName:
        maintainers_store.maintainers[0].user?.id
    })
  )
  common_store.setOverlayModel(true)
  common_store.setOverlayOpacity(0.8)
  common_store.setOverlayComponent(OverlayEnum.Edit)
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
</style>
