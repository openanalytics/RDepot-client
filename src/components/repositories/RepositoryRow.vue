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
        center
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
        center
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
        center
        no-sort
        :text="$t('columns.packagesNo')"
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
        :text="$t('columns.published')"
        center
      />
      <v-checkbox
        v-else-if="repository"
        id="checkbox-published"
        v-model="repositoryLocal.published"
        @change="updateRepositoryPublished()"
        :disabled="
          !canPatch(props.repository?.links).allowed
        "
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
          v-if="canDelete(props.repository?.links)"
          :name="props.repository?.name"
          :set-resource-id="chooseRepository"
        />
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import router from '@/plugins/router'
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'
import SortTitle from '@/components/common/resources/SortTitle.vue'
import TextRecord from '@/components/common/resources/TextRecord.vue'
import { EntityModelRepositoryDto } from '@/openapi'
import { updateRepository } from '@/services/repository_services'
import { ref } from 'vue'
import { useUtilities } from '@/composable/utilities'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import { usePackagesStore } from '@/store/packages'

const packagesStore = usePackagesStore()
const { deepCopy } = useUtilities()
const { canDelete, canPatch } = useUserAuthorities()

const props = defineProps<{
  title?: boolean
  repository?: EntityModelRepositoryDto
}>()
const repositoryLocal = ref<EntityModelRepositoryDto>(
  props.repository || {}
)

function updateRepositoryPublished(): void {
  const oldRepository = deepCopy(repositoryLocal.value)
  oldRepository.published = !oldRepository.published
  updateRepository(
    oldRepository,
    repositoryLocal.value
  ).then((success) => {
    if (!success)
      repositoryLocal.value.published =
        oldRepository.published
  })
}

function navigate() {
  chooseRepository()
  router.push({
    name: 'packages'
  })
}

function chooseRepository() {
  packagesStore.setFiltrationByRepositoryOnly(
    props.repository?.name
  )
  // packagesStore.setFiltration({repository.})
}
</script>
