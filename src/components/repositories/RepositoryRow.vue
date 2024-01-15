<!--
 R Depot
 
 Copyright (C) 2012-2023 Open Analytics NV
 
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
    id="repository-row"
  >
    <v-col
      id="repository-name"
      cols="lg-1 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.repository.name')"
        sortKey="columns.repository.name"
      />
      <TextRecord v-else :text="repository?.name" />
    </v-col>
    <v-col
      id="repository-publication-uri"
      cols="lg-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.repository.publicationUri')"
        sortKey="columns.repository.publicationUri"
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
        :text="$t('columns.repository.serverAddress')"
        sortKey="columns.repository.serverAddress"
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
        center
        :text="$t('columns.repository.technology')"
        sortKey="columns.repository.technology"
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
        center
        :text="$t('columns.repository.version')"
        sortKey="columns.repository.version"
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
        center
        no-sort
        :text="$t('columns.repository.packagesNo')"
        sortKey="columns.repository.packagesNo"
      />
      <TextRecord v-else text="none" no-margin />
    </v-col>
    <v-col
      id="repository-published"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.repository.published')"
        sortKey="columns.repository.published"
        center
      />
      <v-checkbox
        v-else-if="repository"
        id="checkbox-published"
        v-model="repository.published"
        @change="updateRepositoryPublished()"
        :disabled="!canPatch(props.repository?.links)"
        color="oablue"
        class="mr-8"
        @click.stop
      />
    </v-col>
    <v-col
      v-if="canDelete(props.repository?.links)"
      id="repository-actions"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <SortTitle
        v-if="title"
        no-sort
        center
        :text="$t('columns.actions')"
        sortKey="columns.actions"
      />
      <span
        v-else-if="repository"
        class="d-flex justify-center align-center"
      >
        <delete-icon
          v-if="canDelete(props.repository?.links)"
          :name="props.repository?.name"
          :set-resource-id="chooseRepository"
          class=""
        />
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'
import SortTitle from '@/components/common/resources/SortTitle.vue'
import TextRecord from '@/components/common/resources/TextRecord.vue'
import { EntityModelRepositoryDto } from '@/openapi'
import { updateRepository } from '@/services/repository_services'
import { useUtilities } from '@/composable/utilities'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import { usePackagesStore } from '@/store/packages'
import { useRepositoryStore } from '@/store/repositories'

const packagesStore = usePackagesStore()
const { deepCopy } = useUtilities()
const { canDelete, canPatch } = useUserAuthorities()
const repositoryStore = useRepositoryStore()

const props = defineProps<{
  title?: boolean
  repository?: EntityModelRepositoryDto
}>()

function updateRepositoryPublished(): void {
  if (props.repository) {
    const oldRepository = deepCopy(props.repository)
    oldRepository.published = !oldRepository.published
    updateRepository(oldRepository, props.repository).then(
      (success) => {
        repositoryStore.fetchRepositories()
      },
      (failure) => {
        repositoryStore.fetchRepositories()
      }
    )
  }
}

function chooseRepository() {
  packagesStore.setFiltrationByRepositoryOnly(
    props.repository?.name
  )
}
</script>
