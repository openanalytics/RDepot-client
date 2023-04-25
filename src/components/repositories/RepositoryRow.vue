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
          : repositoryLocal.name
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
          : repositoryLocal.publicationUri
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
          : repositoryLocal.serverAddress
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
          : repositoryLocal.version
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
          : repositoryLocal
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
        v-else-if="repositoryLocal"
        id="checkbox-published"
        v-model="repositoryLocal.published"
        @change="updateRepositoryPublished()"
        color="oablue"
        @click.stop
        :disabled="
          !logged_user_store.can('PATCH', 'repository')
        "
      />
    </v-col>
    <v-col
      v-if="
        logged_user_store.can('GET', 'repositoryDetails') ||
        logged_user_store.can('DELETE', 'repository')
      "
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
        v-else-if="repositoryLocal"
        class="d-flex justify-center align-center"
      >
        <v-tooltip top>
          <template v-slot:activator="{ props }">
            <v-icon
              v-if="
                logged_user_store.can(
                  'GET',
                  'repositoryDetails'
                )
              "
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
              v-if="
                logged_user_store.can(
                  'DELETE',
                  'repository'
                )
              "
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
import { useLoggedUserStore } from '@/store/logged_user'
import { updateRepository } from '@/services/repository_services'
import { ref } from 'vue'

const package_store = usePackagesStore()
const logged_user_store = useLoggedUserStore()

const props = defineProps<{
  title?: boolean
  repository?: EntityModelRRepositoryDto
}>()

const repositoryLocal = ref<EntityModelRRepositoryDto>(
  props.repository || {}
)

function prepareString(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function updateRepositoryPublished(): void {
  const oldRepository = JSON.parse(
    JSON.stringify(repositoryLocal.value)
  )
  oldRepository.published = !oldRepository.published
  updateRepository(
    oldRepository,
    props.repository || {}
  ).then((success) => {
    if (!success)
      // revert change if request was not successful
      props.repository!.published = oldRepository.published
  })
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
