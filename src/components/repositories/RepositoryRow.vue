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
    >
      <SortTitle v-if="title" :text="$t('columns.name')" />
      <TextRecord v-else :text="repository?.name" />
    </v-col>
    <v-col
      id="repository-publication-uri"
      cols="lg-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.publicationUri')"
      />
      <TextRecord
        v-else
        :text="repository?.publicationUri"
      />
    </v-col>
    <v-col
      id="repository-server-address"
      cols="lg-4 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.serverAddress')"
      />
      <TextRecord
        v-else
        :text="repository?.serverAddress"
      />
    </v-col>

    <v-col
      id="repository-technology"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      <SortTitle
        v-if="title"
        :center="true"
        :text="$t('columns.technology')"
      />
      <TextRecord v-else :text="repository?.technology" />
    </v-col>
    <v-col
      id="repository-version"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      <SortTitle
        v-if="title"
        :center="true"
        :text="$t('columns.version')"
      />
      <TextRecord
        v-else
        :text="repository?.version?.toString()"
      />
    </v-col>
    <v-col
      id="repository-packages-no"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      <SortTitle
        v-if="title"
        :center="true"
        :text="$t('columns.packagesNo')"
      />
      <TextRecord v-else text="none" />
    </v-col>
    <v-col
      id="repository-published"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <SortTitle
        v-if="title"
        :sort="false"
        :text="$t('columns.published')"
        :center="true"
      />
      <v-checkbox
        v-else-if="repository"
        id="checkbox-published"
        v-model="repository.published"
        color="oablue"
        @click.stop
        @change="updateRepositoryPublish()"
      />
    </v-col>
    <v-col
      id="repository-actions"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <SortTitle
        v-if="title"
        :sort="false"
        :center="true"
        :text="$t('columns.actions')"
      />
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
        <delete-icon
          :name="props.repository?.name"
          :set-resource-id="chooseRepository"
        />
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import router from '@/router'
import { EntityModelRepositoryDto } from '@/openapi'
import { usePackagesStore } from '@/store/packages'
import { useRepositoryStore } from '@/store/repositories'
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'
import SortTitle from '../packages/SortTitle.vue'
import TextRecord from '../packages/TextRecord.vue'

const repository_store = useRepositoryStore()
const package_store = usePackagesStore()

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  repository: Object as () =>
    | EntityModelRepositoryDto
    | undefined
})

function updateRepositoryPublish() {
  if (
    props.repository &&
    props.repository.id &&
    props.repository.published != undefined
  ) {
    const fields: Map<string, any> = new Map<string, any>()
    fields.set('published', props.repository?.published)
    repository_store.setChosenRepository(
      props.repository?.id
    )
    repository_store.updateRepository(fields)
  }
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

function chooseRepository() {
  repository_store.setChosenRepository(props.repository?.id)
}
</script>
